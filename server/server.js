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

app.get("/post/:id", express.json(), async function (request, response) {
  const postData = await db.query(`SELECT * FROM posts WHERE id = $1`, [request.params.id]);
  response.json(postData.rows[0]);
});

async function queryPosts(query, response) {
  const postData = await db.query(`SELECT * FROM posts \
WHERE title ILIKE CONCAT(\'%\', $1::text, \'%\') \
OR ingredients ILIKE CONCAT(\'%\', $1::text, \'%\') \
OR content ILIKE CONCAT(\'%\', $1::text, \'%\') \
ORDER BY id DESC`, [query]);
  response.json(postData.rows);
}

app.get("/queryposts/", express.json(), async function (request, response) {
  queryPosts('', response);
});

app.get("/queryposts/:query", express.json(), async function (request, response) {
  queryPosts(request.params.query, response);
});

app.get("/usernamefromid/:id", async function (request, response) {
  const userData = await db.query(`SELECT username FROM users WHERE id=$1`, [request.params.id])
  response.json(userData.rows[0].username);
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000...");
});
