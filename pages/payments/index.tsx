import { Box, Container, SkeletonText, Text, VStack } from "@chakra-ui/react";
import { PageHeader } from "@components/Layout";
import { fetchAllTransactions } from "@shared/api";
import { containerPadding } from "@shared/constants";
import { useAuthenticationStore } from "@shared/hooks";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";

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
          <SkeletonText isLoaded={transactions.isFetched} noOfLines={8} lineHeight="4" skeletonHeight="4" w="full">
            <VStack spacing="8">
              {transactions.data?.map((transaction) => (
                <Text>{JSON.stringify(transaction)}</Text>
              ))}
            </VStack>
          </SkeletonText>
        </Container>
      </Box>
    </>
  );
};

export default TransactionsPage;
