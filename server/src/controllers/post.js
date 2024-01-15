const db = require("../services/database/sqlite");
const { insertPostIntoDb, getPostRows } = require("../models/post");
const { decodeJWT } = require("../services/auth/jwt");

async function handleCreatePost(req, res) {

  const { title, description } = req.body;
  const {headers} = req;
  const token = req.headers.authorization.split(" ")[1]; // Get the Bearer token


console.log({
  body: req.body,
  file: req.file,
  files: req.files,
  token,headers
});

  // if (!title || !description) {
  //   res.status(400).json({ error: true, message: "Missing required fields" });
  // }


  // Authenticate the token
  const userData = await decodeJWT(token);

  console.log({userData});

  req.body.userId = userData.id;
  req.body.filePath = req.file.path;

  try {
    await insertPostIntoDb(db, req.body);
    res.send("Post created successfully");
  } catch (error) {
    console.error(error);
  }
}

async function handleGetPostList(req, res) {
  try {

    const PostList = await getPostRows(db);

    res.status(200).json(PostList);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { handleCreatePost, handleGetPostList };
