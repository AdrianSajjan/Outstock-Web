import { Box, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";

const BlogCard: NextPage = () => {
  return (
    <Box boxSize="full">
      <Box w="full" h="80" bg="blue.200"></Box>
      <Box py="8" px="6" mt="-16" bg="white" w="80%" mx="auto">
        <Heading textTransform="uppercase" size="sm" letterSpacing={1}>
          The Easiest Way To Break
        </Heading>
        <Text mt="4" color="gray.600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni vel architecto voluptate vero.
        </Text>
      </Box>
    </Box>
  );
};

export default BlogCard;
