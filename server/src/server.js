import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import app from "./app.js";

async function start() {
  await connectDB(env.MONGODB_URI);
  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
