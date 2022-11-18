import Head from "next/head";
import * as React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { fetchCart, fetchPaymentPublicKey } from "@shared/api";
import { PageHeader } from "@components/Layout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { containerPadding } from "@shared/constants";
import { CheckoutProductCard } from "@components/Cards";
import { useAppStore, useSessionStore } from "@shared/store";
import {
  Box,
  Container,
  Divider,
  HStack,
  Grid,
  Text,
  VStack,
  GridItem,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  SkeletonText,
  Button,
} from "@chakra-ui/react";
import { isBrowser } from "framer-motion";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { isFieldInvalid } from "@shared/utils";
import { useCheckoutGrid } from "@shared/hooks";
import useRazorpay, { RazorpayOptions } from "react-razorpay";

const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const app = useAppStore();
  const Razorpay = useRazorpay();

  const { isAuthenticated, isLoading } = useSessionStore();

  const columns = useCheckoutGrid();

  const cart = useQuery({ queryKey: ["cart"], queryFn: fetchCart, refetchOnMount: false, enabled: isAuthenticated });

  const paymentKey = useQuery({
    queryKey: ["payment-key"],
    queryFn: fetchPaymentPublicKey,
    enabled: isAuthenticated,
  });

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      return { _id: "" };
    },
  });

  console.log(paymentKey.data);

  React.useEffect(() => {
    app.setCartSidebarOpen(false);
  }, []);

  const initialValues = {};

  const onSubmit = React.useCallback(
    (values: any) => {
      if (!cart.data || !paymentKey.data) return;
      createOrderMutation.mutate(undefined, {
        onSuccess: (order) => {
          const options: RazorpayOptions = {
            amount: `${cart.data.totalPrice * 100}`,
            currency: "INR",
            key: paymentKey.data.key,
            name: "Outstock",
            order_id: order._id,
            handler: (response: any) => {
              alert(JSON.stringify(response));
            },
          };

          const rzp = new Razorpay(options);

          rzp.on("payment.failed", (response: any) => {
            alert(JSON.stringify(response));
          });

          rzp.open();
        },
        onError: () => {},
      });
    },
    [Razorpay]
  );

  console.log(isLoading);

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
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {(formik) => (
                  <Form>
                    <FormControl isInvalid={isFieldInvalid(formik, "firstName")} isRequired>
                      <FormLabel textTransform="uppercase" htmlFor="first-name">
                        Full Name
                      </FormLabel>
                      <Field as={Input} name="firstName" id="first-name" variant="filled" placeholder="Enter your first name" />
                      <ErrorMessage name="firstName" component={FormErrorMessage} />
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
                      <Field as={Input} name="phoneNumber" id="phone-number" variant="filled" type="number" placeholder="Enter your phone number" />
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
                    <FormControl mt="6" isInvalid={isFieldInvalid(formik, "postalCode")} isRequired>
                      <FormLabel textTransform="uppercase" htmlFor="pin-code">
                        Postal Code
                      </FormLabel>
                      <Field as={Input} name="postalCode" id="pin-code" variant="filled" type="number" placeholder="Enter your PIN code" />
                      <ErrorMessage name="postalCode" component={FormErrorMessage} />
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
