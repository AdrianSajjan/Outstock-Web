import { Box, Button, Container, Divider, HStack, SkeletonText, Stack, Text, VStack } from "@chakra-ui/react";
import { OrderProductCard } from "@components/Cards";
import { PageHeader } from "@components/Layout";
import { fetchOrderByID, fetchTransactionByID } from "@shared/api";
import { containerPadding } from "@shared/constants";
import { useLessThan768px } from "@shared/hooks";
import { parsePaymentType } from "@shared/utils";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

const OrderSuccessPage = () => {
  const router = useRouter();

  const isLessThan768px = useLessThan768px();

  const [orderID, setOrder] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [transactionID, setTransaction] = React.useState<string | null>(null);

  const order = useQuery({
    queryKey: ["order", orderID],
    queryFn: () => fetchOrderByID(orderID!),
    enabled: !!orderID,
  });

  const transaction = useQuery({
    queryKey: ["transaction", transactionID],
    queryFn: () => fetchTransactionByID(transactionID!),
    enabled: !!transactionID,
  });

  React.useEffect(() => {
    if (!router.isReady) return;

    const order_ID = router.query.id as string;
    const transaction_ID = router.query.invoice as string;

    if (!order_ID || !transaction_ID) {
      return setError("The URL supplied is invalid");
    }

    setOrder(order_ID);
    setTransaction(transaction_ID);
  }, [router]);

  const isOrderLoaded = React.useMemo(() => {
    if (error) return true;
    else return order.isFetched;
  }, [order.isFetched, error]);

  return (
    <>
      <Head>
        <title>Order Success</title>
      </Head>
      <PageHeader title="Order Success" pathname={router.pathname} query={router.query} />
      <Box as="section" bg="white">
        <Container px={containerPadding} maxW="container.lg" py="12">
          <VStack alignItems="start" spacing="4" mb="6">
            <SkeletonText w="full" isLoaded={isOrderLoaded} skeletonHeight="4">
              <Text fontWeight="semibold" color={error ? "red.600" : "black"}>
                {error || "Your order has been confirmed and will reach to you soon."}
              </Text>
            </SkeletonText>
            <Divider />
            <SkeletonText w="full" isLoaded={isOrderLoaded} skeletonHeight="4" noOfLines={2} lineHeight="2">
              <Stack direction={isLessThan768px ? "column" : "row"} spacing="0" gap="4" w="full" wrap="wrap" justify="space-between">
                <Stack>
                  <Text color="gray.500">Order Date</Text>
                  <Text>{moment(order.data?.createdAt).format("LLL")}</Text>
                </Stack>
                <Stack>
                  <Text color="gray.500">Order ID</Text>
                  <Text>{order.data?.oid}</Text>
                </Stack>
                <Stack>
                  <Text color="gray.500">Payment</Text>
                  <Text>{parsePaymentType(transaction.data)}</Text>
                </Stack>
                <Stack>
                  <Text color="gray.500">Address</Text>
                  <Text>
                    {order.data?.addressLineOne}, {order.data?.addressLineTwo}
                  </Text>
                </Stack>
              </Stack>
            </SkeletonText>
            <Divider />
            <SkeletonText w="full" isLoaded={isOrderLoaded} skeletonHeight="4" noOfLines={6} lineHeight="2">
              <Box w="full">
                {order.data?.products.map((item) => (
                  <OrderProductCard item={item} />
                ))}
              </Box>
            </SkeletonText>
            <Divider />
            <SkeletonText w="full" isLoaded={isOrderLoaded} skeletonHeight="4" noOfLines={2} lineHeight="2">
              <HStack justify="space-between" w="full" py="2">
                <Text fontSize="lg" fontWeight="semibold">
                  Total
                </Text>
                <Text>Rs. {order.data?.totalAmount}</Text>
              </HStack>
            </SkeletonText>
            <Divider />
            <SkeletonText w="full" isLoaded={isOrderLoaded} skeletonHeight="4" noOfLines={4} lineHeight="2">
              <Box pb="4">
                <Text>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint vel maiores, nostrum quis pariatur dignissimos? Aperiam ducimus
                  cupiditate. We appreciate your business, hope you enjoy your purchase.
                </Text>
                <Text fontWeight="semibold" mt="4">
                  Thank You!
                </Text>
              </Box>
            </SkeletonText>
            <NextLink href="/" passHref>
              <Button as="a" isFullWidth>
                Go Back To Home
              </Button>
            </NextLink>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default OrderSuccessPage;
