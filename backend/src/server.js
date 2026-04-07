import app from "./app.js";
import { env } from "./configs/env.config.js";
import initMongo from "./configs/mongodb.config.js";
import { verifyMail } from "./configs/mail.config.js";

const startServer = async () => {
  try {
    await initMongo();
    await verifyMail();

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
