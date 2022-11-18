import Head from "next/head";
import { useRouter } from "next/router";
import { PageHeader } from "@components/Layout";
import { Box, Container } from "@chakra-ui/react";
import { containerPadding } from "@shared/constants";

const OrderSuccessPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Order Success</title>
      </Head>
      <PageHeader title="Order Success" pathname={router.pathname} query={router.query} />
      <Box as="section" bg="white">
        <Container px={containerPadding} maxW="container.lg" pt={{ base: "12", lg: "16" }} pb="16"></Container>
      </Box>
    </>
  );
};

export default OrderSuccessPage;
