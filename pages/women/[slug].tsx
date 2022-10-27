import Head from "next/head";
import { useMemo } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { PageHeader } from "@components/Layout";
import { StarRating } from "@components/Rating";
import { HiChevronDown, HiChevronUp, HiHeart, HiOutlineHeart } from "react-icons/hi";
import { Box, Button, ButtonGroup, chakra, Container, Divider, Flex, HStack, IconButton, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FaHeart, FaTape } from "react-icons/fa";

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
        <Container maxW="container.2xl" py="8">
          <SimpleGrid columns={2} spacing={10}>
            <HStack spacing={4}>
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
              <Box w="full" h="full" bg="green.100"></Box>
            </HStack>
            <Box>
              <Text textTransform="uppercase">
                Color:&nbsp;
                <Span textTransform="capitalize" fontWeight="bold">
                  Blue
                </Span>
              </Text>
              <VStack>
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
              </VStack>
              <Button variant="link" textTransform="capitalize" fontWeight="normal" leftIcon={<FaTape size={20} />} size="sm">
                Size Guide
              </Button>
              <Divider />
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
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default Details;
