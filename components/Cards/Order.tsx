import { Divider, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useLessThan768px } from "@shared/hooks";
import { parsePaymentType } from "@shared/utils";
import moment from "moment";
import { NextPage } from "next";
import { OrderProductCard } from "@components/Cards";

const OrderCard: NextPage<any> = ({ order }) => {
  const isLessThan768px = useLessThan768px();

  const direction = isLessThan768px ? "column" : "row";

  return (
    <VStack w="full">
      <Stack px={{ base: "0", md: "16" }} direction={direction} spacing="0" gap="4" w="full" wrap="wrap" justify="space-between">
        <Stack>
          <Text color="gray.500">Order Date</Text>
          <Text>{moment(order?.createdAt).format("LLL")}</Text>
        </Stack>
        <Stack>
          <Text color="gray.500">Order ID</Text>
          <Text>{order?.oid}</Text>
        </Stack>
        <Stack>
          <Text color="gray.500">Payment</Text>
          <Text>{parsePaymentType()}</Text>
        </Stack>
        <Stack>
          <Text color="gray.500">Address</Text>
          <Text>
            {order?.addressLineOne}, {order?.addressLineTwo}
          </Text>
        </Stack>
      </Stack>
      {order.products.map((item: any) => (
        <OrderProductCard item={item} />
      ))}
      <HStack px={{ base: "0", md: "16" }} justify="space-between" w="full" py="2">
        <Text fontSize="lg" fontWeight="semibold">
          Total
        </Text>
        <Text>Rs. {order?.totalAmount}</Text>
      </HStack>
      <Divider />
    </VStack>
  );
};

export default OrderCard;
