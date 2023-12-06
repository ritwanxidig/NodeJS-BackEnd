import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8989, () => {
  console.log("Server started on  http://localhost:8989");
});

const DB_URL =
  "mongodb+srv://root:root@cluster0.lp6o6tt.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(DB_URL);
mongoose.connection.on("error", (error: Error) => console.log(error)); // eslint-disable-line": Error) => {

