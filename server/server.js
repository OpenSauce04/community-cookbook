import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pg from "pg";
import { createClerkClient } from '@clerk/backend'

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

const SUCCESS_MESSAGE = "Success"

async function fetchClerkUserData(userId) {
  const response = await clerkClient.users.getUser(userId);
  const username = response.username;

  await db.query(`INSERT INTO users(id, username) VALUES($1, $2) ON CONFLICT (id) DO UPDATE SET username = EXCLUDED.username`, [
    userId,
    username
  ]);
}

app.get("/test", express.json(), async function (request, response) {
  response.json(SUCCESS_MESSAGE);
});

app.post("/create", express.json(), async function (request, response) {
  const data = request.body;

  await fetchClerkUserData(data.userid);

  await db.query(`INSERT INTO posts(userid, title, content, ingredients, isvegeta, isvegan, isglutenfree, islactosefree) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, [
    data.userid,
    data.title,
    data.content,
    data.ingredients,
    data.isvegeta,
    data.isvegan,
    data.isglutenfree,
    data.islactosefree
  ]);
  response.json(SUCCESS_MESSAGE);
});

app.get("/queryposts", express.json(), async function (request, response) {
  const postData = await db.query("SELECT * FROM posts ORDER BY id DESC");
  response.json(postData.rows);
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000...");
});
