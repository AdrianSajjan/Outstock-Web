import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import _ from "lodash";
import { NextPage } from "next";
import Image from "next/image";

const OrderProductCard: NextPage<any> = ({ item }) => {
  return (
    <Box w="full" px={{ base: "0", md: "16" }}>
      <Flex py="4" alignItems="center" w="full">
        <Box h="32" w="32" pos="relative">
          <Image layout="fill" objectFit="cover" src={item.product.images[0]} />
        </Box>
        <Flex ml={{ base: "4", md: "8" }} w="full" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} gap="1">
          <Text mr="4">
            {item.product.name} - {_.upperFirst(item.product.category.name)}
          </Text>
          <Text ml={{ base: "0", md: "auto" }} mr={{ base: "4", md: "12" }}>
            Qty: {item.quantity}
          </Text>
          <Text>Rs. {item.product.price * item.quantity}</Text>
        </Flex>
      </Flex>
      <Divider />
    </Box>
  );
};

export default OrderProductCard;
