import _ from "lodash";
import Image from "next/image";
import { NextPage } from "next";
import { CartItem } from "@shared/interface";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

const CheckoutProductCard: NextPage<CartItem> = ({ product, quantity, _id }) => {
  return (
    <HStack alignItems="start" spacing={5} key={_id}>
      <Box h="36" w="28" pos="relative">
        <Image src={product.images[0]} layout="fill" objectFit="cover" />
      </Box>
      <VStack alignItems="start" justifyContent="center" h="36" flex={1}>
        <Text fontSize="lg" color="gray.600">
          {product.name} - {_.upperFirst(product.category.name)}
        </Text>
        <Text color="gray.700" display="flex">
          <Text mr="1.5" color="black" fontWeight="medium">
            Qty:
          </Text>
          {quantity}
        </Text>
        <Text>
          Base Price: {product.currency} {product.price.toFixed(2)}
        </Text>
        <Text>
          Total Price: {product.currency} {(product.price * quantity).toFixed(2)}
        </Text>
      </VStack>
    </HStack>
  );
};

export default CheckoutProductCard;
