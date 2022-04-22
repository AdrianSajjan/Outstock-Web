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
  VStack,
} from "@chakra-ui/react";
import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const CartSidebar: React.FC<Props> = ({ handleClose, isOpen }) => {
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
            <HStack alignItems="start" spacing={5}>
              <Box bg="red.200" h="32" w="28"></Box>
              <VStack alignItems="start" justifyContent="space-between" h="32" flex={1}>
                <Box>
                  <Text fontSize="lg" color="gray.600">
                    Women&apos;s Tracksuit Q109
                  </Text>
                  <Text fontWeight="semibold">Blue, S</Text>
                </Box>
                <HStack justify="space-between" w="full">
                  <HStack spacing={4}>
                    <HStack spacing={0}>
                      <IconButton aria-label="subtract" color="gray.500" size="sm" icon={<HiMinus size={16} />} />
                      <Box h="8" minW="8" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
                        <Text align="center">1</Text>
                      </Box>
                      <IconButton aria-label="add" color="gray.500" size="sm" icon={<HiPlus size={16} />} />
                    </HStack>
                    <Text fontWeight="semibold">₹ 2,500</Text>
                  </HStack>
                  <IconButton aria-label="delete" colorScheme="red" variant="ghost" size="sm" icon={<HiOutlineTrash size={20} />} />
                </HStack>
              </VStack>
            </HStack>
            <Divider />
            <HStack alignItems="start" spacing={5}>
              <Box bg="red.200" h="32" w="28"></Box>
              <VStack alignItems="start" justifyContent="space-between" h="32" flex={1}>
                <Box>
                  <Text fontSize="lg" color="gray.600">
                    Women&apos;s Tracksuit Q109
                  </Text>
                  <Text fontWeight="semibold">Blue, S</Text>
                </Box>
                <HStack justify="space-between" w="full">
                  <HStack spacing={4}>
                    <HStack spacing={0}>
                      <IconButton aria-label="subtract" color="gray.500" size="sm" icon={<HiMinus size={16} />} />
                      <Box h="8" minW="8" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
                        <Text align="center">1</Text>
                      </Box>
                      <IconButton aria-label="add" color="gray.500" size="sm" icon={<HiPlus size={16} />} />
                    </HStack>
                    <Text fontWeight="semibold">₹ 2,500</Text>
                  </HStack>
                  <IconButton aria-label="delete" colorScheme="red" variant="ghost" size="sm" icon={<HiOutlineTrash size={20} />} />
                </HStack>
              </VStack>
            </HStack>
            <Divider />
          </VStack>
        </DrawerBody>
        <DrawerFooter flexDir="column">
          <HStack justifyContent="space-between" alignSelf="stretch">
            <Text fontSize="lg">Total</Text>
            <Text fontSize="lg" fontWeight="medium">
              ₹ 0
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
