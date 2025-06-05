import mongoose from "mongoose";

const yearSchema = new mongoose.Schema(
  {
    2019: Number,
    2020: Number,
    2021: Number,
    2022: Number,
    2023: Number,
    2024: Number,
    2025: Number,
  },
  { _id: false }
);

const chapterSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    chapter: { type: String, required: true },
    class: { type: String, required: true },
    unit: { type: String, required: true },
    yearWiseQuestionCount: yearSchema,
    questionSolved: Number,
    status: { type: String, enum: ["Not Started", "In Progress", "Completed"] },
    isWeakChapter: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Chapter", chapterSchema);
