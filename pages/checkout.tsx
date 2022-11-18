import Head from "next/head";
import * as React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { fetchCart } from "@shared/api";
import { PageHeader } from "@components/Layout";
import { useQuery } from "@tanstack/react-query";
import { containerPadding } from "@shared/constants";
import { CheckoutProductCard } from "@components/Cards";
import { useAppStore, useSessionStore } from "@shared/store";
import { Box, Container, Divider, HStack, Grid, Text, VStack, GridItem } from "@chakra-ui/react";
import { isBrowser } from "framer-motion";

const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const app = useAppStore();

  const { isAuthenticated, isLoading } = useSessionStore();

  const cart = useQuery({ queryKey: ["cart"], queryFn: fetchCart, refetchOnMount: false, enabled: isAuthenticated });

  React.useEffect(() => {
    app.setCartSidebarOpen(false);
  }, []);

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
        <Container px={containerPadding} maxW="container.xl" py="16">
          <Grid templateColumns="repeat(6, 1fr)">
            <GridItem colSpan={4}></GridItem>
            <GridItem colSpan={2}>
              <VStack spacing="6" alignItems="start">
                {cart.data?.items.map((item) => (
                  <CheckoutProductCard {...item} />
                ))}
              </VStack>
              <Divider mb="4" mt="8" />
              <HStack spacing="8" justifyContent="space-between">
                <Text fontSize="lg" fontWeight="semibold" textTransform="uppercase">
                  Total To Pay
                </Text>
                <Text fontSize="lg" fontWeight="semibold" textTransform="uppercase">
                  Rs. {cart.data?.totalPrice}
                </Text>
              </HStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CheckoutPage;
