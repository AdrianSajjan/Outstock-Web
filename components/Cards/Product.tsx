import Image from "next/image";
import { NextPage } from "next";
import NextLink from "next/link";
import { useMemo } from "react";
import { StarRating } from "@components/Rating";
import { Box, HStack, Text } from "@chakra-ui/react";
import { Category, ProductCardProps } from "@shared/interface";

const ProductCard: NextPage<ProductCardProps> = ({ images, name, price, currency, slug, category, averageRating }) => {
  const href = useMemo(() => {
    return `/${category.name}/${slug}`;
  }, [slug, category]);

  return (
    <NextLink href={href} passHref>
      <Box w="full" h="full" as="a">
        <Box w="full" h="sm" position="relative">
          <Image src={images[0]} objectFit="cover" layout="fill" />
        </Box>
        <Text fontSize="lg" fontWeight="medium" color="gray.500" mt="4">
          {name}
        </Text>
        <HStack alignItems="center" justifyContent="space-between" mt="1">
          <Text fontWeight="bold" fontSize="lg">
            {currency} {price.toFixed(2)}
          </Text>
          <StarRating rating={averageRating} size={16} />
        </HStack>
      </Box>
    </NextLink>
  );
};

export default ProductCard;
