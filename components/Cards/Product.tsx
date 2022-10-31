import { NextPage } from "next";
import { StarRating } from "@components/Rating";
import { Box, HStack, Text } from "@chakra-ui/react";
import { ProductCardProps } from "@shared/interface";
import Image from "next/image";

const ProductCard: NextPage<ProductCardProps> = ({ image, name, price, rating }) => {
  return (
    <Box w="full" h="full">
      <Box w="full" h="sm" position="relative">
        <Image src={image} objectFit="cover" layout="fill" />
      </Box>
      <Text fontSize="lg" fontWeight="medium" color="gray.500" mt="4">
        {name}
      </Text>
      <HStack alignItems="center" justifyContent="space-between" mt="1">
        <Text fontWeight="bold" fontSize="lg">
          ₹ {price}
        </Text>
        <StarRating rating={rating} size={16} />
      </HStack>
    </Box>
  );
};

export default ProductCard;
