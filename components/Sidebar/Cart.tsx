import * as React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  HStack,
  IconButton,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { addToCart, client, fetchCart, removeItemFromCart, removeProductFromCart } from "@shared/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSessionStore } from "@shared/store";
import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";
import Image from "next/image";
import { FetchCartSuccess, Product, RemoveItemFromCartState, UpdateCartState } from "@shared/interface";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const CartSidebar: React.FC<Props> = ({ handleClose, isOpen }) => {
  const { isAuthenticated } = useSessionStore();
  const toast = useToast({ variant: "left-accent", position: "top", isClosable: true });

  const cart = useQuery({ queryKey: ["cart"], queryFn: fetchCart, enabled: isAuthenticated });

  const addToCartMutation = useMutation<FetchCartSuccess, string, UpdateCartState>({ mutationFn: addToCart });
  const removeProductFromCartMutation = useMutation<FetchCartSuccess, string, UpdateCartState>({ mutationFn: removeProductFromCart });
  const removeItemFromCartMutation = useMutation<FetchCartSuccess, string, RemoveItemFromCartState>({ mutationFn: removeItemFromCart });

  const handleAddToCart = (product: Product) => {
    if (cart.data)
      return addToCartMutation.mutate(
        { id: cart.data._id, product },
        {
          onSuccess: () => {
            toast({ title: "Success", description: "Product added to cart", status: "success" });
            client.invalidateQueries({ queryKey: ["cart"] });
          },
          onError: (error) => {
            toast({ title: "Unable to add to Cart", description: error, status: "error" });
          },
        }
      );
  };

  const handleRemoveProductFromCart = (product: Product) => {
    if (cart.data)
      return removeProductFromCartMutation.mutate(
        { id: cart.data._id, product },
        {
          onSuccess: () => {
            toast({ title: "Success", description: "Product removed to cart", status: "success" });
            client.invalidateQueries({ queryKey: ["cart"] });
          },
          onError: (error) => {
            toast({ title: "Unable to remove from Cart", description: error, status: "error" });
          },
        }
      );
  };

  const handleRemoveItemFromCart = (item: string) => {
    if (cart.data)
      return removeItemFromCartMutation.mutate(
        { id: cart.data._id, item },
        {
          onSuccess: () => {
            toast({ title: "Success", description: "Product removed to cart", status: "success" });
            client.invalidateQueries({ queryKey: ["cart"] });
          },
          onError: (error) => {
            toast({ title: "Unable to remove from Cart", description: error, status: "error" });
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
            {cart.data?.items.map(({ product, quantity, _id }) => (
              <>
                <HStack alignItems="start" spacing={5} key={_id}>
                  <Box h="32" w="28" pos="relative">
                    <Image src={product.images[0]} layout="fill" objectFit="cover" />
                  </Box>
                  <VStack alignItems="start" justifyContent="space-between" h="32" flex={1}>
                    <Box>
                      <Text fontSize="lg" color="gray.600">
                        {product.name}
                      </Text>
                      <Text textTransform="capitalize" fontWeight="semibold">
                        {product.category.name}
                      </Text>
                    </Box>
                    <HStack justify="space-between" w="full">
                      <HStack spacing={4}>
                        <HStack spacing={0}>
                          <IconButton
                            onClick={() => handleRemoveProductFromCart(product)}
                            aria-label="subtract"
                            color="gray.500"
                            size="sm"
                            icon={<HiMinus size={16} />}
                          />
                          <Box h="8" minW="8" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
                            <Text textTransform="capitalize" align="center">
                              {quantity}
                            </Text>
                          </Box>
                          <IconButton
                            onClick={() => handleAddToCart(product)}
                            aria-label="add"
                            color="gray.500"
                            size="sm"
                            icon={<HiPlus size={16} />}
                          />
                        </HStack>
                        <Text fontWeight="semibold">
                          {product.currency} {product.price.toFixed(2)}
                        </Text>
                      </HStack>
                      <IconButton
                        onClick={() => handleRemoveItemFromCart(_id)}
                        aria-label="delete"
                        colorScheme="red"
                        variant="ghost"
                        size="sm"
                        icon={<HiOutlineTrash size={20} />}
                      />
                    </HStack>
                  </VStack>
                </HStack>
                <Divider />
              </>
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
          <Button isFullWidth mt="4" colorScheme="blackAlpha" bg="black">
            Check Out
          </Button>
          <Button isFullWidth mt="2">
            View Cart
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartSidebar;
