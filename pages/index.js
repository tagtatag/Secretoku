import { Box, Divider, Heading } from "@chakra-ui/layout";
import Head from "next/head";
import Navbar from "../components/ui/Navbar";
import MessageList from "../components/home/MessageList";
import MessageForm from "../components/home/MessageForm";
import Footer from "../components/ui/Footer";
import { SWRConfig } from "swr";
import { getMessages } from "./api/messages";

export default function Home({ fallback }) {
  return (
    <Box minH="100vh" bgColor="gray.100" pt="16">
      <Head>
        <title>Kirim pesan rahasia untuk TTG.</title>
        <meta
          name="description"
          content="Kirimen pesen ngge TTG kanthi rahasia. TTG ora bakal weruh kok sopo sing ngirim."
        />
      </Head>
      <Navbar />
      <MessageForm />
      <Box mx="auto" my="3" p="3" bgColor="white" maxW="3xl" rounded="lg">
        <Heading my="1" size="md" textAlign="center">
          garis wektune TTG.
        </Heading>
      </Box>
      <SWRConfig value={{ fallback }}>
        <MessageList />
      </SWRConfig>
      <Divider mx="auto" mt="5" maxW="3xl" />
      <Footer />
    </Box>
  );
}

export async function getServerSideProps({ res }) {
  // SSR caching (https://github.com/vercel/next.js/blob/canary/examples/ssr-caching/pages/index.js)
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const { data } = await getMessages();

  return {
    props: {
      fallback: {
        "/api/messages": { data },
      },
    },
  };
}
