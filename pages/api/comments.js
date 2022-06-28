import { v4 } from "uuid";
import { supabase } from "../../lib/init-supabase";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      const { message_uuid, comment } = req.body;

      const { data, error } = await supabase.from("comments").insert([
        {
          uuid: v4(),
          message_uuid,
          comment,
        },
      ]);

      if (error !== null)
        return res.status(422).json({ message: error.message });

      res.status(200).json({
        message: "👍 Comment sent.",
        data: data[0],
      });

      break;
    }

    default: {
      res.status(400).json({ status: false, message: "Method POST expected." });
    }
  }
}
