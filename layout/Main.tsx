import * as React from "react";
import NextLink from "next/link";
import type { NextPage } from "next";
import { useAppContext } from "@shared/hooks";
import { CartSidebar, LoginSidebar, SearchSidebar } from "@components/Sidebar";
import { RiFacebookCircleFill, RiInstagramFill, RiTwitterFill } from "react-icons/ri";
import { Box, Button, Container, Heading, IconButton, Input, Link, Text } from "@chakra-ui/react";
import { HiClock, HiLocationMarker, HiMail, HiPhone, HiSearch, HiShoppingBag, HiUser } from "react-icons/hi";

const MainLayout: NextPage = ({ children }) => {
  const { isLoginSidebarOpen, isCartSidebarOpen, isSearchSidebarOpen, setLoginSidebarOpen, setCartSidebarOpen, setSearchSidebarOpen } =
    useAppContext();

  return (
    <>
      <Box as="header" shadow="base" position="fixed" top={0} zIndex={50} width="full">
        <Box bg="black">
          <Container maxW="container.2xl" display="flex" alignItems="center" justifyContent="space-between" h={30}>
            <Box display="flex" columnGap={10}>
              <Box display="flex" color="gray.300" alignItems="center" columnGap={1}>
                <HiPhone />
                <Text fontSize="sm">+91 9733203125</Text>
              </Box>
              <Box display="flex" color="gray.300" alignItems="center" columnGap={1}>
                <HiLocationMarker />
                <Text fontSize="sm">Kolkata, India</Text>
              </Box>
              <Box display="flex" color="gray.300" alignItems="center" columnGap={1}>
                <HiClock />
                <Text fontSize="sm">Open 24/7</Text>
              </Box>
            </Box>
            <Box display="flex" columnGap={6} color="gray.300">
              <Link href="https://www.facebook.com">
                <RiFacebookCircleFill size={20} />
              </Link>
              <Link href="https://www.twitter.com">
                <RiTwitterFill size={20} />
              </Link>
              <Link href="https://www.instagram.com">
                <RiInstagramFill size={20} />
              </Link>
            </Box>
          </Container>
        </Box>
        <Box as="nav" bg="white">
          <Container maxW="container.2xl" h={90} display="flex" alignItems="center" justifyContent="space-between">
            <NextLink href="/" passHref>
              <Heading size="lg" textTransform="uppercase" fontFamily="brand" fontWeight="bold" cursor="pointer">
                Outstock
              </Heading>
            </NextLink>
            <Box display="flex" alignItems="center" columnGap={10} fontWeight="medium">
              <NextLink href="/women" passHref>
                <Link fontWeight="medium">Women</Link>
              </NextLink>
              <NextLink href="/men" passHref>
                <Link>Men</Link>
              </NextLink>
              <NextLink href="/beauty" passHref>
                <Link>Beauty</Link>
              </NextLink>
              <NextLink href="/accessories" passHref>
                <Link>Accessories</Link>
              </NextLink>
              <NextLink href="/contact" passHref>
                <Link>Contact Us</Link>
              </NextLink>
              <NextLink href="/about" passHref>
                <Link>About Us</Link>
              </NextLink>
            </Box>
            <Box display="flex" columnGap={4}>
              <IconButton aria-label="user" onClick={() => setLoginSidebarOpen(true)} icon={<HiUser size={24} />} variant="ghost" />
              <IconButton aria-label="search" onClick={() => setSearchSidebarOpen(true)} icon={<HiSearch size={24} />} variant="ghost" />
              <IconButton aria-label="cart" onClick={() => setCartSidebarOpen(true)} icon={<HiShoppingBag size={24} />} variant="ghost" />
            </Box>
          </Container>
        </Box>
      </Box>
      <CartSidebar isOpen={isCartSidebarOpen} handleClose={() => setCartSidebarOpen(false)} />
      <LoginSidebar isOpen={isLoginSidebarOpen} handleClose={() => setLoginSidebarOpen(false)} />
      <SearchSidebar isOpen={isSearchSidebarOpen} handleClose={() => setSearchSidebarOpen(false)} />
      <Box as="main" marginTop={120} bg="white">
        {children}
      </Box>
      <Box as="footer">
        <Box bg="black" py="4" color="white">
          <Container maxW="container.2xl" display="flex" alignItems="center" justifyContent="space-between">
            <Text textTransform="uppercase">Be in touch with us : </Text>
            <Box display="flex" flex={1} alignItems="center" justifyContent="center" columnGap={4}>
              <Input placeholder="Enter your email" backgroundColor="gray.600" border={0} w="full" maxW="sm" />
              <Button
                px="6"
                variant="outline"
                borderColor="gray.400"
                color="gray.400"
                _hover={{ backgroundColor: "gray.400", color: "black" }}
              >
                Join Us
              </Button>
            </Box>
            <Box display="flex" columnGap={6} color="gray.300">
              <Link href="https://www.facebook.com">
                <RiFacebookCircleFill size={20} />
              </Link>
              <Link href="https://www.twitter.com">
                <RiTwitterFill size={20} />
              </Link>
              <Link href="https://www.instagram.com">
                <RiInstagramFill size={20} />
              </Link>
            </Box>
          </Container>
        </Box>
        <Box bg="white" py="12">
          <Container maxW="container.2xl">
            <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={16}>
              <Box display="flex" flexDir="column" gap={6}>
                <Heading size="sm" textTransform="uppercase" mb="2">
                  Categories
                </Heading>
                <NextLink href="/men" passHref>
                  <Link color="gray.600" fontWeight="medium">
                    Men
                  </Link>
                </NextLink>
                <NextLink href="/men" passHref>
                  <Link color="gray.600" fontWeight="medium">
                    Women
                  </Link>
                </NextLink>
                <NextLink href="/men" passHref>
                  <Link color="gray.600" fontWeight="medium">
                    Accessories
                  </Link>
                </NextLink>
                <NextLink href="/men" passHref>
                  <Link color="gray.600" fontWeight="medium">
                    Beauty
                  </Link>
                </NextLink>
              </Box>
              <Box display="flex" flexDir="column" gap={6}>
                <Heading size="sm" textTransform="uppercase" mb="2">
                  Information
                </Heading>
                <NextLink href="/men" passHref>
                  <Link color="gray.600" fontWeight="medium">
                    About Us
                  </Link>
                </NextLink>
                <NextLink href="/men" passHref>
                  <Link color="gray.600" fontWeight="medium">
                    Contact Us
                  </Link>
                </NextLink>
                <NextLink href="/men" passHref>
                  <Link color="gray.600" fontWeight="medium">
                    Blog
                  </Link>
                </NextLink>
                <NextLink href="/men" passHref>
                  <Link color="gray.600" fontWeight="medium">
                    FAQs
                  </Link>
                </NextLink>
              </Box>
              <Box display="flex" flexDir="column" gap={6}>
                <Heading size="sm" textTransform="uppercase" mb="2">
                  Useful Links
                </Heading>
                <NextLink href="/men" passHref>
                  <Link color="gray.600" fontWeight="medium">
                    Terms &amp; Conditions
                  </Link>
                </NextLink>
                <NextLink href="/men" passHref>
                  <Link color="gray.600" fontWeight="medium">
                    Returns &amp; Exchanges
                  </Link>
                </NextLink>
                <NextLink href="/men" passHref>
                  <Link color="gray.600" fontWeight="medium">
                    Shipping &amp; Delivery
                  </Link>
                </NextLink>
                <NextLink href="/men" passHref>
                  <Link color="gray.600" fontWeight="medium">
                    Privacy Policy
                  </Link>
                </NextLink>
              </Box>
              <Box display="flex" flexDir="column" gap={6}>
                <Heading size="sm" textTransform="uppercase" mb="2">
                  Contact Us
                </Heading>
                <Box display="flex" alignItems="center" gap={2} color="gray.600">
                  <HiLocationMarker size={20} />
                  <Text fontWeight="medium">Kolkata, India</Text>
                </Box>
                <Box display="flex" alignItems="center" gap={2} color="gray.600">
                  <HiPhone size={20} />
                  <Text fontWeight="medium">+91 9733203125</Text>
                </Box>
                <Box display="flex" alignItems="center" gap={2} color="gray.600">
                  <HiClock size={20} />
                  <Text fontWeight="medium">All Week 24/7</Text>
                </Box>
                <Box display="flex" alignItems="center" gap={2} color="gray.600">
                  <HiMail size={20} />
                  <Link href="mailto:adriansajjan2001@gmail.com" fontWeight="medium">
                    adriansajjan2001@gmail.com
                  </Link>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
        <Box bg="gray.100" py="4">
          <Container maxW="container.2xl">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold" color="gray.600">
                Copyright &copy; 2022 All Rights Reserved
              </Text>
              <Text fontSize="sm" fontWeight="semibold" color="gray.600">
                Designed and Developed by <span style={{ fontWeight: "bold", color: "black" }}>Adrian Sajjan</span>
              </Text>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
