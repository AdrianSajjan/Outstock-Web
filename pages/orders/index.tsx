import { Box, Container, SkeletonText, VStack } from "@chakra-ui/react";
import { OrderCard } from "@components/Cards";
import { PageHeader } from "@components/Layout";
import { fetchAllOrders } from "@shared/api";
import { containerPadding } from "@shared/constants";
import { useAuthenticationStore } from "@shared/hooks";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";

const OrdersPage = () => {
  const router = useRouter();

  const { isAuthenticated, isLoading } = useAuthenticationStore();

  const orders = useQuery({ queryKey: ["orders"], queryFn: fetchAllOrders, enabled: isAuthenticated });

  if (isLoading) return null;

  return (
    <>
      <Head>
        <title>My Orders</title>
      </Head>
      <PageHeader title="My Orders" pathname={router.pathname} query={router.query} />
      <Box as="section" bg="white">
        <Container px={containerPadding} maxW="container.xl" py="12">
          <SkeletonText isLoaded={orders.isFetched} noOfLines={8} skeletonHeight="4" w="full">
            <VStack spacing="8">
              {orders.data?.map((order) => (
                <OrderCard key={order._id} order={order} px={{ base: "0", md: "16" }} />
              ))}
            </VStack>
          </SkeletonText>
        </Container>
      </Box>
    </>
  );
};

export default OrdersPage;
