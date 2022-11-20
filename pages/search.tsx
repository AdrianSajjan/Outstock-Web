import { Box, Container, Grid, GridItem, SkeletonText, useToast } from "@chakra-ui/react";
import { PageHeader } from "@components/Layout";
import { containerPadding } from "@shared/constants";
import { NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "@shared/api";
import { use4ColumnResponseGrid } from "@shared/hooks";
import { ProductCard } from "@components/Cards";

const SearchPage: NextPage = () => {
  const router = useRouter();

  const toast = useToast({ variant: "left-accent", position: "top", isClosable: true });

  const columns = use4ColumnResponseGrid();

  const [searchKey, setSearchKey] = React.useState("");

  React.useEffect(() => {
    if (!router.isReady) return;
    const key = router.query.key as string;
    if (!key || !key.length || key.length < 4) {
      toast({ status: "warning", title: "Unable to search", description: "Please provide a longer search key" });
      router.push("/");
    } else {
      setSearchKey(key);
    }
  }, [router]);

  const results = useQuery({ queryKey: ["search", searchKey], enabled: !!searchKey, queryFn: () => searchProducts(searchKey) });

  return (
    <>
      <Head>
        <title>Search Results</title>
      </Head>
      <PageHeader title="Search Results" pathname={router.pathname} query={router.query} />
      <Box as="section" bg="white">
        <Container px={containerPadding} maxW="container.2xl" pt="12" pb="16">
          <Box>
            <SkeletonText noOfLines={8} isLoaded={results.isFetched} skeletonHeight="4" spacing={4}>
              <Grid placeItems="center" templateColumns={columns} gridGap={10}>
                {results.data?.map((product) => (
                  <GridItem w="full" maxW="96" key={product._id}>
                    <ProductCard {...product} />
                  </GridItem>
                ))}
              </Grid>
            </SkeletonText>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SearchPage;
