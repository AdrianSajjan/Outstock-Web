import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { PageHeader } from "@components/Layout";
import { Box, Container, Divider, Flex, HStack, SkeletonText, Stack, Text, VStack } from "@chakra-ui/react";
import { containerPadding } from "@shared/constants";
import { useQuery } from "@tanstack/react-query";
import { fetchAllOrders } from "@shared/api";
import { useAuthenticationStore, useLessThan768px } from "@shared/hooks";
import Image from "next/image";
import moment from "moment";
import { parsePaymentType } from "@shared/utils";
import { OrderCard } from "@components/Cards";

const OrdersPage = () => {
  const router = useRouter();

  const isLessThan768px = useLessThan768px();

  const { isAuthenticated, isLoading } = useAuthenticationStore();

  const orders = useQuery({ queryKey: ["orders"], queryFn: fetchAllOrders, enabled: isAuthenticated });

  console.log(orders.data);

  if (isLoading) return null;

  return (
    <>
      <Head>
        <title>My Orders</title>
      </Head>
      <PageHeader title="My Orders" pathname={router.pathname} query={router.query} />
      <Box as="section" bg="white">
        <Container px={containerPadding} maxW="container.xl" py="12">
          <SkeletonText isLoaded={orders.isFetched} noOfLines={8} lineHeight="4" skeletonHeight="4" w="full">
            <VStack spacing="8">
              {orders.data?.map((order) => (
                <OrderCard order={order} />
              ))}
            </VStack>
          </SkeletonText>
        </Container>
      </Box>
    </>
  );
};

export default OrdersPage;
