const db = require("../services/database/sqlite");
const { insertPostIntoDb, getPostRows } = require("../models/post");
const { decodeJWT } = require("../services/auth/jwt");
const { insertCommentIntoDb } = require("../models/comment");

async function handleCreatePost(req, res) {
  const token = req.headers.authorization.split(" ")[1]; // Get the Bearer token

  // Authenticate the token
  const userData = await decodeJWT(token); //change to authMiddleware

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

async function handleAddComment(req, res) {
  try {
    const { postId } = req.params;
    const { comment: description, user } = req.body;

    console.log({ postId, description, userId: user.id });

    const data = {
      postId,
      description,
      userId: user.id,
    };

    const resp = await insertCommentIntoDb(db, data);

    if (resp) {
      res
        .status(200)
        .json({ error: false, message: "Comment added successfully" });
    }

    res.send("Comment added successfully");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { handleCreatePost, handleGetPostList, handleAddComment };
