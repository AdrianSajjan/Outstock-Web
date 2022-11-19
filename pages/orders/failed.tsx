import { Box, Button, Container, Divider, Flex, HStack, SkeletonText, Stack, Text, VStack } from "@chakra-ui/react";
import { OrderProductCard } from "@components/Cards";
import { PageHeader } from "@components/Layout";
import { fetchOrderByID } from "@shared/api";
import { containerPadding } from "@shared/constants";
import { useLessThan768px } from "@shared/hooks";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import moment from "moment";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

const OrderFailedPage = () => {
  const router = useRouter();

  const isLessThan768px = useLessThan768px();

  const [error, setError] = React.useState<string | null>(null);
  const [orderID, setOrder] = React.useState<string | null>(null);
  const [reasons, setReasons] = React.useState<Array<Array<string>>>([]);

  const order = useQuery({
    queryKey: ["order", orderID],
    queryFn: () => fetchOrderByID(orderID!),
    enabled: !!orderID,
  });

  React.useEffect(() => {
    if (!router.isReady) return;

    const { id: order_ID, ...reason } = router.query;
    if (!order_ID) return setError("The URL supplied is invalid");
    setOrder(order_ID as string);

    setReasons(Object.entries(reason as Record<string, string>));
  }, [router]);

  const isOrderLoaded = React.useMemo(() => {
    if (error) return true;
    else return order.isFetched;
  }, [order.isFetched, error]);

  return (
    <>
      <Head>
        <title>Order Failed</title>
      </Head>
      <PageHeader title="Order Failed" pathname={router.pathname} query={router.query} />
      <Box as="section" bg="white">
        <Container px={containerPadding} maxW="container.lg" py="12">
          <VStack alignItems="start" spacing="4" mb="6">
            <SkeletonText w="full" isLoaded={isOrderLoaded} skeletonHeight="4">
              <Text fontWeight="semibold" color="red.600">
                {error || "Your order coudn't be placed. More information can be found below."}
              </Text>
            </SkeletonText>
            <SkeletonText w="full" isLoaded={isOrderLoaded} skeletonHeight="4" noOfLines={4}>
              <Flex w="full" wrap="wrap" gap="4" mb="8">
                {reasons.map((reason) => (
                  <Flex>
                    <Text>{_.upperFirst(reason[0])}:</Text>
                    <Text fontWeight="semibold" ml="2">
                      {reason[1]}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </SkeletonText>
            <Divider />
            <SkeletonText w="full" isLoaded={isOrderLoaded} skeletonHeight="4" noOfLines={2} lineHeight="2">
              <Stack spacing="4" direction={isLessThan768px ? "column" : "row"} align="flex-start" justify="space-between" w="full">
                <Stack spacing="0">
                  <Text color="gray.500">Order Date</Text>
                  <Text>{moment(order.data?.createdAt).format("LLL")}</Text>
                </Stack>
                <Stack spacing="0">
                  <Text color="gray.500">Order ID</Text>
                  <Text>{order.data?.oid}</Text>
                </Stack>
                <Stack spacing="0">
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
                  Your order coudn't be completed due to some reason. If any money is deducted from your account it will be refunded within 2-3
                  business days. In case of a delay, feel free to contact us. More details regarding the failure can be found above.
                </Text>
                <Text fontWeight="semibold" mt="4">
                  Regards!
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

export default OrderFailedPage;
