import { Box, Divider, Text } from "@chakra-ui/react";
import { NextPage } from "next";

const Error404: NextPage = () => {
  return (
    <Box minH="calc(100vh - 120px)" display="flex" alignItems="center" justifyContent="center">
      <Text fontWeight="bold" fontSize="3xl">
        404
      </Text>
      <Divider height="12" orientation="vertical" mx="4" />
      <Text fontWeight="medium" fontSize="xl">
        Page Not Found
      </Text>
    </Box>
  );
};

export default Error404;
