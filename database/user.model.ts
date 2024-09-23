import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  profilePic: string;
  location?: string;
  portfolioLink?: string;
  reputation?: number;
  postSaved: Schema.Types.ObjectId[];
  joinDate: Date;
}

const UserSchema = new Schema({
  // Define the schema here
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  profilePic: {
    type: String,
    required: true,
    default: "default-profile-pic-url",
  },
  location: { type: String },
  portfolioLink: { type: String },
  reputation: { type: Number, default: 0 },
  postSaved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinDate: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;
