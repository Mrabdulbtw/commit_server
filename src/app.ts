import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { commitRouter } from "./routers/commit.rts";


const PORT = 5000;
const app = express();


// app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000","https://commit-client.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/v1/commit/", commitRouter);

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
