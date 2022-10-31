import Head from "next/head";
import Image from "next/image";
import { HeroSmallCard } from "@shared/pages";
import { CategoryTab } from "@components/Tabs";
import { ProductCard } from "@components/Cards";
import type { GetServerSideProps, NextPage } from "next";
import { HomePageProps, HomePageServerSideProps } from "@shared/interface";
import { HiOutlineTruck, HiOutlineRefresh, HiOutlineSupport } from "react-icons/hi";
import { Box, Button, Container, Grid, GridItem, Heading, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";

// Mock
import { banner, blog, hero, products } from "@shared/constants/home";
// End of Mock

const Home: NextPage<HomePageProps> = ({ banner, blog, hero }) => {
  return (
    <>
      <Head>
        <title>Oustock Home</title>
      </Head>

      <Box as="section" borderBottomWidth={1} borderBottomColor="gray.200">
        <Container paddingTop="12" paddingBottom="12" maxW="container.2xl">
          <Grid h="2xl" gridGap={6} templateColumns="repeat(4, 1fr)" templateRows="repeat(2, 1fr)">
            <GridItem colSpan={2} rowSpan={2} position="relative">
              <Box boxSize="full" position="relative">
                <Image layout="fill" src={hero.main.image} objectFit="cover" />
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
        <Container maxW="container.2xl" paddingTop="28" paddingBottom="2">
          <Heading textTransform="uppercase" size="lg">
            Women&apos;s
          </Heading>
          <Tabs variant="unstyled">
            <TabList justifyContent="flex-end" columnGap={8}>
              <CategoryTab>New Arrivals</CategoryTab>
              <CategoryTab>Bestseller</CategoryTab>
              <CategoryTab>Specials</CategoryTab>
            </TabList>
            <TabPanels mt="10">
              <TabPanel p="0">
                <Grid templateColumns="repeat(4, 1fr)" gridGap={8}>
                  {products.map(({ _id: id, ...rest }) => (
                    <GridItem key={id}>
                      <ProductCard {...{ ...rest, id }} />
                    </GridItem>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel></TabPanel>
              <TabPanel></TabPanel>
            </TabPanels>
          </Tabs>
          <Button w="full" mt="12">
            See All
          </Button>
        </Container>
      </Box>

      <Box as="section">
        <Container maxW="container.2xl" paddingTop="28" paddingBottom="2">
          <Heading textTransform="uppercase" size="lg">
            Men&apos;s
          </Heading>
          <Tabs variant="unstyled">
            <TabList justifyContent="flex-end" columnGap={8}>
              <CategoryTab>New Arrivals</CategoryTab>
              <CategoryTab>Bestseller</CategoryTab>
              <CategoryTab>Specials</CategoryTab>
            </TabList>
            <TabPanels mt="10">
              <TabPanel p="0">
                <Grid templateColumns="repeat(4, 1fr)" gridGap={8}>
                  {products.map(({ _id: id, ...rest }) => (
                    <GridItem key={id}>
                      <ProductCard {...{ ...rest, id }} />
                    </GridItem>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel></TabPanel>
              <TabPanel></TabPanel>
            </TabPanels>
          </Tabs>
          <Button w="full" mt="12">
            See All
          </Button>
        </Container>
      </Box>

      <Box as="section">
        <Container maxW="container.2xl" paddingTop="28" paddingBottom="2">
          <Grid templateColumns="repeat(2, 1fr)" gap={16}>
            <GridItem>
              <Box h="80" bg="green.200" display="flex" alignItems="center" justifyContent="center">
                <Box bg="white" py="4" px="8" borderRadius="sm">
                  <Text align="center" fontWeight="semibold" textTransform="uppercase" color="gray.600" fontSize="sm">
                    New Season
                  </Text>
                  <Text fontWeight="bold" textTransform="uppercase" color="black" mt="1" letterSpacing={1}>
                    Lookbook Collection
                  </Text>
                </Box>
              </Box>
            </GridItem>
            <GridItem>
              <Box h="80" bg="yellow.200" display="flex" alignItems="center" justifyContent="center">
                <Box bg="white" py="4" px="8" borderRadius="sm">
                  <Text align="center" fontWeight="semibold" textTransform="uppercase" color="gray.600" fontSize="sm">
                    Sale
                  </Text>
                  <Text fontWeight="bold" textTransform="uppercase" color="black" mt="1" letterSpacing={1}>
                    Get up to <span style={{ color: "red" }}>50% off</span>
                  </Text>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      <Box as="section">
        <Container maxW="container.2xl" paddingTop="28" paddingBottom="24">
          <Box>
            <Heading textTransform="uppercase" size="lg">
              Latest From Blog
            </Heading>
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gridGap={16} mt="16">
            <GridItem>
              <Box w="full" h="80" bg="blue.200"></Box>
              <Box py="8" px="6" mt="-16" bg="white" w="80%" mx="auto">
                <Heading textTransform="uppercase" size="sm" letterSpacing={1}>
                  The Easiest Way To Break
                </Heading>
                <Text mt="4" color="gray.600">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni vel architecto voluptate vero.
                </Text>
              </Box>
            </GridItem>
            <GridItem>
              <Box w="full" h="80" bg="blue.200"></Box>
              <Box py="8" px="6" mt="-16" bg="white" w="80%" mx="auto">
                <Heading textTransform="uppercase" size="sm" letterSpacing={1}>
                  Wedding Season
                </Heading>
                <Text mt="4" color="gray.600">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni vel architecto voluptate vero.
                </Text>
              </Box>
            </GridItem>
            <GridItem>
              <Box w="full" h="80" bg="blue.200"></Box>
              <Box py="8" px="6" mt="-16" bg="white" w="80%" mx="auto">
                <Heading textTransform="uppercase" size="sm" letterSpacing={1}>
                  Recent Favourites
                </Heading>
                <Text mt="4" color="gray.600">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni vel architecto voluptate vero.
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageServerSideProps> = async (context) => {
  // Perform api calls
  return { props: { blog, hero, banner } };
};

export default Home;
