import cors from "cors";
import express, { Router } from "express";
import multer from "multer";

import mongoose from "mongoose";
import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validations.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

import { PostController, UserController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@cluster0.6gooxpw.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0",
  )
  // mongodb+srv://admin:wwwwww@cluster0.6gooxpw.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

const router = Router();

router.use("/uploads", express.static("uploads"));

router.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login,
);
router.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register,
);
router.get("/auth/me", checkAuth, UserController.getMe);

router.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

router.get("/tags", PostController.getLastTags);

router.get("/posts", PostController.getAll);
router.get("/posts/tags", PostController.getLastTags);
router.get("/posts/:id", PostController.getOne);
router.post("/posts", checkAuth, postCreateValidation, PostController.create);
router.delete("/posts/:id", checkAuth, PostController.remove);
router.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  PostController.update,
);

app.use("/mveu/temp/api", router);

app.listen(process.env.PORT || 9876, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
