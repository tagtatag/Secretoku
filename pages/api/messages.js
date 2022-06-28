import dayjs from "dayjs";
import { v4 } from "uuid";
import { supabase } from "../../lib/init-supabase";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export async function getMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select(
      `uuid,
          message, 
          created_at,
          comments (
            uuid,
            comment,
            created_at
          )
          `
    )
    .eq("is_active", "true")
    .order("created_at", { ascending: false });

  const transform = data.map((item) => {
    return {
      ...item,
      relative_created_at: dayjs(item.created_at).fromNow(),
    };
  });

  return { data: transform, error };
}

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      const { message } = req.body;

      const { data, error } = await supabase.from("messages").insert([
        {
          uuid: v4(),
          message,
        },
      ]);

      if (error !== null)
        return res.status(422).json({ message: error.message });

      res.status(200).json({
        message: "👍 Message sent.",
        data: data[0],
      });

      break;
    }

    case "GET": {
      const { data, error } = await getMessages();

      if (error !== null)
        return res.status(422).json({ message: error.message });

      res.status(200).json({
        message: "Message found.",
        data,
      });

      break;
    }

    default: {
      res
        .status(400)
        .json({ status: false, message: "Method GET, POST expected." });
    }
  }
}
