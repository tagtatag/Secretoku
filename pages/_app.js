import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.min.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/800.css";
import "@fontsource/open-sans";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const theme = extendTheme({
  fonts: {
    body: "Nunito",
    heading: "Open Sans",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ToastContainer />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
