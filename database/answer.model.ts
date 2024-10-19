import { Schema, models, model, Document } from "mongoose";

export interface IAnswer extends Document {
  // creating an interface representing a document in MongoDb
  content: string;
  question: Schema.Types.ObjectId;
  upvotes: Schema.Types.ObjectId[]; // a reference of ids of users that have updvoted
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId; // a reference to the author (think database relationships)
  createdAt: Date;
}

const AnswerSchema = new Schema({
  // creating a schema corresponding to the document interface
  content: { type: String, required: true },
  question: [{ type: Schema.Types.ObjectId, ref: "Question", required: true }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Answer = models.Answer || model("Answer", AnswerSchema); // creating a model

export default Answer;
