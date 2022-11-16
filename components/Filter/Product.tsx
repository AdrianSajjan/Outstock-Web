import { NextPage } from "next";
import { HiChevronDown, HiOutlineFilter, HiOutlineViewGrid, HiOutlineViewList, HiOutlineX } from "react-icons/hi";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Collapse,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import { Colors, Prices, Subcategory } from "@shared/constants";
import { UseFilter } from "@shared/hooks";

interface ProductFilterAndSortProps extends Omit<UseFilter, "filter"> {}

const ProductFilterAndSort: NextPage<ProductFilterAndSortProps> = ({
  subcategory,
  setSubcategory,
  handleFilterToggle,
  handleGridView,
  handleListView,
  open,
  prices,
  setPrices,
  view,
}) => {
  const filterIcon = open ? <HiOutlineX size={20} /> : <HiOutlineFilter size={20} />;

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box w="48">
          <Button variant="ghost" leftIcon={filterIcon} color="gray.600" fontWeight="medium" onClick={handleFilterToggle}>
            Filter
          </Button>
        </Box>
        <ButtonGroup variant="ghost" spacing={2}>
          <IconButton aria-label="list" color={view === 0 ? "black" : "gray.400"} onClick={handleListView} icon={<HiOutlineViewList size={24} />} />
          <IconButton aria-label="grid" color={view === 1 ? "black" : "gray.400"} onClick={handleGridView} icon={<HiOutlineViewGrid size={24} />} />
        </ButtonGroup>
        <Box w="48" display="flex" justifyContent="flex-end">
          <Menu>
            <MenuButton as={Button} variant="ghost" color="gray.600" rightIcon={<HiChevronDown />}>
              {subcategory.label}
            </MenuButton>
            <MenuList>
              {Subcategory.map(({ label, value }) => {
                const handleSubcategoryToggle = () => {
                  if (subcategory.value !== value) setSubcategory({ label, value });
                };
                return (
                  <MenuItem textTransform="uppercase" fontWeight="medium" py="3" key={value} onClick={handleSubcategoryToggle}>
                    {label}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Collapse in={open} animateOpacity>
        <HStack spacing={8} flexWrap="wrap" bg="gray.50" px="12" py="8" mt="8" alignItems="flex-start">
          <Box flex={1}>
            <Heading size="sm" mb="6" textTransform="uppercase">
              Color
            </Heading>
            <CheckboxGroup>
              <VStack px="2" alignItems="flex-start" spacing={4} maxH="80" overflowY="auto">
                {Colors.map(({ code, label, value }) => {
                  const handleCheckbox = () => {};
                  return (
                    <HStack key={value}>
                      <Checkbox w="24" value={value} onChange={handleCheckbox}>
                        {label}
                      </Checkbox>
                      <Box h="4" w="4" borderRadius="full" bg={code} />
                    </HStack>
                  );
                })}
              </VStack>
            </CheckboxGroup>
          </Box>
          <Box flex={1}>
            <Heading size="sm" mb="6" textTransform="uppercase">
              Price
            </Heading>
            <CheckboxGroup>
              <VStack px="2" alignItems="flex-start" spacing={4} maxH="80" overflowY="auto">
                {Prices.map(({ id, label, value }) => {
                  const isChecked = prices.some((price) => price.id === id);
                  const handleCheckbox = () => {
                    setPrices((state) => (isChecked ? state.filter((price) => price.id !== id) : [...state, { id, value }]));
                  };
                  return (
                    <Checkbox isChecked={isChecked} key={id} value={id} onChange={handleCheckbox}>
                      {label}
                    </Checkbox>
                  );
                })}
              </VStack>
            </CheckboxGroup>
          </Box>
        </HStack>
      </Collapse>
    </>
  );
};

export default ProductFilterAndSort;
