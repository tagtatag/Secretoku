import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import useSWR, { mutate } from "swr";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import dayjs from "dayjs";

const schema = object().shape({
  message: string()
    .required("Butuh pesenmu.")
    .min(5, "Pesene minimal 5 karakter.")
    .max(300, "Pesene maksimal 300 karakter."),
});

export default function MessageForm() {
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
            {
              ...values,
              uuid: v4(),
              comments: [],
              created_at: dayjs().toString(),
              relative_created_at: "just now",
            },
            ...data.data,
          ],
        },
        false
      );

      resetField("message");

      const res = await fetch("/api/messages", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      });

      const { message } = await res.json();

      toast(message, { position: "bottom-center" });

      mutate("/api/messages");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      mx="auto"
      mb="2"
      p="3"
      bgColor="white"
      maxW="3xl"
      rounded="lg"
    >
      <Heading
        my="1"
        size="md"
        letterSpacing="widest"
        textTransform="uppercase"
        textAlign="center"
      >
        Send Secret Message To
      </Heading>
      <Text my="1" fontSize="2xl" fontWeight="extrabold" textAlign="center">
        walid.
      </Text>
      <Text my="1">walid. will never know who sent this message</Text>
      <FormControl my="1" isRequired isInvalid={errors?.message}>
        <Textarea
          {...register("message")}
          autoComplete="off"
          placeholder="Write Secret Message"
          rounded="lg"
        />
        <FormErrorMessage>{errors?.message?.message}</FormErrorMessage>
      </FormControl>
      <Button
        rounded="lg"
        leftIcon={<FaPaperPlane />}
        type="submit"
        my="2"
        colorScheme="blue"
        // bgColor="telegram.800"
        bgColor="#12c2e9"
        background="linear-gradient(to right, #12c2e9, #c471ed, #f64f59)"
        transition="ease 2s"
        shadow="md"
        w="full"
        isLoading={isSubmitting}
      >
        Submit
      </Button>
    </Box>
  );
}
