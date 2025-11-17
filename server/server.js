import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pg from "pg";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

const SUCCESS_MESSAGE = "Success"

app.get("/test", express.json(), async function (request, response) {
  response.json(SUCCESS_MESSAGE);
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000...");
});
