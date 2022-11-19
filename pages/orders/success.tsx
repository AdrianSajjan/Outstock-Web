import Head from "next/head";
import _ from "lodash";
import * as React from "react";
import { useRouter } from "next/router";
import { PageHeader } from "@components/Layout";
import { Box, Container, Divider, Flex, GridItem, HStack, SkeletonText, Text, useToast, VStack } from "@chakra-ui/react";
import { containerPadding } from "@shared/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchOrderByID, fetchTransactionByID } from "@shared/api";
import moment from "moment";
import { parsePaymentType } from "@shared/utils";
import Image from "next/image";

const OrderSuccessPage = () => {
  const router = useRouter();

  const [orderID, setOrder] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [transactionID, setTransaction] = React.useState<string | null>(null);

  const toast = useToast({ variant: "left-accent", position: "top", isClosable: true });

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

  const isTransactionLoaded = React.useMemo(() => {
    if (error) return true;
    else return transaction.isFetched;
  }, [transaction.isFetched, error]);

  return (
    <>
      <Head>
        <title>Order Success</title>
      </Head>
      <PageHeader title="Order Success" pathname={router.pathname} query={router.query} />
      <Box as="section" bg="white">
        <Container px={containerPadding} maxW="container.lg" py="12">
          <VStack alignItems="start" spacing="4" mb="6">
            <SkeletonText isLoaded={isOrderLoaded} skeletonHeight="4">
              {error ? (
                <Text fontWeight="semibold" color="red.400">
                  {error}
                </Text>
              ) : (
                <Text fontWeight="medium">Your order has been confirmed and will reach to you soon.</Text>
              )}
            </SkeletonText>
            <Divider />
            <SkeletonText isLoaded={isOrderLoaded && isTransactionLoaded} skeletonHeight="4" noOfLines={2} lineHeight="2">
              <HStack spacing="16" align="flex-start">
                <VStack>
                  <Text color="gray.500">Order Date</Text>
                  <Text>{moment(order.data?.createdAt).format("LLL")}</Text>
                </VStack>
                <VStack>
                  <Text color="gray.500">Order ID</Text>
                  <Text>{order.data?.oid}</Text>
                </VStack>
                <VStack>
                  <Text color="gray.500">Payment</Text>
                  <Text>{parsePaymentType(transaction.data)}</Text>
                </VStack>
                <VStack>
                  <Text color="gray.500">Address</Text>
                  <Text>
                    {order.data?.addressLineOne}, {order.data?.addressLineTwo}
                  </Text>
                </VStack>
              </HStack>
            </SkeletonText>
            <Divider />
            <Box w="full">
              {order.data?.cart.items.map((item) => (
                <Flex py="4" alignItems="center" w="full">
                  <Box h="32" w="32" bg="red.200" pos="relative">
                    <Image layout="fill" objectFit="cover" src={item.product.images[0]} />
                  </Box>
                  <Text ml="8">
                    {item.product.name} - {_.upperFirst(item.product.category.name)}
                  </Text>
                  <Text ml="auto" mr="12">
                    Qty: {item.quantity}
                  </Text>
                  <Text>Rs. {item.product.price * item.quantity}</Text>
                </Flex>
              ))}
            </Box>
            <Divider />
            <HStack justify="space-between" w="full" py="2">
              <Text fontSize="lg" fontWeight="semibold">
                Total
              </Text>
              <Text>Rs. {order.data?.cart.totalPrice}</Text>
            </HStack>
            <Divider />
            <Box>
              <Text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint vel maiores, nostrum quis pariatur dignissimos? Aperiam ducimus
                cupiditate. We appreciate your business, hope you enjoy your purchase.
              </Text>
              <Text fontWeight="semibold" mt="4">
                Thank You!
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default OrderSuccessPage;
