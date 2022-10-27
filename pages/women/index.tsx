import Head from "next/head";
import * as React from "react";
import { NextPage } from "next";
import NextLink from "next/link";
import { HiChevronDown, HiChevronRight, HiOutlineFilter, HiOutlineViewGrid, HiOutlineViewList, HiOutlineX } from "react-icons/hi";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  Collapse,
} from "@chakra-ui/react";
import { StarRating } from "@components/Rating";
import { PageHeader } from "@components/Layout";

const CATEGORIES = [
  { value: "bestsellers", label: "Bestsellers" },
  { value: "newArrivals", label: "New Arrivals" },
  { value: "specials", label: "Specials" },
];

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Women", url: "/women", isCurrentPage: true },
];

const Women: NextPage = () => {
  const [view, setView] = React.useState(1);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [category, setCategory] = React.useState(CATEGORIES[0]);

  return (
    <>
      <Head>
        <title>Women&apos;s Shopping</title>
      </Head>
      <PageHeader title="Women" breadcrumbs={breadcrumbs} />
      <Box as="section" bg="white">
        <Container maxW="container.2xl" py="8">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box w="48">
              <Button
                variant="ghost"
                leftIcon={filterOpen ? <HiOutlineX size={20} /> : <HiOutlineFilter size={20} />}
                color="gray.600"
                fontWeight="medium"
                onClick={() => setFilterOpen((state) => !state)}
              >
                Filter
              </Button>
            </Box>
            <ButtonGroup variant="ghost" spacing={2}>
              <IconButton
                aria-label="list"
                color={view === 0 ? "black" : "gray.400"}
                onClick={() => setView(0)}
                icon={<HiOutlineViewList size={24} />}
              />
              <IconButton
                aria-label="grid"
                color={view === 1 ? "black" : "gray.400"}
                onClick={() => setView(1)}
                icon={<HiOutlineViewGrid size={24} />}
              />
            </ButtonGroup>
            <Box w="48" display="flex" justifyContent="flex-end">
              <Menu>
                <MenuButton as={Button} variant="ghost" color="gray.600" rightIcon={<HiChevronDown />}>
                  {category.label}
                </MenuButton>
                <MenuList>
                  {CATEGORIES.map(({ label, value }) => (
                    <MenuItem
                      textTransform="uppercase"
                      fontWeight="medium"
                      py="3"
                      key={value}
                      onClick={() => setCategory({ label, value })}
                    >
                      {label}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
          </Box>
          <Collapse in={filterOpen} animateOpacity>
            <HStack spacing={8} flexWrap="wrap" bg="gray.50" px="12" py="8" mt="8" alignItems="flex-start">
              <Box flex={1}>
                <Heading size="sm" mb="6" textTransform="uppercase">
                  Color
                </Heading>
                <CheckboxGroup>
                  <VStack px="2" alignItems="flex-start" spacing={4} maxH="80" overflowY="auto">
                    <HStack>
                      <Checkbox w="24" value="black">
                        Black
                      </Checkbox>
                      <Box h="4" w="4" borderRadius="full" bg="black" />
                    </HStack>
                    <HStack>
                      <Checkbox w="24" value="brown">
                        Brown
                      </Checkbox>
                      <Box h="4" w="4" borderRadius="full" bg="brown" />
                    </HStack>
                    <HStack>
                      <Checkbox w="24" value="beige">
                        Beige
                      </Checkbox>
                      <Box h="4" w="4" borderRadius="full" bg="beige" />
                    </HStack>
                    <HStack>
                      <Checkbox w="24" value="yellow">
                        Yellow
                      </Checkbox>
                      <Box h="4" w="4" borderRadius="full" bg="yellow" />
                    </HStack>
                    <HStack>
                      <Checkbox w="24" value="peach">
                        Peach
                      </Checkbox>
                      <Box h="4" w="4" borderRadius="full" bg="#ffe5b4" />
                    </HStack>
                    <HStack>
                      <Checkbox w="24" value="red">
                        Red
                      </Checkbox>
                      <Box h="4" w="4" borderRadius="full" bg="red" />
                    </HStack>
                    <HStack>
                      <Checkbox w="24" value="orange">
                        Orange
                      </Checkbox>
                      <Box h="4" w="4" borderRadius="full" bg="orange" />
                    </HStack>
                    <HStack>
                      <Checkbox w="24" value="pink">
                        Pink
                      </Checkbox>
                      <Box h="4" w="4" borderRadius="full" bg="pink" />
                    </HStack>
                    <HStack>
                      <Checkbox w="24" value="gray">
                        Gray
                      </Checkbox>
                      <Box h="4" w="4" borderRadius="full" bg="gray" />
                    </HStack>
                    <HStack>
                      <Checkbox w="24" value="green">
                        Green
                      </Checkbox>
                      <Box h="4" w="4" borderRadius="full" bg="green" />
                    </HStack>
                    <HStack>
                      <Checkbox w="24" value="white">
                        White
                      </Checkbox>
                      <Box h="4" w="4" borderRadius="full" bg="white" />
                    </HStack>
                  </VStack>
                </CheckboxGroup>
              </Box>
              <Box flex={1}>
                <Heading size="sm" mb="6" textTransform="uppercase">
                  Size
                </Heading>
                <CheckboxGroup>
                  <VStack px="2" alignItems="flex-start" spacing={4} maxH="80" overflowY="auto">
                    <Checkbox value="XL">XL</Checkbox>
                    <Checkbox value="L">L</Checkbox>
                    <Checkbox value="M">M</Checkbox>
                    <Checkbox value="S">S</Checkbox>
                    <Checkbox value="XS">XS</Checkbox>
                  </VStack>
                </CheckboxGroup>
              </Box>
              <Box flex={1}>
                <Heading size="sm" mb="6" textTransform="uppercase">
                  Brand
                </Heading>
                <CheckboxGroup>
                  <VStack px="2" alignItems="flex-start" spacing={4} maxH="80" overflowY="auto">
                    <Checkbox value="H&M">H&amp;M</Checkbox>
                    <Checkbox value="Nike">Nike</Checkbox>
                    <Checkbox value="Adidas">Adidas</Checkbox>
                    <Checkbox value="Levi's">Levi&apos;s</Checkbox>
                    <Checkbox value="Reebok">Reebok</Checkbox>
                    <Checkbox value="Bare">Bare</Checkbox>
                    <Checkbox value="Kalles">Kalles</Checkbox>
                  </VStack>
                </CheckboxGroup>
              </Box>
              <Box flex={1}>
                <Heading size="sm" mb="6" textTransform="uppercase">
                  Price
                </Heading>
                <CheckboxGroup>
                  <VStack px="2" alignItems="flex-start" spacing={4} maxH="80" overflowY="auto">
                    <Checkbox value="50000+">Rs. 50,000 + </Checkbox>
                    <Checkbox value="30000-50000">Rs. 30,000 - Rs. 50,000</Checkbox>
                    <Checkbox value="15000-30000">Rs. 15,000 - Rs. 30,000</Checkbox>
                    <Checkbox value="7500-15000">Rs. 7,500 - Rs. 15,000</Checkbox>
                    <Checkbox value="5000-7500">Rs. 5,000 - Rs. 7,500</Checkbox>
                    <Checkbox value="2500-5000">Rs. 2,500 - Rs. 5,000</Checkbox>
                    <Checkbox value="1000-2500">Rs. 1,000 - Rs. 2,500</Checkbox>
                    <Checkbox value="100-1000">Rs. 100 - Rs. 1000</Checkbox>
                  </VStack>
                </CheckboxGroup>
              </Box>
            </HStack>
          </Collapse>
          <Box pt="16">
            <Grid templateColumns="repeat(4, 1fr)" gridGap={10}>
              <GridItem>
                <Box w="full" h="sm" bg="green.200"></Box>
                <Text fontSize="lg" fontWeight="medium" color="gray.500" mt="4">
                  Mercury Tee
                </Text>
                <HStack alignItems="center" justifyContent="space-between" mt="1">
                  <Text fontWeight="bold" fontSize="lg">
                    ₹ 3,470
                  </Text>
                  <StarRating total={5} rating={4} size={16} />
                </HStack>
              </GridItem>
              <GridItem>
                <Box w="full" h="sm" bg="red.200"></Box>
                <Text fontSize="lg" fontWeight="medium" color="gray.500" mt="4">
                  Mercury Tee
                </Text>
                <HStack alignItems="center" justifyContent="space-between" mt="1">
                  <Text fontWeight="bold" fontSize="lg">
                    ₹ 3,470
                  </Text>
                  <StarRating total={5} rating={4} size={16} />
                </HStack>
              </GridItem>
              <GridItem>
                <Box w="full" h="sm" bg="yellow.200"></Box>
                <Text fontSize="lg" fontWeight="medium" color="gray.500" mt="4">
                  Mercury Tee
                </Text>
                <HStack alignItems="center" justifyContent="space-between" mt="1">
                  <Text fontWeight="bold" fontSize="lg">
                    ₹ 3,470
                  </Text>
                  <StarRating total={5} rating={4} size={16} />
                </HStack>
              </GridItem>
              <GridItem>
                <Box w="full" h="sm" bg="green.200"></Box>
                <Text fontSize="lg" fontWeight="medium" color="gray.500" mt="4">
                  Mercury Tee
                </Text>
                <HStack alignItems="center" justifyContent="space-between" mt="1">
                  <Text fontWeight="bold" fontSize="lg">
                    ₹ 3,470
                  </Text>
                  <StarRating total={5} rating={4} size={16} />
                </HStack>
              </GridItem>
              <GridItem>
                <Box w="full" h="sm" bg="blue.200"></Box>
                <Text fontSize="lg" fontWeight="medium" color="gray.500" mt="4">
                  Mercury Tee
                </Text>
                <HStack alignItems="center" justifyContent="space-between" mt="1">
                  <Text fontWeight="bold" fontSize="lg">
                    ₹ 3,470
                  </Text>
                  <StarRating total={5} rating={4} size={16} />
                </HStack>
              </GridItem>
              <GridItem>
                <Box w="full" h="sm" bg="pink.200"></Box>
                <Text fontSize="lg" fontWeight="medium" color="gray.500" mt="4">
                  Mercury Tee
                </Text>
                <HStack alignItems="center" justifyContent="space-between" mt="1">
                  <Text fontWeight="bold" fontSize="lg">
                    ₹ 3,470
                  </Text>
                  <StarRating total={5} rating={4} size={16} />
                </HStack>
              </GridItem>
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

export default Women;
