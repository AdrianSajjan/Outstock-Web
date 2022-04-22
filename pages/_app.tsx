import MainLayout from "@layout/Main";
import type { AppProps } from "next/app";
import { AppProvider } from "@shared/context";
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
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
