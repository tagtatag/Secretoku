import Icon from "@chakra-ui/icon";
import { Box, Text } from "@chakra-ui/layout";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <Box
      mx="auto"
      mt="5"
      p="3"
      bgColor="#12c2e9"
      background="linear-gradient(to right, #12c2e9, #c471ed, #f64f59)"
      color="white"
      maxW="3xl"
      textAlign="center"
      roundedTop="lg"
    >
      Didamel nganggo <Icon color="red.500" as={FaHeart} /> Next.js, Chakra UI,
      lan Supabase.
      <Text fontSize="xs">
        {new Date().getFullYear() > 2021
          ? `2021 - ${new Date().getFullYear()}`
          : new Date().getFullYear()}
      </Text>
    </Box>
  );
}
