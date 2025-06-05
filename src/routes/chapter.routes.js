import express from "express";
import multer from "multer";
import {
  uploadChapters,
  getAllChapters,
  getOneChapter,
} from "../controllers/chapter.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), uploadChapters);
router.get("/", getAllChapters);
router.get("/:id", getOneChapter);

export default router;
