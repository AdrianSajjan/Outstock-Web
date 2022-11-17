import { Box } from "@chakra-ui/react";
import { useLessThan576px } from "@shared/hooks";
import { NextPage } from "next";

const shadow = { boxShadow: "0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px 0 rgba(0, 0, 0, 0.06)" };

const BottomNavigation: NextPage = () => {
  const isLessThan576px = useLessThan576px();

  return <Box h="16" pos="fixed" display={isLessThan576px ? "flex" : "none"} bottom="0" w="full" bg="white" sx={shadow} zIndex={10}></Box>;
};

export default BottomNavigation;
