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
import { createOrder, createTransaction, fetchCart, fetchPaymentPublicKey, updateOrder } from "@shared/api";
import { containerPadding } from "@shared/constants";
import { useCheckoutGrid } from "@shared/hooks";
import {
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
import { useAppStore, useSessionStore } from "@shared/store";
import { isFieldInvalid } from "@shared/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { isBrowser } from "framer-motion";
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

  const { isAuthenticated, isLoading, user } = useSessionStore();

  const columns = useCheckoutGrid();

  const cart = useQuery({ queryKey: ["cart"], queryFn: fetchCart, enabled: isAuthenticated });

  const paymentKey = useQuery({ queryKey: ["payment-key"], queryFn: fetchPaymentPublicKey, enabled: isAuthenticated });

  const createOrderMutation = useMutation<Order, GenericErrorResponse, CreateOrderState>({ mutationFn: createOrder });
  const updateOrderMutation = useMutation<Order, GenericErrorResponse, UpdateOrderState>({ mutationFn: updateOrder });
  const createTransactionMutation = useMutation<Transaction, GenericErrorResponse, CreateTransactionState>({ mutationFn: createTransaction });

  React.useEffect(() => {
    app.setCartSidebarOpen(false);
  }, []);

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
      if (!cart.data || !paymentKey.data || !user) return;
      createOrderMutation.mutate(
        { ...values, cart: cart.data._id, totalAmount: cart.data.totalPrice },
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
                            toast({ title: "Order placed", description: `Order with the id of ${order.oid} has been placed`, status: "success" });
                            Router.push({
                              pathname: "/order/success",
                              query: { id: order.oid, invoice: transaction.paymentID, signature: razorpaySignature },
                            });
                          },
                          onError: (error) => {
                            toast({ title: "Coudn't place order", description: error, status: "error" });
                            Router.push({ pathname: "/order/failed", query: { ...error } });
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
                            Router.push({ pathname: "/order/failed", query: { ...error } });
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
                  onSettled: () => {
                    updateOrderMutation.mutate(
                      { status: "failed", id: order._id },
                      {
                        onSettled: () => {
                          toast({ title: "Coudn't place order", description: error.code + " " + error.description, status: "error" });
                          const { metadata, ...rest } = error;
                          Router.push({ pathname: "/order/failed", query: { ...rest, ...metadata } });
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
            Router.push({ pathname: "/order/failed", query: { ...error } });
          },
        }
      );
    },
    [Razorpay, cart.data, paymentKey.data, user]
  );

  if (isLoading) return null;

  if (!isAuthenticated && isBrowser) {
    router.push("/");
  }

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
              <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={onSubmit}>
                {(formik) => (
                  <Form>
                    <FormControl isInvalid={isFieldInvalid(formik, "fullName")} isRequired>
                      <FormLabel textTransform="uppercase" htmlFor="full-name">
                        Full Name
                      </FormLabel>
                      <Field as={Input} name="fullName" id="full-name" variant="filled" placeholder="Enter your full name" />
                      <ErrorMessage name="fullName" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "emailAddress")} isRequired>
                      <FormLabel textTransform="uppercase" htmlFor="email">
                        Email
                      </FormLabel>
                      <Field as={Input} name="emailAddress" id="email" variant="filled" type="email" placeholder="Enter your email" />
                      <ErrorMessage name="emailAddress" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "phoneNumber")} isRequired>
                      <FormLabel textTransform="uppercase" htmlFor="phone-number">
                        Phone Number
                      </FormLabel>
                      <Field as={Input} name="phoneNumber" id="phone-number" variant="filled" placeholder="Enter your phone number" />
                      <ErrorMessage name="phoneNumber" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "addressLineOne")} isRequired>
                      <FormLabel textTransform="uppercase" htmlFor="address-1">
                        Address Line 1
                      </FormLabel>
                      <Field as={Input} name="addressLineOne" id="address-1" variant="filled" placeholder="Enter your address line 1" />
                      <ErrorMessage name="addressLineOne" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "addressLineTwo")}>
                      <FormLabel textTransform="uppercase" htmlFor="address-2">
                        Address Line 2
                      </FormLabel>
                      <Field as={Input} name="addressLineTwo" id="address-2" variant="filled" placeholder="Enter your address line 2" />
                      <ErrorMessage name="addressLineTwo" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "pinCode")} isRequired>
                      <FormLabel textTransform="uppercase" htmlFor="pin-code">
                        PIN Code
                      </FormLabel>
                      <Field as={Input} name="pinCode" id="pin-code" variant="filled" type="number" placeholder="Enter your PIN code" />
                      <ErrorMessage name="pinCode" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "cityOrDistrict")} isRequired>
                      <FormLabel textTransform="uppercase" htmlFor="city">
                        City or District
                      </FormLabel>
                      <Field as={Input} name="cityOrDistrict" id="city" variant="filled" placeholder="Enter your city or district" />
                      <ErrorMessage name="cityOrDistrict" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "state")} isRequired>
                      <FormLabel textTransform="uppercase" htmlFor="state">
                        State
                      </FormLabel>
                      <Field as={Input} name="state" id="state" variant="filled" placeholder="Enter your state" />
                      <ErrorMessage name="state" component={FormErrorMessage} />
                    </FormControl>
                    <Button isFullWidth type="submit" bg="black" color="white" colorScheme="blackAlpha" mt="10">
                      Checkout
                    </Button>
                  </Form>
                )}
              </Formik>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 6 }}>
              <SkeletonText isLoaded={cart.isFetched} noOfLines={6} spacing="4" skeletonHeight="4">
                <VStack spacing="6" alignItems="start">
                  {cart.data?.items.map((item) => (
                    <CheckoutProductCard key={item._id} {...item} />
                  ))}
                </VStack>
              </SkeletonText>
              <Divider mb="4" mt="8" />
              <SkeletonText isLoaded={cart.isFetched} noOfLines={1} skeletonHeight="4">
                <HStack spacing="8" justifyContent="space-between">
                  <Text fontSize="lg" fontWeight="semibold" textTransform="uppercase">
                    Total To Pay
                  </Text>
                  <Text fontSize="lg" fontWeight="semibold" textTransform="uppercase">
                    Rs. {cart.data?.totalPrice}
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
