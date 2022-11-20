import * as React from "react";
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from "@chakra-ui/react";
import { HiOutlineSearch } from "react-icons/hi";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const SearchSidebar: React.FC<Props> = ({ handleClose, isOpen }) => {
  const router = useRouter();

  const [error, setError] = React.useState("");
  const [searchText, setSearchText] = React.useState("");

  const handleSearchTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setSearchText(e.target.value);

  const handleSearch = () => {
    if (searchText.length < 4) return setError("Please provide atleast 4 letters");
    setError("");
    router.push({ pathname: "/search", query: { key: searchText } });
  };

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
          <FormControl isInvalid={!!error}>
            <InputGroup mt="4">
              <Input onChange={handleSearchTextChange} value={searchText} variant="filled" placeholder="What are you looking for?" />
              <InputRightElement color="gray.500">
                <HiOutlineSearch />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <Button onClick={handleSearch} isFullWidth mt="6" colorScheme="blackAlpha" bg="black">
            Search
          </Button>
          <Divider mt="6" />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchSidebar;
