import MainLayout from "@layout/Main";
import { client } from "@shared/api";
import type { AppProps } from "next/app";
import { useAuthentication } from "@shared/hooks";
import { QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: `"IBM Plex Sans", sans-serif`,
    heading: `"IBM Plex Sans", sans-serif`,
    brand: `"Playfair Display", serif`,
  },
  components: {
    Button: {
      baseStyle: {
        lineHeight: 1,
        borderRadius: 0,
        textTransform: "uppercase",
      },
    },
  },
  styles: {
    global: {
      input: {
        borderRadius: `0px !important`,
      },
      select: {
        borderRadius: `0px !important`,
      },
      "::-webkit-scrollbar": {
        width: 3,
        background: "gray.100",
      },
      "::-webkit-scrollbar-thumb": {
        background: "gray.400",
      },
      "::-webkit-scrollbar-corner": {
        background: "gray.100",
      },
    },
  },
  sizes: {
    container: {
      "2xl": "1440px",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const isLoadingComplete = useAuthentication();

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={client}>
        <MainLayout isLoadingComplete={isLoadingComplete}>
          <Component {...pageProps} />
        </MainLayout>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
