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
  useToast,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useSessionStore } from "@shared/store";
import { CartProductCard } from "@components/Cards";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addToCart, client, fetchCart, removeItemFromCart, removeProductFromCart } from "@shared/api";
import { FetchCartSuccess, GenericErrorResponse, Product, RemoveItemFromCartState, UpdateCartState } from "@shared/interface";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const CartSidebar: React.FC<Props> = ({ handleClose, isOpen }) => {
  const { isAuthenticated } = useSessionStore();
  const toast = useToast({ variant: "left-accent", position: "top", isClosable: true });

  const cart = useQuery({ queryKey: ["cart"], queryFn: fetchCart, enabled: isAuthenticated });

  const addToCartMutation = useMutation<FetchCartSuccess, GenericErrorResponse, UpdateCartState>({ mutationFn: addToCart });
  const removeProductFromCartMutation = useMutation<FetchCartSuccess, GenericErrorResponse, UpdateCartState>({ mutationFn: removeProductFromCart });
  const removeItemFromCartMutation = useMutation<FetchCartSuccess, GenericErrorResponse, RemoveItemFromCartState>({ mutationFn: removeItemFromCart });

  const handleAdd = (product: Product) => {
    if (cart.data)
      return addToCartMutation.mutate(
        { id: cart.data._id, product },
        {
          onSuccess: () => {
            toast({ title: "Success", description: "Product added to cart", status: "success" });
            client.invalidateQueries({ queryKey: ["cart"] });
          },
          onError: (error) => {
            toast({ title: "Unable to add to Cart", description: error.message, status: "error" });
          },
        }
      );
  };

  const handleRemoveProduct = (product: Product) => {
    if (cart.data)
      return removeProductFromCartMutation.mutate(
        { id: cart.data._id, product },
        {
          onSuccess: () => {
            toast({ title: "Success", description: "Product removed from cart", status: "info" });
            client.invalidateQueries({ queryKey: ["cart"] });
          },
          onError: (error) => {
            toast({ title: "Unable to remove from Cart", description: error.message, status: "error" });
          },
        }
      );
  };

  const handleRemoveItem = (item: string) => {
    if (cart.data)
      return removeItemFromCartMutation.mutate(
        { id: cart.data._id, item },
        {
          onSuccess: () => {
            toast({ title: "Success", description: "Product removed from cart", status: "info" });
            client.invalidateQueries({ queryKey: ["cart"] });
          },
          onError: (error) => {
            toast({ title: "Unable to remove from Cart", description: error.message, status: "error" });
          },
        }
      );
  };

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
              ₹ {cart.data?.totalPrice || 0}
            </Text>
          </HStack>
          <NextLink href="/checkout" passHref>
            <Button as="a" isFullWidth mt="4" colorScheme="blackAlpha" bg="black">
              Check Out
            </Button>
          </NextLink>
          <Button isFullWidth mt="2">
            View Cart
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartSidebar;
