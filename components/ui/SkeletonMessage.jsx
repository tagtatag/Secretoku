import { Box, Flex } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton";

export default function SkeletonMessage() {
  return (
    <Box mx="auto" my="2" p="4" bgColor="white" maxW="3xl" rounded="lg">
      <SkeletonText w="full" noOfLines="3" spacing="2" />
      <Flex mt="2" alignItems="center">
        <SkeletonCircle size="10" minW="10" />
        <Skeleton ml="3" h="5" w="full" />
      </Flex>
    </Box>
  );
}
