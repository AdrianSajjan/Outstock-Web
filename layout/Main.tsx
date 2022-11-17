import * as React from "react";
import NextLink from "next/link";
import type { NextPage } from "next";
import { useAppStore } from "@shared/store";
import { useSessionStore } from "@shared/store";
import { containerPadding } from "@shared/constants";
import { CartSidebar, MobileSidebar, ProfileSidebar, SearchSidebar } from "@components/Sidebar";
import { RiFacebookCircleFill, RiInstagramFill, RiTwitterFill } from "react-icons/ri";
import { Box, Button, Container, Grid, Heading, IconButton, Input, Link, Text, useToast } from "@chakra-ui/react";
import { HiClock, HiLocationMarker, HiMail, HiMenuAlt3, HiPhone, HiSearch, HiShoppingBag, HiUser } from "react-icons/hi";
import { useLessThan768px, useLessThan976px, use4ColumnResponseGrid, useLessThan1366px, useLessThan576px } from "@shared/hooks";
import { BottomNavigation } from "@components/Layout";

interface MainLayoutProps {
  isLoadingComplete: boolean;
}

const MainLayout: NextPage<MainLayoutProps> = ({ children, isLoadingComplete }) => {
  const {
    isProfileSidebarOpen,
    isCartSidebarOpen,
    isMobileSidebarOpen,
    isSearchSidebarOpen,
    setCartSidebarOpen,
    setProfileSidebarOpen,
    setSearchSidebarOpen,
    setMobileSidebarOpen,
  } = useAppStore();

  const { isAuthenticated } = useSessionStore();

  const columns = use4ColumnResponseGrid();
  const isLessThan576px = useLessThan576px();
  const isLessThan768px = useLessThan768px();
  const isLessThan976px = useLessThan976px();
  const isLessThan1366px = useLessThan1366px();

  const iconSize = React.useMemo(() => (isLessThan576px ? 20 : 24), [isLessThan576px]);

  const toast = useToast({ variant: "left-accent", position: "top", isClosable: true });

  const handleProfileSidebarOpen = () => setProfileSidebarOpen(true);

  const handleSearchSidebarOpen = () => setSearchSidebarOpen(true);

  const handleMobileSidebarOpen = () => setMobileSidebarOpen(true);

  const handleCartSidebarOpen = () => {
    if (isAuthenticated) return setCartSidebarOpen(true);
    toast({ title: "Login or Register", status: "info", description: "Please login or register to view your cart" });
    setProfileSidebarOpen(true);
  };

  React.useEffect(() => {
    if (isProfileSidebarOpen || isCartSidebarOpen || isSearchSidebarOpen || isMobileSidebarOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isProfileSidebarOpen, isCartSidebarOpen, isSearchSidebarOpen, isMobileSidebarOpen]);

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
          <Container px={containerPadding} maxW="container.2xl">
            <Box h={{ base: "16", md: "24" }} display="flex" alignItems="center" justifyContent="space-between">
              <NextLink href="/" passHref>
                <Heading size={isLessThan576px ? "md" : "lg"} textTransform="uppercase" fontFamily="brand" fontWeight="bold" cursor="pointer">
                  Outstock
                </Heading>
              </NextLink>
              <Box display={isLessThan768px ? "none" : "flex"} alignItems="center" columnGap={8} fontWeight="medium">
                <NextLink href="/women" passHref>
                  <Link fontWeight="medium">Women</Link>
                </NextLink>
                <NextLink href="/men" passHref>
                  <Link>Men</Link>
                </NextLink>
                <NextLink href="/contact" passHref>
                  <Link>Contact Us</Link>
                </NextLink>
                <NextLink href="/about" passHref>
                  <Link>About Us</Link>
                </NextLink>
              </Box>
              <Box display="flex" columnGap={isLessThan576px ? 2 : 4}>
                <IconButton aria-label="user" onClick={handleProfileSidebarOpen} icon={<HiUser size={iconSize} />} variant="ghost" />
                <IconButton aria-label="search" onClick={handleSearchSidebarOpen} icon={<HiSearch size={iconSize} />} variant="ghost" />
                <IconButton aria-label="cart" onClick={handleCartSidebarOpen} icon={<HiShoppingBag size={iconSize} />} variant="ghost" />
                {isLessThan768px ? (
                  <IconButton aria-label="menu" onClick={handleMobileSidebarOpen} icon={<HiMenuAlt3 size={iconSize} />} variant="ghost" />
                ) : null}
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
      <CartSidebar isOpen={isCartSidebarOpen} handleClose={() => setCartSidebarOpen(false)} />
      <ProfileSidebar isOpen={isProfileSidebarOpen} isLoadingComplete={isLoadingComplete} handleClose={() => setProfileSidebarOpen(false)} />
      <SearchSidebar isOpen={isSearchSidebarOpen} handleClose={() => setSearchSidebarOpen(false)} />
      <MobileSidebar isOpen={isMobileSidebarOpen} handleClose={() => setMobileSidebarOpen(false)} />
      <Box as="main" mt={{ base: "16", md: "32" }} bg="white">
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
        <Box bg="white" py="12" display={isLessThan576px ? "none" : "block"}>
          <Container px={containerPadding} maxW="container.2xl">
            <Grid templateColumns={columns} gap={16}>
              <Box display="flex" alignItems={isLessThan1366px ? "center" : "flex-start"} flexDir="column" gap={6}>
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
              <Box display="flex" alignItems={isLessThan1366px ? "center" : "flex-start"} flexDir="column" gap={6}>
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
              <Box display="flex" alignItems={isLessThan1366px ? "center" : "flex-start"} flexDir="column" gap={6}>
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
              <Box display="flex" alignItems={isLessThan1366px ? "center" : "flex-start"} flexDir="column" gap={6}>
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
              <Text display={isLessThan576px ? "none" : "inline-block"} fontSize="sm" textAlign="center" fontWeight="semibold" color="gray.600">
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
