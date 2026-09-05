import express from "express";
import cors from "cors";

import { clerkMiddleware } from "@clerk/express";


import communityRoute from "./routes/communityRoute.ts";
import userRoute from "./routes/userRoute.ts";
import memberRoute from "./routes/memberRoute.ts";
import communityNoticeRoute from "./routes/communityNoticeRoute.ts";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/communities", communityRoute);
app.use("/api/membership", memberRoute);
app.use("/api/users", userRoute);
app.use("/api/community-notices", communityNoticeRoute);


app.get("/", (_req, res) => {
  res.json(`Welcome to the Event & Community Management API
        Congrats hacker !!
        To catch the Project backend route 👏🏻👏🏻👏🏻👏🏻
      `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
