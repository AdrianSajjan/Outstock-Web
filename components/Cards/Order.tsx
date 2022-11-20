import * as React from "react";
import { Button, Divider, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useLessThan768px } from "@shared/hooks";
import { parsePaymentType } from "@shared/utils";
import moment from "moment";
import { NextPage } from "next";
import { OrderProductCard } from "@components/Cards";
import { Order } from "@shared/interface";

interface OrderCardProps {
  order: Order;
  px?: Record<string, string> | string;
}

const OrderCard: NextPage<OrderCardProps> = ({ order, px = "0" }) => {
  const isLessThan768px = useLessThan768px();

  const direction = React.useMemo(() => (isLessThan768px ? "column" : "row"), [isLessThan768px]);

  const payment = React.useMemo(
    () =>
      order.transactions
        ?.filter((transaction) => transaction.paymentStatus === (order.status === "placed" ? "captured" : "failed"))
        .slice(-1)
        .pop(),
    [order]
  );

  return (
    <VStack w="full">
      <Stack px={px} direction={direction} spacing="0" gap="4" w="full" wrap="wrap" justify="space-between">
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
          <Text>{parsePaymentType(payment)}</Text>
        </Stack>
        <Stack>
          <Text color="gray.500">Address</Text>
          <Text>
            {order?.addressLineOne}, {order?.addressLineTwo}
          </Text>
        </Stack>
      </Stack>
      <Stack pt="3" px={px} direction={direction} spacing="0" gap="4" w="full" wrap="wrap" justify="space-between">
        <Stack>
          <Text color="gray.500">Order Status</Text>
          <Text textTransform="capitalize">{order.status}</Text>
        </Stack>
        <Stack>{/* <Button textTransform="capitalize">See Order Details</Button> */}</Stack>
      </Stack>
      {order.products.map((item, index) => (
        <OrderProductCard key={index} item={item} />
      ))}
      <HStack px={px} justify="space-between" w="full" py="2">
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
