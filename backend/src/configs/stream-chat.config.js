import { StreamChat } from "stream-chat";
import { env } from "./env.config.js";

const serverClient = StreamChat.getInstance(
  env.STREAM_API_KEY,
  env.STREAM_SECRET,
);

export default serverClient;
