import { Container, Flex, Heading } from "@chakra-ui/layout";
import Image from "next/image";

export default function Navbar() {
  return (
    <Flex
      zIndex="9999"
      top="0"
      right="0"
      w="full"
      p="3"
      bgColor="#12c2e9"
      background="linear-gradient(to right, #12c2e9, #c471ed, #f64f59)"
      color="white"
      shadow="lg"
      position="fixed"
    >
      <Container maxW="3xl" p="0">
        <Flex alignItems="center">
          <Image
            alt="Logo Sikreto"
            src="/948695.png"
            height="24"
            width="24"
            priority
          />
          <Heading ml="2.5" size="md" textTransform="uppercase">
            Karepmu
          </Heading>
        </Flex>
      </Container>
    </Flex>
  );
}
