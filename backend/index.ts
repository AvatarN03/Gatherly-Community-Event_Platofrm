import express from "express";
import cors from "cors";

import { clerkMiddleware } from "@clerk/express";


import communityRoute from "./routes/communityRoute.ts";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/communities", communityRoute);


app.get("/", (_req, res) => {
  res.json(`Welcome to the Event & Community Management API
        Congrats hacker !!
        To catch the Project backend route 👏🏻👏🏻👏🏻👏🏻
      `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
