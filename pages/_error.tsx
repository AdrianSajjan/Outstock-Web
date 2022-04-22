import { Box, Text } from "@chakra-ui/react";
import { NextPage, NextPageContext } from "next";

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <Box h="calc(100vh - 560px)" display="flex" alignItems="center" justifyContent="center">
      <Text fontWeight="medium" fontSize="3xl">
        {statusCode}
      </Text>
    </Box>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
