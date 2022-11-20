import { Box, Button, Container, Divider, HStack, SimpleGrid, SkeletonText, Stack, Text, VStack } from "@chakra-ui/react";
import { PageHeader } from "@components/Layout";
import { fetchAllTransactions } from "@shared/api";
import { containerPadding } from "@shared/constants";
import { useAuthenticationStore } from "@shared/hooks";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

const TransactionsPage = () => {
  const router = useRouter();

  const { isAuthenticated, isLoading } = useAuthenticationStore();

  const transactions = useQuery({ queryKey: ["transactions"], queryFn: fetchAllTransactions, enabled: isAuthenticated });

  if (isLoading) return null;

  return (
    <>
      <Head>
        <title>My Payments</title>
      </Head>
      <PageHeader title="My Payments" pathname={router.pathname} query={router.query} />
      <Box as="section" bg="white">
        <Container px={containerPadding} maxW="container.xl" py="12">
          <SkeletonText isLoaded={transactions.isFetched} noOfLines={8} skeletonHeight="4" w="full">
            <VStack align="start" spacing="8">
              {transactions.data?.map((transaction) => (
                <React.Fragment key={transaction._id}>
                  <SimpleGrid columns={[1, 2, 3, 4]} columnGap="16" rowGap="8">
                    <Stack>
                      <Text fontWeight="semibold">Payment ID</Text>
                      <Text>{transaction._id}</Text>
                    </Stack>
                    <Stack>
                      <Text fontWeight="semibold">Invoice</Text>
                      <Text>{transaction.paymentID}</Text>
                    </Stack>
                    <Stack>
                      <Text fontWeight="semibold">Payment Date</Text>
                      <Text>{moment(transaction.createdAt).format("LLL")}</Text>
                    </Stack>
                    <Stack>
                      <Text fontWeight="semibold">Order ID</Text>
                      <Text>{transaction.oid}</Text>
                    </Stack>
                    <Stack>
                      <Text fontWeight="semibold">Payment Status</Text>
                      <Text textTransform="capitalize">{transaction.paymentStatus}</Text>
                    </Stack>
                    <Stack>
                      <Text fontWeight="semibold">Refund Status</Text>
                      <Text>{transaction.refundStatus || "N/A"}</Text>
                    </Stack>
                    <Stack>
                      <Text fontWeight="semibold">Refund Amount</Text>
                      <Text>Rs. {transaction.refundAmount?.toFixed(0) || 0}</Text>
                    </Stack>
                    <Stack>{/*<Button textTransform="capitalize">See Payment Details</Button>*/}</Stack>
                  </SimpleGrid>
                  <Divider />
                </React.Fragment>
              ))}
            </VStack>
          </SkeletonText>
        </Container>
      </Box>
    </>
  );
};

export default TransactionsPage;
