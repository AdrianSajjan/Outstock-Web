import { Box, Button, Container, Grid, Heading, Input, Link, Text } from "@chakra-ui/react";
import { containerPadding } from "@shared/constants";
import { use4ColumnResponseGrid, useLessThan576px, useLessThan768px, useLessThan976px } from "@shared/hooks";
import { NextPage } from "next";
import NextLink from "next/link";
import { HiClock, HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";
import { RiFacebookCircleFill, RiInstagramFill, RiTwitterFill } from "react-icons/ri";

const Footer: NextPage = () => {
  const columns = use4ColumnResponseGrid();
  const isLessThan576px = useLessThan576px();
  const isLessThan768px = useLessThan768px();
  const isLessThan976px = useLessThan976px();

  return (
    <>
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

export default Footer;
