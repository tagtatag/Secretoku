import { Button } from "@chakra-ui/button";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import useSWR, { mutate } from "swr";
import { Icon } from "@chakra-ui/icon";
import { FaUser } from "react-icons/fa";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import dayjs from "dayjs";

const schema = object().shape({
  comment: string()
    .required("Butuh komentarmu!")
    .min(5, "Komentarmu minimal 5 karakter.")
    .max(300, "Komentarmu maksimal 300 karakter."),
});

export default function CommentForm({ item }) {
  const { data } = useSWR("/api/messages", (url) =>
    fetch(url).then((res) => res.json())
  );

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  async function onSubmit(values) {
    try {
      mutate(
        "/api/messages",
        {
          ...data,
          data: [
            ...data.data.slice(
              0,
              data.data.findIndex(({ uuid }) => uuid === item.uuid)
            ),
            {
              ...data.data.find(({ uuid }) => uuid === item.uuid),
              comments: [
                ...data.data.find(({ uuid }) => uuid === item.uuid).comments,
                {
                  ...values,
                  uuid: v4(),
                  created_at: dayjs().toString(),
                },
              ],
            },
            ...data.data.slice(
              data.data.findIndex(({ uuid }) => uuid === item.uuid) + 1
            ),
          ],
        },
        false
      );

      resetField("comment");

      const res = await fetch("/api/comments", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ ...values, message_uuid: item.uuid }),
      });

      const { message } = await res.json();

      toast(message, { position: "bottom-center" });

      mutate("/api/messages");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl my="1" isRequired isInvalid={errors?.comment}>
        <InputGroup my="1">
          <InputLeftElement>
            <Flex
              justifyContent="center"
              alignItems="center"
              bgColor="gray.300"
              w="10"
              h="10"
              rounded="full"
            >
              <Icon color="white" as={FaUser} />
            </Flex>
          </InputLeftElement>
          <Input
            {...register("comment")}
            autoComplete="off"
            pl="12"
            pr="20"
            placeholder="Write a Comment"
            rounded="full"
          />
          <InputRightElement w="20">
            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
              color="blue.700"
              fontWeight="bold"
              h="1.75rem"
              variant="link"
            >
              Submit
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors?.comment?.message}</FormErrorMessage>
      </FormControl>
    </Box>
  );
}
