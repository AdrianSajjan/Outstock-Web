import { Box, Button, Container, Grid, GridItem } from "@chakra-ui/react";
import { ProductCard } from "@components/Cards";
import { ProductFilterAndSort } from "@components/Filter";
import { PageHeader } from "@components/Layout";
import { fetchProducts } from "@shared/api";
import { acceptedCategoryRoutes } from "@shared/constants";
import { useFilter } from "@shared/hooks";
import { ProductPageProps, ProductPageServerSideProps } from "@shared/interface";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

const Products: NextPage<ProductPageProps> = ({ data }) => {
  const router = useRouter();
  const category = router.query.category as string;

  const { subcategory, filter, ...rest } = useFilter();

  const query = useQuery({
    queryKey: ["products", category, filter.subcategory, ...Object.values(filter.price)],
    queryFn: () => fetchProducts({ category, ...filter }),
    initialData: data,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Head>
        <title>{_.upperFirst(category)}&apos;s Shopping</title>
      </Head>
      <PageHeader title={category} pathname={router.pathname} query={router.query} />
      <Box as="section" bg="white">
        <Container maxW="container.2xl" py="8">
          <ProductFilterAndSort {...{ subcategory, ...rest }} />
          <Box pt="16">
            <Grid templateColumns="repeat(4, 1fr)" gridGap={10}>
              {query.data.map((product) => (
                <GridItem key={product._id}>
                  <ProductCard {...product} />
                </GridItem>
              ))}
            </Grid>
          </Box>
          <Box pt="16" pb="16">
            <Button isFullWidth>Load More</Button>
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

  const data = await fetchProducts({ category });

  return {
    props: {
      data,
    },
  };
};

export default Products;
