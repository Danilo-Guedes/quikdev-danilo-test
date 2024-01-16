const express = require("express");
const multer = require("multer");
const {handleGetPostList, handleAddComment} = require("../controllers/post");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (_, _, cb) {
    cb(null, "fake_bucket/");
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop(); // Get the file extension
    const uniqueName =
      file.fieldname + "-" + uniqueSuffix + "." + fileExtension;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const { handleCreatePost } = require("../controllers/post");

router.post("/create", upload.single("image"), (req, res) => {
  handleCreatePost(req, res);
});

router.get("/list", (req, res) => {
  handleGetPostList(req, res);
});

router.post("/:postId/comment/create", authMiddleware, (req, res) => {
  handleAddComment(req, res);
})

module.exports = router;
