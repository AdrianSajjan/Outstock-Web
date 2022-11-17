import { Box, Button, Container, Flex, Grid, GridItem, Spinner, useMediaQuery } from "@chakra-ui/react";
import { ProductCard } from "@components/Cards";
import { ProductFilterAndSort } from "@components/Filter";
import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useFilter, use4ColumnResponseGrid } from "@shared/hooks";
import { fetchProducts } from "@shared/api";
import { PageHeader } from "@components/Layout";
import { GetServerSideProps, NextPage } from "next";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductPageProps, ProductPageServerSideProps } from "@shared/interface";
import { acceptedCategoryRoutes, containerPadding, perRequestProductLimit } from "@shared/constants";

const Products: NextPage<ProductPageProps> = ({ data }) => {
  const router = useRouter();
  const category = router.query.category as string;

  const columns = use4ColumnResponseGrid();

  const { sort, filter, ...rest } = useFilter();

  const query = useInfiniteQuery({
    queryKey: ["products", category, filter],
    queryFn: ({ pageParam = 1 }) => fetchProducts({ category, page: pageParam, ...filter }),
    getNextPageParam: (lastPage, pages) => {
      if (pages.length * perRequestProductLimit >= lastPage.total) return false;
      return lastPage.nextPage;
    },
    initialData: {
      pages: [data],
      pageParams: [undefined],
    },
  });

  const handleNextPage = () => query.fetchNextPage();

  return (
    <>
      <Head>
        <title>{_.upperFirst(category)}&apos;s Shopping</title>
      </Head>
      <PageHeader title={category} pathname={router.pathname} query={router.query} />

      <Box as="section" bg="white">
        <Container px={containerPadding} maxW="container.2xl" py="8">
          <ProductFilterAndSort {...{ sort, ...rest }} />
          <Box pt="16">
            {query.isFetching && !query.isFetchingNextPage ? (
              <Flex h="24" align="center" justify="center">
                <Spinner size="lg" />
              </Flex>
            ) : (
              <Grid placeItems="center" templateColumns={columns} gridGap={10}>
                {query.data?.pages.map((page) =>
                  page.products.map((product) => (
                    <GridItem w="full" maxW="96" key={product._id}>
                      <ProductCard {...product} />
                    </GridItem>
                  ))
                )}
              </Grid>
            )}
          </Box>
          <Box pt="16" pb="16">
            <Button isDisabled={!query.hasNextPage} isLoading={query.isFetchingNextPage} onClick={handleNextPage} isFullWidth>
              Load More
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductPageServerSideProps> = async ({ query }) => {
  const category = query.category as string;

  if (!acceptedCategoryRoutes.includes(category))
    return {
      notFound: true,
    };

  const data = await fetchProducts({ category, page: 1 });

  return {
    props: {
      data,
    },
  };
};

export default Products;
