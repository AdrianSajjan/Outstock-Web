import * as React from "react";
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from "@chakra-ui/react";
import { HiOutlineSearch } from "react-icons/hi";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const SearchSidebar: React.FC<Props> = ({ handleClose, isOpen }) => {
  return (
    <Drawer isOpen={isOpen} onClose={handleClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <HStack bg="black" px="6" h="14" justifyContent="space-between" alignItems="center">
          <Text size="lg" fontWeight="medium" color="white" textTransform="uppercase">
            Search
          </Text>
          <DrawerCloseButton color="white" position="initial" />
        </HStack>
        <DrawerBody pt="6">
          <Select variant="filled">
            <option value="all">All Categories</option>
          </Select>
          <InputGroup mt="4">
            <Input variant="filled" placeholder="What are you looking for?" />
            <InputRightElement color="gray.500">
              <HiOutlineSearch />
            </InputRightElement>
          </InputGroup>
          <Button isFullWidth mt="6" colorScheme="blackAlpha" bg="black">
            Search
          </Button>
          <Divider mt="6" />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchSidebar;
