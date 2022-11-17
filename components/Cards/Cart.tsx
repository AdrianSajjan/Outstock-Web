import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { CartItem, Product } from "@shared/interface";
import { NextPage } from "next";
import _ from "lodash";
import Image from "next/image";
import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";

interface CartProductCardProps extends CartItem {
  handleRemove: (product: Product) => void;
  handleAdd: (product: Product) => void;
  handleEmpty: (id: string) => void;
}

const CartProductCard: NextPage<CartProductCardProps> = ({ product, quantity, _id, handleAdd, handleEmpty, handleRemove }) => {
  const handlePlus = () => handleAdd(product);
  const handleDelete = () => handleEmpty(_id);
  const handleMinus = () => handleRemove(product);

  return (
    <HStack alignItems="start" spacing={5} key={_id}>
      <Box h="32" w="28" pos="relative">
        <Image src={product.images[0]} layout="fill" objectFit="cover" />
      </Box>
      <VStack alignItems="start" justifyContent="space-between" h="32" flex={1}>
        <Box>
          <Text fontSize="lg" color="gray.600">
            {product.name} - {_.upperFirst(product.category.name)}
          </Text>
          <Text fontWeight="semibold" mt="4">
            {product.currency} {(product.price * quantity).toFixed(2)}
          </Text>
        </Box>
        <HStack justify="space-between" w="full">
          <HStack spacing={4}>
            <HStack spacing={0}>
              <IconButton onClick={handleMinus} aria-label="subtract" color="gray.500" size="sm" icon={<HiMinus size={16} />} />
              <Box h="8" minW="8" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
                <Text textTransform="capitalize" align="center">
                  {quantity}
                </Text>
              </Box>
              <IconButton onClick={handlePlus} aria-label="add" color="gray.500" size="sm" icon={<HiPlus size={16} />} />
            </HStack>
          </HStack>
          <IconButton onClick={handleDelete} aria-label="delete" colorScheme="red" variant="ghost" size="sm" icon={<HiOutlineTrash size={20} />} />
        </HStack>
      </VStack>
    </HStack>
  );
};

export default CartProductCard;
