import * as React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const overlay = { visible: { opacity: 1, transition: { duration: 0.5 } }, hidden: { opacity: 0 } };

export const Overlay = motion(
  React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
    return <Box as="aside" inset="0" zIndex={100} position="fixed" bg="blackAlpha.600" ref={ref} {...props}></Box>;
  })
);
