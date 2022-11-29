import { useMutation, useQuery } from "@tanstack/react-query";
import { FetchCartSuccess, GenericErrorResponse, Product, RemoveItemFromCartState, UpdateCartState } from "@shared/interface";
import { addToCart, client, fetchCart, removeItemFromCart, removeProductFromCart } from "@shared/api";
import { useToast } from "@chakra-ui/react";

export const useCart = (isAuthenticated: boolean) => {
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

  return { handleRemoveProduct, handleRemoveItem, cart, handleAdd };
};
