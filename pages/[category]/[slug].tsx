import _ from "lodash";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { FaTape } from "react-icons/fa";
import { useAppStore, useSessionStore } from "@shared/store";
import { PageHeader } from "@components/Layout";
import { StarRating } from "@components/Rating";
import { useMutation } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import { client, fetchProductBySlug, addToCart, removeItemFromCart, removeProductFromCart } from "@shared/api";
import { acceptedCategoryRoutes, containerPadding } from "@shared/constants";
import { Cart, DetailsPageProps, DetailsPageServerSideProps, FetchCartSuccess, UpdateCartState } from "@shared/interface";
import {
  Box,
  Button,
  ButtonGroup,
  chakra,
  Container,
  Divider,
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { HiChevronDown, HiChevronUp, HiOutlineChatAlt, HiOutlineHeart, HiOutlineMail, HiOutlineRefresh, HiOutlineTruck } from "react-icons/hi";
import { useLessThan576px, useLessThan976px } from "@shared/hooks";

const Span = chakra("span");

const Thumbnail = chakra("button", {
  baseStyle: {
    w: ["20", "24"],
    h: ["20", "20", "32"],
    pos: "relative",
  },
});

const Details: NextPage<DetailsPageProps> = ({ data }) => {
  const router = useRouter();
  const toast = useToast({ variant: "left-accent", position: "top", isClosable: true });

  const isLessThan576px = useLessThan576px();
  const isLessThan976px = useLessThan976px();

  const { isAuthenticated } = useSessionStore();
  const { setProfileSidebarOpen } = useAppStore();

  const category = router.query.category as string;

  const [activeIndex, setActiveIndex] = useState(0);

  const handleIncreaseIndex = () => setActiveIndex((idx) => (idx === data.images.length - 1 ? 0 : idx + 1));
  const handleDecreaseIndex = () => setActiveIndex((idx) => (idx === 0 ? data.images.length - 1 : idx - 1));

  const cart = client.getQueryData<Cart>(["cart"]);

  const addToCartMutation = useMutation<FetchCartSuccess, string, UpdateCartState>({ mutationFn: addToCart });

  const handleAddToCart = () => {
    if (!cart) return toast({ title: "Coudn't fetch cart", description: "Please refresh the page and try again", status: "warning" });
    if (isAuthenticated)
      return addToCartMutation.mutate(
        { id: cart._id, product: data },
        {
          onSuccess: () => {
            toast({ title: "Success", description: "Product added to cart", status: "success" });
            client.invalidateQueries({ queryKey: ["cart"] });
          },
          onError: (error) => {
            toast({ title: "Unable to add to Cart", description: error, status: "error" });
          },
        }
      );
    setProfileSidebarOpen(true);
    toast({ title: "Login or Register", status: "info", description: "Please login or register to view your cart" });
  };

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
              <HStack spacing="4" display={isLessThan576px ? "none" : "flex"}>
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
        <Container maxW="container.2xl" padding={containerPadding} py="12">
          <SimpleGrid columns={isLessThan976px ? 1 : 2} spacing={12}>
            <Stack direction={isLessThan576px ? "column-reverse" : "row"} spacing={4} alignItems="start">
              <Flex direction={isLessThan576px ? "row" : "column"} w={isLessThan576px ? "full" : "unset"} gap={4}>
                {!isLessThan576px ? (
                  <HStack spacing={4}>
                    <IconButton aria-label="before" icon={<HiChevronUp />} onClick={handleDecreaseIndex} />
                    <IconButton aria-label="after" icon={<HiChevronDown />} onClick={handleIncreaseIndex} />
                  </HStack>
                ) : null}
                {data.images.map((image, index) => {
                  const handleClick = () => setActiveIndex(index);
                  const border = index === activeIndex ? "2px" : "";
                  return (
                    <Thumbnail onClick={handleClick} key={image + index} border={border}>
                      <Image layout="fill" objectFit="cover" src={data.images[index]} />
                    </Thumbnail>
                  );
                })}
              </Flex>
              <Box w="full" maxW="lg" h="full" minH="md" maxH="2xl" position="relative">
                <Image layout="fill" objectFit="cover" src={data.images[activeIndex]} quality={100} />
              </Box>
            </Stack>
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
              <Flex alignItems="center" flexWrap="wrap" py="8" gap={isLessThan576px ? 4 : 8}>
                <Text fontWeight="bold" fontSize="2xl">
                  {data.currency}. {data.price.toFixed(2)}
                </Text>
                <Flex gap={4}>
                  <Button bg="black" onClick={handleAddToCart} disabled={addToCartMutation.isLoading} color="white" px="10" colorScheme="blackAlpha">
                    Add to cart
                  </Button>
                  <IconButton aria-label="Add To Wishlist" icon={<HiOutlineHeart size={20} />} />
                </Flex>
              </Flex>
              <Divider />
              <Box>
                <Flex wrap="wrap" justifyContent="space-between" gap="4" mt="8">
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
                </Flex>
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
                <Flex wrap="wrap" gap="4" mt="4" justifyContent="space-between">
                  <HStack spacing={6}>
                    <StarRating rating={4} total={5} size={16} />
                    <Text>2 Reviews</Text>
                  </HStack>
                  <Button
                    p={0}
                    variant="ghost"
                    textColor="gray.500"
                    textTransform="none"
                    fontWeight="medium"
                    leftIcon={<HiOutlineChatAlt size={24} />}
                    iconSpacing={4}
                  >
                    Write a review
                  </Button>
                </Flex>
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
