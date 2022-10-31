import Head from "next/head";
import Image from "next/image";
import { useMemo } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { PageHeader } from "@components/Layout";
import { StarRating } from "@components/Rating";
import { FaTape } from "react-icons/fa";
import { Box, Button, ButtonGroup, chakra, Container, Divider, Flex, HStack, IconButton, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineChatAlt,
  HiOutlineHeart,
  HiOutlineMail,
  HiOutlineRefresh,
  HiOutlineTruck,
} from "react-icons/hi";

const Span = chakra("span");

const Details: NextPage = () => {
  const router = useRouter();
  const slug = (router.query.slug as string)?.replace(/-/g, " ");

  const breadcrumb = useMemo(() => {
    return [
      { name: "Home", url: "/" },
      { name: "Women", url: "/women" },
      { name: slug, url: `/women/${slug}`, isCurrentPage: true },
    ];
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Women&apos;s Shopping</title>
      </Head>
      <PageHeader title={slug} breadcrumbs={breadcrumb} />
      <Box as="section" bg="white">
        <Box as="div" bg="gray.100" py="2">
          <Container maxW="container.2xl">
            <HStack justifyContent="space-between">
              <HStack spacing="4">
                <StarRating total={5} rating={4} size={16} />
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
                  <IconButton aria-label="before" icon={<HiChevronUp />} />
                  <IconButton aria-label="after" icon={<HiChevronDown />} />
                </HStack>
                <Box h="32" w="24" bg="red.100"></Box>
                <Box h="32" w="24" bg="red.100"></Box>
                <Box h="32" w="24" bg="red.100"></Box>
                <Box h="32" w="24" bg="red.100"></Box>
              </VStack>
              <Box w="full" h="full" maxH="2xl" bg="green.100"></Box>
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
                  Rs. 1500
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
                <Text mt="2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque iure ab ipsam consectetur aliquid reiciendis, possimus
                  cupiditate, debitis accusantium quia unde cumque dolore fugit vitae quo illo asperiores dolorum quod impedit, omnis eum
                  nobis expedita assumenda perferendis. Consequuntur, quos maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Atque iure ab ipsam consectetur aliquid reiciendis, possimus cupiditate, debitis accusantium quia unde cumque dolore fugit
                  vitae quo illo asperiores dolorum quod impedit, omnis eum nobis expedita assumenda perferendis. Consequuntur, quos maxime.
                </Text>
              </Box>
              <Divider />
              <Box py="8">
                <Text textTransform="uppercase" fontWeight="bold">
                  Additional Information
                </Text>
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error molestias aliquid disticiom blanditiis suscipit unde,
                      possimus deleniti vero consequatur corporis a id laudantium ad quid consectetur? Fuga dolore architecto velit.
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos dolorum maxime recusandae cupiditate iusto incidunt
                      quaerat corporis quo ducimus quis dolores adipisci nihil, ratione ullam, eum accusantium ex totam voluptatibus?
                      Mollitia commodi voluptate nesciunt vero.
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

export default Details;
