import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js"

const app = express();

app.use(express.json());
app.use(clerkMiddleware()); 

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
    res.send("Hello World! 123")
})

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("Server started on port:", ENV.PORT);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); 
  }
};

startServer();

export default app;