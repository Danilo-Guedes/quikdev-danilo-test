const express = require("express");
const multer = require("multer");
const {handleGetPostList} = require("../controllers/post");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "fake_bucket/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop(); // Get the file extension
    const uniqueName =
      file.fieldname + "-" + uniqueSuffix + "." + fileExtension;
    console.log("uniqueName: ", uniqueName);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const { handleCreatePost } = require("../controllers/post");

router.post("/create", upload.single("image"), (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  // if (!title || !description || !file) {
  //   return res.status(400).json({ error: true, message: "Missing required fields" });
  // }

  console.log({
    title,
    description,
    file,
  });

  handleCreatePost(req, res);
});

router.get("/list", (req, res) => {
  
  handleGetPostList(req, res);
});

module.exports = router;
