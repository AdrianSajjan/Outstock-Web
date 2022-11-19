import { Box, Container, Heading, IconButton, Link, Text, useToast } from "@chakra-ui/react";
import { containerPadding } from "@shared/constants";
import { useLessThan576px, useLessThan768px } from "@shared/hooks";
import { useAppStore, useSessionStore } from "@shared/store";
import { NextPage } from "next";
import NextLink from "next/link";
import * as React from "react";
import { HiClock, HiLocationMarker, HiMenuAlt3, HiPhone, HiSearch, HiShoppingBag, HiUser } from "react-icons/hi";
import { RiFacebookCircleFill, RiInstagramFill, RiTwitterFill } from "react-icons/ri";

const AppBar: NextPage = () => {
  const isLessThan576px = useLessThan576px();
  const isLessThan768px = useLessThan768px();

  const toast = useToast({ variant: "left-accent", position: "top", isClosable: true });

  const { isAuthenticated } = useSessionStore();

  const { setCartSidebarOpen, setMobileSidebarOpen, setProfileSidebarOpen, setSearchSidebarOpen } = useAppStore();

  const iconSize = React.useMemo(() => (isLessThan576px ? 20 : 24), [isLessThan576px]);

  const handleProfileSidebarOpen = () => setProfileSidebarOpen(true);

  const handleSearchSidebarOpen = () => setSearchSidebarOpen(true);

  const handleMobileSidebarOpen = () => setMobileSidebarOpen(true);

  const handleCartSidebarOpen = () => {
    if (isAuthenticated) return setCartSidebarOpen(true);
    toast({ title: "Login or Register", status: "info", description: "Please login or register to view your cart" });
    setProfileSidebarOpen(true);
  };

  const boxHeight = { base: "16", md: "24" };

  return (
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
          <Box h={boxHeight} display="flex" alignItems="center" justifyContent="space-between">
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
              <NextLink href="/men" passHref>
                <Link>Accessories</Link>
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
  );
};

export default AppBar;
