import Head from "next/head";
import * as React from "react";
import { useRouter } from "next/router";
import { PageHeader } from "@components/Layout";
import NextLink from "next/link";
import { Box, Button, Container, Divider, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { containerPadding } from "@shared/constants";
import { useAuthenticationStore, useCart } from "@shared/hooks";
import { CartProductCard } from "@components/Cards";

const CartPage = () => {
  const router = useRouter();

  const { isLoading, isAuthenticated } = useAuthenticationStore();

  const { cart, handleAdd, handleRemoveItem, handleRemoveProduct } = useCart(isAuthenticated);

  if (isLoading) return null;

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <PageHeader title="Cart" pathname={router.pathname} query={router.query} />
      <Box as="section" bg="white">
        <Container px={containerPadding} maxW="container.sm" pt="16" pb="16">
          <VStack alignItems="stretch" spacing="8">
            <VStack spacing="8" alignItems="stretch">
              {cart.data?.items.map(({ _id, ...props }) => (
                <React.Fragment key={_id}>
                  <CartProductCard {...{ _id, ...props, handleAdd, handleEmpty: handleRemoveItem, handleRemove: handleRemoveProduct }} />
                  <Divider />
                </React.Fragment>
              ))}
            </VStack>
            <VStack spacing="4">
              <HStack justifyContent="space-between" alignSelf="stretch">
                <Text fontSize="lg">Total</Text>
                <Text fontSize="lg" fontWeight="medium">
                  ₹ {cart.data?.totalPrice.toLocaleString() || 0}
                </Text>
              </HStack>
              <NextLink href="/checkout" passHref>
                <Button as="a" isFullWidth mt="4" colorScheme="blackAlpha" bg="black">
                  Proceed To Check Out
                </Button>
              </NextLink>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default CartPage;
