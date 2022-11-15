import _ from "lodash";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { PageHeader } from "@components/Layout";
import { StarRating } from "@components/Rating";
import { FaTape } from "react-icons/fa";
import { Box, Button, ButtonGroup, chakra, Container, Divider, Flex, HStack, IconButton, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { HiChevronDown, HiChevronUp, HiOutlineChatAlt, HiOutlineHeart, HiOutlineMail, HiOutlineRefresh, HiOutlineTruck } from "react-icons/hi";
import { acceptedCategoryRoutes } from "@shared/constants";
import { fetchProductBySlug } from "@shared/api";
import { DetailsPageProps, DetailsPageServerSideProps } from "@shared/interface";

const Span = chakra("span");

const Details: NextPage<DetailsPageProps> = ({ data }) => {
  const router = useRouter();

  const category = router.query.category as string;

  const [activeIndex, setActiveIndex] = useState(0);

  const handleIncreaseIndex = () => setActiveIndex((idx) => (idx === data.images.length - 1 ? 0 : idx + 1));
  const handleDecreaseIndex = () => setActiveIndex((idx) => (idx === 0 ? data.images.length - 1 : idx - 1));

  return (
    <>
      <Head>
        <title>{_.upperFirst(category)}&apos;s Shopping</title>
      </Head>
      <PageHeader pathname={router.pathname} query={router.query} title={data.name} />
      <Box as="section" bg="white">
        <Box as="div" bg="gray.100" py="2">
          <Container maxW="container.2xl">
            <HStack justifyContent="space-between">
              <HStack spacing="4">
                <StarRating total={5} rating={data.averageRating || 0} size={16} />
                <Text>2 Reviews</Text>
              </HStack>
              <HStack spacing="4">
                <Text>
                  Sold: <Span fontWeight="bold">777</Span>
                </Text>
                <Text>
                  Availability: <Span fontWeight="bold">In Stock</Span>
                </Text>
              </HStack>
            </HStack>
          </Container>
        </Box>
        <Container maxW="container.2xl" py="12">
          <SimpleGrid columns={2} spacing={12}>
            <HStack spacing={4} alignItems="start">
              <VStack spacing={4}>
                <HStack spacing={4}>
                  <IconButton aria-label="before" icon={<HiChevronUp />} onClick={handleDecreaseIndex} />
                  <IconButton aria-label="after" icon={<HiChevronDown />} onClick={handleIncreaseIndex} />
                </HStack>
                {data.images.map((image, index) => (
                  <Box
                    as="button"
                    onClick={() => setActiveIndex(index)}
                    key={image + index}
                    h="32"
                    w="24"
                    border={index === activeIndex ? "2px" : ""}
                    position="relative"
                  >
                    <Image layout="fill" objectFit="cover" src={data.images[index]} />
                  </Box>
                ))}
              </VStack>
              <Box w="full" h="full" maxH="2xl" position="relative">
                <Image layout="fill" objectFit="cover" src={data.images[activeIndex]} />
              </Box>
            </HStack>
            <Box>
              <Text textTransform="uppercase">
                Color:&nbsp;
                <Span textTransform="capitalize" fontWeight="bold">
                  Blue
                </Span>
              </Text>
              <VStack alignItems="flex-start" mt="4" spacing="4">
                <Text textTransform="uppercase">
                  Size:&nbsp;
                  <Span textTransform="capitalize" fontWeight="bold">
                    M
                  </Span>
                </Text>
                <ButtonGroup>
                  <Button>S</Button>
                  <Button border="2px">M</Button>
                  <Button>L</Button>
                  <Button>XL</Button>
                </ButtonGroup>
                <Button variant="link" textTransform="capitalize" fontWeight="normal" leftIcon={<FaTape size={20} />} size="sm">
                  Size Guide
                </Button>
              </VStack>
              <Divider mt="8" />
              <Flex alignItems="center" py="8">
                <Text fontWeight="bold" fontSize="2xl">
                  {data.currency}. {data.price}
                </Text>
                <Button ml="8" mr="4" bg="black" color="white" px="10" colorScheme="blackAlpha">
                  Add to cart
                </Button>
                <IconButton aria-label="Add To Wishlist" icon={<HiOutlineHeart size={20} />} />
              </Flex>
              <Divider />
              <Box>
                <HStack justifyContent="space-between" mt="8">
                  <HStack>
                    <HiOutlineTruck size={24} color="gray" />
                    <Text color="gray.500" fontWeight="medium">
                      Shipping &amp; Delivery
                    </Text>
                  </HStack>
                  <HStack>
                    <HiOutlineRefresh size={24} color="gray" />
                    <Text color="gray.500" fontWeight="medium">
                      Returns &amp; Exchanges
                    </Text>
                  </HStack>
                  <HStack>
                    <HiOutlineMail size={24} color="gray" />
                    <Text color="gray.500" fontWeight="medium">
                      Ask a question
                    </Text>
                  </HStack>
                </HStack>
                <HStack mt="6" spacing="4">
                  <Text fontWeight="bold" textTransform="uppercase" flexShrink={0}>
                    Guaranteed Safe Checkout
                  </Text>
                  <Divider />
                </HStack>
                <HStack gap="10" mt="4" mb="8">
                  <Image src="/badges/visa.webp" width={60} height={50} objectFit="contain" />
                  <Image src="/badges/master-card.png" width={60} height={50} objectFit="contain" />
                  <Image src="/badges/paypal.png" width={120} height={50} objectFit="contain" />
                  <Image src="/badges/american-express.png" width={100} height={50} objectFit="contain" />
                </HStack>
              </Box>
              <Divider />
              <Box py="8">
                <Text fontWeight="medium" textTransform="uppercase" color="gray.500">
                  Description
                </Text>
                <Text mt="2">{data.description}</Text>
              </Box>
              <Divider />
              <Box py="8">
                <Text textTransform="uppercase" fontWeight="bold">
                  Additional Information
                </Text>
                <HStack mt="4">
                  <Text fontWeight="medium">Category: </Text>
                  <Text textTransform="capitalize">{data.category.name}</Text>
                </HStack>
                <HStack mt="4">
                  <Text fontWeight="medium">Material: </Text>
                  <Text>100% Polyester</Text>
                </HStack>
              </Box>
              <Divider />
              <Box py="8">
                <Text textTransform="uppercase" fontWeight="bold">
                  Reviews
                </Text>
                <HStack mt="4" justifyContent="space-between">
                  <HStack spacing={6}>
                    <StarRating rating={4} total={5} size={16} />
                    <Text>2 Reviews</Text>
                  </HStack>
                  <Button
                    variant="ghost"
                    textColor="gray.500"
                    textTransform="none"
                    fontWeight="medium"
                    leftIcon={<HiOutlineChatAlt size={24} />}
                    iconSpacing={4}
                  >
                    Write a review
                  </Button>
                </HStack>
                <VStack mt="12" alignItems="stretch" spacing={12}>
                  <Box>
                    <HStack justifyContent="space-between">
                      <Text fontSize="lg" fontWeight="semibold">
                        John Doe
                      </Text>
                      <HStack spacing={6}>
                        <Text color="gray.500">3 months ago</Text>
                        <StarRating rating={5} total={5} size={12} />
                      </HStack>
                    </HStack>
                    <Text mt="4" color="gray.500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error molestias aliquid disticiom blanditiis suscipit unde, possimus
                      deleniti vero consequatur corporis a id laudantium ad quid consectetur? Fuga dolore architecto velit.
                    </Text>
                  </Box>
                  <Box>
                    <HStack justifyContent="space-between">
                      <Text fontSize="lg" fontWeight="semibold">
                        Jane Doe
                      </Text>
                      <HStack spacing={6}>
                        <Text color="gray.500">4 months ago</Text>
                        <StarRating rating={5} total={5} size={12} />
                      </HStack>
                    </HStack>
                    <Text mt="4" color="gray.500">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos dolorum maxime recusandae cupiditate iusto incidunt quaerat
                      corporis quo ducimus quis dolores adipisci nihil, ratione ullam, eum accusantium ex totam voluptatibus? Mollitia commodi
                      voluptate nesciunt vero.
                    </Text>
                  </Box>
                </VStack>
              </Box>
              <Divider />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<DetailsPageServerSideProps> = async ({ query }) => {
  const slug = query.slug as string;
  const category = query.category as string;

  if (!acceptedCategoryRoutes.includes(category))
    return {
      notFound: true,
    };

  const data = await fetchProductBySlug(slug);

  if (!data)
    return {
      notFound: true,
    };

  return {
    props: {
      data,
    },
  };
};

export default Details;
