import _ from "lodash";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import { HeroSmallCard } from "@shared/pages";
import { ProductCard } from "@components/Cards";
import type { GetServerSideProps, NextPage } from "next";
import { fetchHomePageData, fetchProducts } from "@shared/api";
import { HiOutlineTruck, HiOutlineRefresh, HiOutlineSupport } from "react-icons/hi";
import { Box, Button, Container, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { AxiosErrorResponse, HomePageProps, HomePageServerSideProps } from "@shared/interface";
import { containerPadding } from "@shared/constants";

const Home: NextPage<HomePageProps> = ({ site: { banner, hero, blog }, men, women }) => {
  return (
    <>
      <Head>
        <title>Oustock Home</title>
      </Head>

      <Box as="section" borderBottomWidth={1} borderBottomColor="gray.200">
        <Container px={containerPadding} paddingTop="12" paddingBottom="12" maxW="container.2xl">
          <Grid h="2xl" gridGap={6} templateColumns="repeat(4, 1fr)" templateRows="repeat(2, 1fr)">
            <GridItem colSpan={2} rowSpan={2} position="relative">
              <Box boxSize="full" position="relative">
                <Image layout="fill" src={hero.main.image} priority objectFit="cover" />
              </Box>
              <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" bg="white" py="4" px="12" borderRadius="sm">
                <Text textTransform="uppercase" fontWeight="semibold" fontSize="md" align="center" color="gray.600">
                  {hero.main.caption}
                </Text>
                <Heading textTransform="uppercase" size="lg" textAlign="center" mt="2">
                  {hero.main.title}
                </Heading>
              </Box>
            </GridItem>
            <HeroSmallCard image={hero.left.image} colSpan={1} title={hero.left.title} url={hero.left.url!} />
            <HeroSmallCard image={hero.right.image} colSpan={1} title={hero.right.title} url={hero.right.url!} />
            <HeroSmallCard image={hero.bottom.image} colSpan={2} title={hero.bottom.title} url={hero.bottom.url!} />
          </Grid>

          <Box display="flex" marginTop={12} alignItems="center" justifyContent="space-between" gap={12}>
            <Box display="flex" alignItems="center" columnGap={4}>
              <HiOutlineTruck size={48} />
              <Box>
                <Heading textTransform="uppercase" size="sm">
                  Free Shipping
                </Heading>
                <Text marginTop={1}>On all orders in India of or above Rs. 800</Text>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" columnGap={4}>
              <HiOutlineRefresh size={48} />
              <Box>
                <Heading textTransform="uppercase" size="sm">
                  30 Days Return
                </Heading>
                <Text marginTop={1}>Apply for an exchange within 30 days</Text>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" columnGap={4}>
              <HiOutlineSupport size={48} />
              <Box>
                <Heading size="sm" textTransform="uppercase">
                  Support 24/7
                </Heading>
                <Text marginTop={1}>Contact us 24 hours a day, 7 days a week</Text>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box as="section">
        <Container px={containerPadding} maxW="container.2xl" paddingTop="28" paddingBottom="2">
          <Heading textTransform="uppercase" size="lg" mb="12">
            Women&apos;s
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gridGap={8}>
            {women.products.map((product) => (
              <GridItem key={product._id}>
                <ProductCard {...product} />
              </GridItem>
            ))}
          </Grid>
          <NextLink href="/women" passHref>
            <Button as="a" w="full" mt="12">
              See All
            </Button>
          </NextLink>
        </Container>
      </Box>

      <Box as="section">
        <Container px={containerPadding} maxW="container.2xl" paddingTop="28" paddingBottom="2">
          <Heading textTransform="uppercase" size="lg" mb="12">
            Men&apos;s
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gridGap={8}>
            {men.products.map((product) => (
              <GridItem key={product._id}>
                <ProductCard {...product} />
              </GridItem>
            ))}
          </Grid>
          <NextLink href="/men" passHref>
            <Button as="a" w="full" mt="12">
              See All
            </Button>
          </NextLink>
        </Container>
      </Box>

      <Box as="section">
        <Container px={containerPadding} maxW="container.2xl" paddingTop="28" paddingBottom="2">
          <Grid templateColumns="repeat(2, 1fr)" gap={16}>
            {banner.map(({ caption, image, title, _id }) => (
              <GridItem key={_id}>
                <Box h="80" display="flex" alignItems="center" justifyContent="center" position="relative">
                  <Image src={image} layout="fill" objectFit="cover" />
                  <Box bg="white" py="4" px="8" borderRadius="sm" position="relative" zIndex={10}>
                    <Text align="center" fontWeight="semibold" textTransform="uppercase" color="gray.600" fontSize="sm">
                      {caption}
                    </Text>
                    <Text fontWeight="bold" textTransform="uppercase" color="black" mt="1" letterSpacing={1}>
                      {title}
                    </Text>
                  </Box>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box as="section">
        <Container px={containerPadding} maxW="container.2xl" paddingTop="28" paddingBottom="24">
          <Box>
            <Heading textTransform="uppercase" size="lg">
              Latest From Blog
            </Heading>
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gridGap={16} mt="16">
            {blog.map(({ body, image, title, _id }) => (
              <GridItem key={_id}>
                <Box w="full" h="80" position="relative">
                  <Image src={image} layout="fill" objectFit="cover" />
                </Box>
                <Box py="8" px="6" mt="-16" bg="white" w="80%" mx="auto" position="relative" zIndex={10}>
                  <Heading textTransform="uppercase" size="sm" letterSpacing={1}>
                    {title}
                  </Heading>
                  <Text mt="4" color="gray.600">
                    {body}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageServerSideProps> = async () => {
  const promise = {
    site: fetchHomePageData(),
    men: fetchProducts({ category: "men", page: 1 }),
    women: fetchProducts({ category: "women", page: 1 }),
  };
  try {
    const data: any = _.zipObject(_.keys(promise), await Promise.all(_.values(promise)));
    return { props: data };
  } catch (e) {
    const error = e as AxiosErrorResponse;
    if (error.response)
      if (error.response.status === 404) return { notFound: true };
      else throw error.response.data.message;
    else throw error.message;
  }
};

export default Home;
