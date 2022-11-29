import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  SkeletonText,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { CheckoutProductCard } from "@components/Cards";
import { PageHeader } from "@components/Layout";
import { client, createOrder, createTransaction, emptyCart, fetchCart, fetchPaymentPublicKey, updateOrder } from "@shared/api";
import { containerPadding } from "@shared/constants";
import { useAuthenticationStore, useCheckoutGrid } from "@shared/hooks";
import {
  Cart,
  CreateOrderFormState,
  CreateOrderState,
  CreateTransactionState,
  GenericErrorResponse,
  Order,
  RazorpayPaymentFailed,
  RazorpayPaymentSuccess,
  Transaction,
  UpdateOrderState,
} from "@shared/interface";
import { useAppStore } from "@shared/store";
import { isFieldInvalid } from "@shared/utils";
import { OrderValidationSchema } from "@shared/validations";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import * as React from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";

const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const app = useAppStore();
  const Razorpay = useRazorpay();

  const formikRef = React.useRef<FormikProps<CreateOrderFormState>>(null);

  const toast = useToast({ variant: "left-accent", position: "top", isClosable: true });

  const { isAuthenticated, isLoading, user } = useAuthenticationStore();

  const columns = useCheckoutGrid();

  const cart = useQuery({ queryKey: ["cart"], queryFn: fetchCart, enabled: isAuthenticated });

  const paymentKey = useQuery({ queryKey: ["payment-key"], queryFn: fetchPaymentPublicKey, enabled: isAuthenticated });

  const createOrderMutation = useMutation<Order, GenericErrorResponse, CreateOrderState>({ mutationFn: createOrder });
  const updateOrderMutation = useMutation<Order, GenericErrorResponse, UpdateOrderState>({ mutationFn: updateOrder });
  const createTransactionMutation = useMutation<Transaction, GenericErrorResponse, CreateTransactionState>({ mutationFn: createTransaction });
  const emptyCartMutation = useMutation<Cart, GenericErrorResponse, string>({ mutationFn: emptyCart });

  const initialValues: CreateOrderFormState = {
    fullName: "",
    addressLineOne: "",
    cityOrDistrict: "",
    emailAddress: "",
    phoneNumber: "",
    pinCode: "",
    state: "",
    addressLineTwo: "",
  };

  const onSubmit = React.useCallback(
    (values: CreateOrderFormState) => {
      if (!cart.data || cart.data.items.length === 0 || !paymentKey.data || !user) return;
      createOrderMutation.mutate(
        { ...values, products: cart.data.items, totalAmount: cart.data.totalPrice },
        {
          onSuccess: (order) => {
            const options: RazorpayOptions = {
              amount: (cart.data.totalPrice * 100).toFixed(2),
              currency: "INR",
              key: paymentKey.data.key,
              name: "Outstock",
              retry: {
                enabled: false,
              },
              notes: {
                addressLineOne: values.addressLineOne,
                addressLineTwo: values.addressLineTwo,
              },
              description: `Place order of products. Amount Payable: Rs. ${cart.data.totalPrice}`,
              prefill: {
                name: order.fullName,
                email: order.emailAddress,
                contact: order.phoneNumber,
              },
              order_id: order.oid,
              handler: (response: RazorpayPaymentSuccess) => {
                const razorpayOrderID = response.razorpay_order_id;
                const razorpayPaymentID = response.razorpay_payment_id;
                const razorpaySignature = response.razorpay_signature;

                createTransactionMutation.mutate(
                  {
                    amount: order.totalAmount,
                    emailAddress: order.emailAddress,
                    phoneNumber: order.phoneNumber,
                    order: order._id,
                    oid: order.oid,
                    razorpayOrderID,
                    razorpayPaymentID,
                    razorpaySignature,
                  },
                  {
                    onSuccess: (transaction) => {
                      updateOrderMutation.mutate(
                        { status: "placed", id: order._id },
                        {
                          onSuccess: () => {
                            emptyCartMutation.mutate(cart.data._id, {
                              onSuccess: () => {
                                client.invalidateQueries({ queryKey: ["cart"] });
                              },
                              onSettled: () => {
                                toast({ title: "Order placed", description: `Order with the id of ${order.oid} has been placed`, status: "success" });
                                Router.push({
                                  pathname: "/orders/success",
                                  query: { id: order._id, oid: order.oid, invoice: transaction._id, payment: transaction.paymentID },
                                });
                              },
                            });
                          },
                          onError: (error) => {
                            toast({ title: "Coudn't place order", description: error, status: "error" });
                            Router.push({ pathname: "/orders/failed", query: { ...error, invoice: transaction._id, id: order._id } });
                          },
                        }
                      );
                    },
                    onError: (error) => {
                      updateOrderMutation.mutate(
                        { status: "failed", id: order._id },
                        {
                          onSettled: () => {
                            toast({ title: "Coudn't place order", description: error, status: "error" });
                            Router.push({ pathname: "/orders/failed", query: { ...error, id: order._id } });
                          },
                        }
                      );
                    },
                  }
                );
              },
            };

            const razorpay = new Razorpay(options);

            razorpay.on("payment.failed", async ({ error }: RazorpayPaymentFailed) => {
              createTransactionMutation.mutate(
                {
                  amount: order.totalAmount,
                  emailAddress: order.emailAddress,
                  phoneNumber: order.phoneNumber,
                  order: order._id,
                  oid: order.oid,
                  razorpayOrderID: error.metadata.order_id,
                  razorpayPaymentID: error.metadata.payment_id,
                  razorpaySignature: "",
                },
                {
                  onSettled: (data) => {
                    updateOrderMutation.mutate(
                      { status: "failed", id: order._id },
                      {
                        onSettled: () => {
                          toast({ title: "Coudn't place order", description: error.code + " " + error.description, status: "error" });
                          const { metadata, ...rest } = error;
                          Router.push({ pathname: "/orders/failed", query: { ...rest, ...metadata, id: order._id, invoice: data?._id } });
                        },
                      }
                    );
                  },
                }
              );
            });

            razorpay.open();
          },
          onError: (error) => {
            toast({ title: "Coudn't place order", description: error, status: "error" });
            Router.push({ pathname: "/orders/failed", query: { ...error } });
          },
        }
      );
    },
    [Razorpay, cart.data, paymentKey.data, user]
  );

  if (isLoading) return null;

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <PageHeader title="Checkout" pathname={router.pathname} query={router.query} />
      <Box as="section" bg="white">
        <Container px={containerPadding} maxW="container.lg" pt={{ base: "12", lg: "16" }} pb="16">
          <Grid templateColumns={columns} gap="16">
            <GridItem colSpan={{ base: 1, md: 8 }}>
              <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={OrderValidationSchema} onSubmit={onSubmit}>
                {(formik) => (
                  <Form>
                    <FormControl isInvalid={isFieldInvalid(formik, "fullName")}>
                      <FormLabel textTransform="uppercase" htmlFor="full-name">
                        Full Name
                      </FormLabel>
                      <Field as={Input} name="fullName" id="full-name" variant="filled" placeholder="Enter your full name" />
                      <ErrorMessage name="fullName" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "emailAddress")}>
                      <FormLabel textTransform="uppercase" htmlFor="email">
                        Email
                      </FormLabel>
                      <Field as={Input} name="emailAddress" id="email" variant="filled" type="email" placeholder="Enter your email" />
                      <ErrorMessage name="emailAddress" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "phoneNumber")}>
                      <FormLabel textTransform="uppercase" htmlFor="phone-number">
                        Phone Number
                      </FormLabel>
                      <Field as={Input} name="phoneNumber" id="phone-number" variant="filled" placeholder="Enter your phone number" />
                      <ErrorMessage name="phoneNumber" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "addressLineOne")}>
                      <FormLabel textTransform="uppercase" htmlFor="address-1">
                        Address Line 1
                      </FormLabel>
                      <Field as={Input} name="addressLineOne" id="address-1" variant="filled" placeholder="Enter your address line 1" />
                      <ErrorMessage name="addressLineOne" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "addressLineTwo")}>
                      <FormLabel textTransform="uppercase" htmlFor="address-2">
                        Address Line 2 - Optional
                      </FormLabel>
                      <Field as={Input} name="addressLineTwo" id="address-2" variant="filled" placeholder="Enter your address line 2" />
                      <ErrorMessage name="addressLineTwo" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "pinCode")}>
                      <FormLabel textTransform="uppercase" htmlFor="pin-code">
                        PIN Code
                      </FormLabel>
                      <Field as={Input} name="pinCode" id="pin-code" variant="filled" type="number" placeholder="Enter your PIN code" />
                      <ErrorMessage name="pinCode" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "cityOrDistrict")}>
                      <FormLabel textTransform="uppercase" htmlFor="city">
                        City or District
                      </FormLabel>
                      <Field as={Input} name="cityOrDistrict" id="city" variant="filled" placeholder="Enter your city or district" />
                      <ErrorMessage name="cityOrDistrict" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "state")}>
                      <FormLabel textTransform="uppercase" htmlFor="state">
                        State
                      </FormLabel>
                      <Field as={Input} name="state" id="state" variant="filled" placeholder="Enter your state" />
                      <ErrorMessage name="state" component={FormErrorMessage} />
                    </FormControl>
                    <Button isFullWidth disabled={!cart.data?.items.length} type="submit" bg="black" color="white" colorScheme="blackAlpha" mt="10">
                      Checkout
                    </Button>
                  </Form>
                )}
              </Formik>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 6 }}>
              <SkeletonText isLoaded={cart.isFetched} noOfLines={6} spacing="4" skeletonHeight="4">
                {cart.data?.items.length ? (
                  <VStack spacing="6" alignItems="start">
                    {cart.data?.items.map((item) => (
                      <CheckoutProductCard key={item._id} {...item} />
                    ))}
                  </VStack>
                ) : (
                  <Text fontSize="lg">Looks like your cart is empty. Add some items to your cart and come back here. Enjoy shopping.</Text>
                )}
              </SkeletonText>
              <Divider mb="4" mt="8" />
              <SkeletonText isLoaded={cart.isFetched} noOfLines={1} skeletonHeight="4">
                <HStack spacing="8" justifyContent="space-between">
                  <Text fontSize="lg" fontWeight="semibold" textTransform="uppercase">
                    Total To Pay
                  </Text>
                  <Text fontSize="lg" fontWeight="semibold" textTransform="uppercase">
                    Rs. {cart.data?.totalPrice.toLocaleString()}
                  </Text>
                </HStack>
              </SkeletonText>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CheckoutPage;
