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
import { Prices, Sort } from "@shared/constants";
import { UseFilter } from "@shared/hooks";
import { NextPage } from "next";
import { HiChevronDown, HiOutlineFilter, HiOutlineViewGrid, HiOutlineViewList, HiOutlineX } from "react-icons/hi";

interface ProductFilterAndSortProps extends Omit<UseFilter, "filter"> {}

const ProductFilterAndSort: NextPage<ProductFilterAndSortProps> = ({
  sort,
  setSort,
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
      <Box display="flex" alignItems="center" justifyContent="space-between" mx="-2.5">
        <Box w="48">
          <Button variant="ghost" leftIcon={filterIcon} color="gray.600" fontWeight="medium" onClick={handleFilterToggle}>
            Filter
          </Button>
        </Box>
        <Box display="none">
          <ButtonGroup variant="ghost" spacing={2}>
            <IconButton aria-label="list" color={view === 0 ? "black" : "gray.400"} onClick={handleListView} icon={<HiOutlineViewList size={24} />} />
            <IconButton aria-label="grid" color={view === 1 ? "black" : "gray.400"} onClick={handleGridView} icon={<HiOutlineViewGrid size={24} />} />
          </ButtonGroup>
        </Box>
        <Box w="48" display="flex" justifyContent="flex-end">
          <Menu>
            <MenuButton as={Button} variant="ghost" color="gray.600" rightIcon={<HiChevronDown />}>
              {sort.label}
            </MenuButton>
            <MenuList>
              {Sort.map(({ label, value }) => {
                const handleSortToggle = () => {
                  if (sort.value !== value) setSort({ label, value });
                };
                return (
                  <MenuItem textTransform="uppercase" fontWeight="medium" py="3" key={label} onClick={handleSortToggle}>
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

// <Box flex={1}>
//   <Heading size="sm" mb="6" textTransform="uppercase">
//     Color
//   </Heading>
//   <CheckboxGroup>
//     <VStack px="2" alignItems="flex-start" spacing={4} maxH="80" overflowY="auto">
//       {Colors.map(({ code, label, value }) => {
//         const handleCheckbox = () => {};
//         return (
//           <HStack key={value}>
//             <Checkbox w="24" value={value} onChange={handleCheckbox}>
//               {label}
//             </Checkbox>
//             <Box h="4" w="4" borderRadius="full" bg={code} />
//           </HStack>
//         );
//       })}
//     </VStack>
//   </CheckboxGroup>
// </Box>
