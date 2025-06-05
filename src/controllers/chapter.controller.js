import fs from "fs";
import Chapter from "../models/Chapter.js";
import redis from "../config/redis.js";

export const uploadChapters = async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(req.file.path, "utf8"));

    const inserted = [];
    const failed = [];

    for (const item of data) {
      try {
        const chapter = new Chapter(item);
        await chapter.save();
        inserted.push(chapter.chapter);
      } catch (e) {
        failed.push({ chapter: item.chapter, error: e.message });
      }
    }

    await redis.del("chapters:*");
    res
      .status(201)
      .json({ success: true, insertedCount: inserted.length, failed });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

export const getAllChapters = async (req, res) => {
  const query = {};
  const {
    class: cls,
    unit,
    subject,
    status,
    weakChapters,
    page = 1,
    limit = 10,
  } = req.query;

  if (cls) query.class = cls;
  if (unit) query.unit = unit;
  if (subject) query.subject = subject;
  if (status) query.status = status;
  if (weakChapters) query.isWeakChapter = weakChapters === "true";

  const cacheKey = `chapters:${JSON.stringify(req.query)}`;
  const cached = await redis.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const skip = (page - 1) * limit;
  const total = await Chapter.countDocuments(query);
  const chapters = await Chapter.find(query).skip(skip).limit(Number(limit));

  const result = { total, page: Number(page), limit: Number(limit), chapters };
  await redis.setEx(cacheKey, 3600, JSON.stringify(result));

  res.json(result);
};

export const getOneChapter = async (req, res) => {
  const chapter = await Chapter.findById(req.params.id);
  if (!chapter) return res.status(404).json({ message: "Chapter not found" });
  res.json(chapter);
};
