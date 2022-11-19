import Head from "next/head";
import { useRouter } from "next/router";
import { PageHeader } from "@components/Layout";
import { Box, Container } from "@chakra-ui/react";
import { containerPadding } from "@shared/constants";

const OrderFailedPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Order Failure</title>
      </Head>
      <PageHeader title="Order Failed" pathname={router.pathname} query={router.query} />
      <Box as="section" bg="white">
        <Container px={containerPadding} maxW="container.lg" py="8"></Container>
      </Box>
    </>
  );
};

export default OrderFailedPage;
