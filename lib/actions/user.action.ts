"use server";
import { FilterQuery } from "mongoose";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    console.log("new user" + newUser);
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database
    // and questions, answers, comments, etc. associated with the user

    // get user questions ids
    // const userQuestionIds = await Question.find({ author: user._id }).distinct("_id");

    // delete user questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();
    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const users = await User.find({}).sort({ createdAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Asynchronously toggles the saved state of a question for a user
export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    // Establish a connection to the database (e.g., MongoDB) to perform operations
    connectToDatabase();

    // Destructure userId, questionId, and path from the params object
    const { userId, questionId, path } = params;

    // Retrieve the user document by their userId
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found"); // Throw an error if user is not found in the database

    // Check if the question is already saved in the user's saved posts
    const isQuestionSaved = user.postSaved.includes(questionId);

    if (isQuestionSaved) {
      // If question is already saved, remove it from the user's saved posts
      await User.findByIdAndUpdate(
        userId, // Target the user by their userId
        { $pull: { postSaved: questionId } }, // Remove questionId from the postSaved array
        { new: true } // Return the updated document after modification
      );
    } else {
      // If question is not already saved, add it to the user's saved posts
      await User.findByIdAndUpdate(
        userId, // Target the user by their userId
        { $addToSet: { postSaved: questionId } }, // Add questionId to postSaved if it's not already in the array
        { new: true } // Return the updated document after modification
      );
    }

    // Revalidate the page (specified by path) to reflect the updated saved status
    revalidatePath(path);
  } catch (error) {
    // Log any errors encountered during the function execution
    console.log(error);
  }
}

// Asynchronously retrieves a paginated list of saved questions for a user
export async function getSavedQuestion(params: GetSavedQuestionsParams) {
  try {
    // Connect to the database before querying data
    connectToDatabase();

    // Destructure the parameters, providing default values for page and pageSize if not specified
    const { clerkId, searchQuery, page = 1, pageSize = 10, filter } = params;

    // Create a query to match questions based on the search query, if provided
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } } // Case-insensitive regex search on title
      : {}; // If no searchQuery, use an empty query (fetch all)

    // Find the user by their clerkId and populate their saved questions (postSaved)
    const user = await User.findOne({ clerkId }).populate({
      path: "postSaved", // Populate the postSaved field, which contains saved questions
      match: query, // Apply the search query to filter saved questions
      options: {
        sort: { createdAt: -1 }, // Sort results by creation date, newest first
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" }, // Populate tags for each question, selecting only _id and name
        { path: "author", model: User, select: "_id clerkId name picture" }, // Populate author details, selecting specific fields
      ],
    });

    if (!user) throw new Error("User Not Found"); // Throw an error if user is not found

    // Extract saved questions from the populated user document
    const savedQuestions = user.postSaved;

    // Return the list of saved questions
    return { questions: savedQuestions };
  } catch (error) {
    // Log any errors encountered during the function execution
    console.log(error);
  }
}

// toggleSavedQuestion - toggles a specific question's saved state for a user and revalidates the relevant page.
// getSavedQuestion: retrieves a paginated and filtered list of a user's saved questions based on a search query, also populating related fields for each saved questions.
