import { Box, Container } from "@chakra-ui/react";
import { PageHeader } from "@components/Layout";
import { containerPadding } from "@shared/constants";
import { useSessionStore } from "@shared/store";
import { isBrowser } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";

const CartPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSessionStore();

  if (isLoading) return null;

  if (!isAuthenticated && isBrowser) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <PageHeader title="Cart" pathname={router.pathname} query={router.query} />
      <Box as="section" bg="white">
        <Container px={containerPadding} maxW="container.lg" pt={{ base: "12", lg: "16" }} pb="16"></Container>
      </Box>
    </>
  );
};

export default CartPage;
