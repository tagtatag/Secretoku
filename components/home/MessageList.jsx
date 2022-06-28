import { Box, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import dayjs from "dayjs";
import useSWR from "swr";
import SkeletonMessage from "../ui/SkeletonMessage";
import CommentForm from "./CommentForm";

export default function MessageList() {
  const { data, error } = useSWR("/api/messages", (url) =>
    fetch(url).then((res) => res.json())
  );

  if (error)
    return (
      <Box mx="auto" my="2" p="3" bgColor="white" maxW="3xl">
        An error has occurred.
      </Box>
    );

  if (!data)
    return (
      <>
        <SkeletonMessage />
        <SkeletonMessage />
        <SkeletonMessage />
      </>
    );

  if (data?.data?.length > 0)
    return data?.data.map((item) => {
      return (
        <Box
          key={item.uuid}
          mx="auto"
          my="2"
          p="3"
          bgColor="white"
          maxW="3xl"
          rounded="lg"
        >
          <Box
            p="2"
            my="2"
            // borderColor="blue.300"
            borderColor="#12c2e9"
            borderWidth="1px"
            rounded="lg"
          >
            <Text as="span">{item.message}</Text>
            <Text fontSize="xs" color="gray.600" mt="1.5">
              <Tooltip
                label={`📅 ${dayjs(item.created_at).format(
                  "ddd, DD MMM YYYY"
                )}  🕒 ${dayjs(item.created_at).format("HH.mm")}`}
              >
                {item.relative_created_at}
              </Tooltip>
            </Text>
          </Box>
          <CommentForm item={item} />
          {item.comments.map(({ uuid, comment, created_at }) => (
            <Tooltip
              key={uuid}
              label={`📅 ${dayjs(created_at).format(
                "ddd, DD MMM YYYY"
              )}  🕒 ${dayjs(created_at).format("HH.mm")}`}
            >
              <Box px="3" py="1" my="2" bgColor="gray.200" rounded="3xl">
                <Text color="gray.700" as="span">
                  {comment}
                </Text>
              </Box>
            </Tooltip>
          ))}
        </Box>
      );
    });

  return (
    <Box mx="auto" my="2" p="3" bgColor="white" maxW="3xl">
      No message found...
    </Box>
  );
}
