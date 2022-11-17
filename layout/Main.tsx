import * as React from "react";
import NextLink from "next/link";
import type { NextPage } from "next";
import { useAppStore } from "@shared/store";
import { useSessionStore } from "@shared/store";
import { containerPadding } from "@shared/constants";
import { CartSidebar, ProfileSidebar, SearchSidebar } from "@components/Sidebar";
import { RiFacebookCircleFill, RiInstagramFill, RiTwitterFill } from "react-icons/ri";
import { Box, Button, Container, Grid, Heading, IconButton, Input, Link, Text, useToast } from "@chakra-ui/react";
import { HiClock, HiLocationMarker, HiMail, HiPhone, HiSearch, HiShoppingBag, HiUser } from "react-icons/hi";
import { useLessThan768px, useLessThan976px, useResponseGrid } from "@shared/hooks";

interface MainLayoutProps {
  isLoadingComplete: boolean;
}

const MainLayout: NextPage<MainLayoutProps> = ({ children, isLoadingComplete }) => {
  const { isProfileSidebarOpen, isCartSidebarOpen, isSearchSidebarOpen, setCartSidebarOpen, setProfileSidebarOpen, setSearchSidebarOpen } =
    useAppStore();

  const { isAuthenticated } = useSessionStore();

  const columns = useResponseGrid();
  const isLessThan768px = useLessThan768px();
  const isLessThan976px = useLessThan976px();

  const toast = useToast({ variant: "left-accent", position: "top", isClosable: true });

  const handleCartSidebarOpen = () => {
    if (isAuthenticated) return setCartSidebarOpen(true);
    toast({ title: "Login or Register", status: "info", description: "Please login or register to view your cart" });
    setProfileSidebarOpen(true);
  };

  React.useEffect(() => {
    if (isProfileSidebarOpen || isCartSidebarOpen || isSearchSidebarOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isProfileSidebarOpen, isCartSidebarOpen, isSearchSidebarOpen]);

  return (
    <>
      <Box as="header" shadow="base" position="fixed" top={0} zIndex={50} width="full">
        <Box bg="black" display={isLessThan768px ? "none" : "block"}>
          <Container px={{ base: "14", "2xl": "6" }} maxW="container.2xl" display="flex" alignItems="center" justifyContent="space-between" h={30}>
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
          <Container px={containerPadding} maxW="container.2xl" h={90} display="flex" alignItems="center" justifyContent="space-between">
            <NextLink href="/" passHref>
              <Heading size="lg" textTransform="uppercase" fontFamily="brand" fontWeight="bold" cursor="pointer">
                Outstock
              </Heading>
            </NextLink>
            <Box display={isLessThan768px ? "none" : "flex"} alignItems="center" columnGap={10} fontWeight="medium">
              <NextLink href="/women" passHref>
                <Link fontWeight="medium">Women</Link>
              </NextLink>
              <NextLink href="/men" passHref>
                <Link>Men</Link>
              </NextLink>
              <NextLink href="/contact" passHref>
                <Link>Contact</Link>
              </NextLink>
              <NextLink href="/about" passHref>
                <Link>About</Link>
              </NextLink>
            </Box>
            <Box display="flex" columnGap={4}>
              <IconButton aria-label="user" onClick={() => setProfileSidebarOpen(true)} icon={<HiUser size={24} />} variant="ghost" />
              <IconButton aria-label="search" onClick={() => setSearchSidebarOpen(true)} icon={<HiSearch size={24} />} variant="ghost" />
              <IconButton aria-label="cart" onClick={handleCartSidebarOpen} icon={<HiShoppingBag size={24} />} variant="ghost" />
            </Box>
          </Container>
        </Box>
      </Box>
      <CartSidebar isOpen={isCartSidebarOpen} handleClose={() => setCartSidebarOpen(false)} />
      <ProfileSidebar isOpen={isProfileSidebarOpen} isLoadingComplete={isLoadingComplete} handleClose={() => setProfileSidebarOpen(false)} />
      <SearchSidebar isOpen={isSearchSidebarOpen} handleClose={() => setSearchSidebarOpen(false)} />
      <Box as="main" marginTop={isLessThan768px ? 90 : 120} bg="white">
        {children}
      </Box>
      <Box as="footer">
        <Box bg="black" py="4" color="white">
          <Container px={containerPadding} maxW="container.2xl" display="flex" alignItems="center" justifyContent="space-between">
            {!isLessThan976px ? <Text textTransform="uppercase">Be in touch with us : </Text> : null}
            <Box display="flex" flex={1} alignItems="Star" justifyContent={isLessThan976px ? "flex-start" : "center"} columnGap={4}>
              <Input placeholder="Enter your email" backgroundColor="gray.600" border={0} w="full" maxW="sm" />
              <Button px="6" variant="outline" borderColor="gray.400" color="gray.400" _hover={{ backgroundColor: "gray.400", color: "black" }}>
                Join Us
              </Button>
            </Box>
            <Box columnGap={6} color="gray.300" display={isLessThan768px ? "none" : "flex"}>
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
          <Container px={containerPadding} maxW="container.2xl">
            <Grid templateColumns={columns} gap={16}>
              <Box display="flex" alignItems={isLessThan768px ? "center" : "flex-start"} flexDir="column" gap={6}>
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
              <Box display="flex" alignItems={isLessThan768px ? "center" : "flex-start"} flexDir="column" gap={6}>
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
              <Box display="flex" alignItems={isLessThan768px ? "center" : "flex-start"} flexDir="column" gap={6}>
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
              <Box display="flex" alignItems={isLessThan768px ? "center" : "flex-start"} flexDir="column" gap={6}>
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
            </Grid>
          </Container>
        </Box>
        <Box bg="gray.100" py="4">
          <Container px={containerPadding} maxW="container.2xl">
            <Box display="flex" alignItems="center" flexWrap="wrap" gap="2" justifyContent={isLessThan768px ? "center" : "space-between"}>
              <Text fontSize="sm" textAlign="center" fontWeight="semibold" color="gray.600">
                Copyright &copy; 2022 All Rights Reserved
              </Text>
              <Text fontSize="sm" textAlign="center" fontWeight="semibold" color="gray.600">
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
