import { Box } from "@chakra-ui/react";
import { useSessionStore } from "@shared/store";
import { isBrowser } from "framer-motion";
import { useRouter } from "next/router";

const CartPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSessionStore();
  if (isLoading) return null;

  if (!isAuthenticated && isBrowser) {
    router.push("/");
  }

  return (
    <>
      <Box>Cart</Box>
    </>
  );
};

export default CartPage;
