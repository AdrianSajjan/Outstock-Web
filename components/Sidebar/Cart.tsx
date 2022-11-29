import * as React from "react";
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useSessionStore } from "@shared/store";
import { CartProductCard } from "@components/Cards";
import { useCart } from "@shared/hooks";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const CartSidebar: React.FC<Props> = ({ handleClose, isOpen }) => {
  const { isAuthenticated } = useSessionStore();

  const { cart, handleAdd, handleRemoveItem, handleRemoveProduct } = useCart(isAuthenticated);

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <HStack bg="black" px="6" h="14" justifyContent="space-between" alignItems="center">
          <Text size="lg" fontWeight="medium" color="white" textTransform="uppercase">
            Shopping Cart
          </Text>
          <DrawerCloseButton color="white" position="initial" />
        </HStack>
        <DrawerBody pt="6">
          <VStack alignItems="stretch" spacing={4}>
            {cart.data?.items.map(({ _id, ...props }) => (
              <React.Fragment key={_id}>
                <CartProductCard {...{ _id, ...props, handleAdd, handleEmpty: handleRemoveItem, handleRemove: handleRemoveProduct }} />
                <Divider />
              </React.Fragment>
            ))}
          </VStack>
        </DrawerBody>
        <DrawerFooter flexDir="column">
          <HStack justifyContent="space-between" alignSelf="stretch">
            <Text fontSize="lg">Total</Text>
            <Text fontSize="lg" fontWeight="medium">
              ₹ {cart.data?.totalPrice.toLocaleString() || 0}
            </Text>
          </HStack>
          <NextLink href="/checkout" passHref>
            <Button as="a" isFullWidth mt="4" colorScheme="blackAlpha" bg="black">
              Check Out
            </Button>
          </NextLink>
          <NextLink href="/cart" passHref>
            <Button isFullWidth mt="2">
              View Cart
            </Button>
          </NextLink>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartSidebar;
