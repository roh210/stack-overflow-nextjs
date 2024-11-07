"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching questions");
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();
    const { title, content, tags, author, path } = params;

    // Create the question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    // Update the question with the tags
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction record for the user's ask_question action

    // Increment the author's repuation by 5 points for creating a question

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();
    const { questionId } = params;
    // need to populate the tags and author since they are not immediately fetched
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: "Tag", select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log(error);
  }
}

// server action for upvoting and downvoting
// pseudo implementation:

// Function to handle upvoting a question
export async function upVoteQuestion(params: QuestionVoteParams) {
  try {
    // Connect to MongoDB database
    connectToDatabase();

    // Destructure the parameters for easy access
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    // Initialize an empty update query
    let updateQuery = {};

    // Determine the appropriate update action based on the user's current vote status
    if (hasupVoted) {
      // If user has already upvoted, we remove their ID from the upvotes array
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      // If user has previously downvoted, we remove their ID from downvotes and add to upvotes
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      // If the user hasn’t voted, we add their ID to the upvotes array if it’s not already there
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    // Apply the update query to the question document
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true, // Returns the updated document after the update
    });

    // If no question is found, throw an error
    if (!question) {
      throw new Error("Question not found");
    }

    // Revalidate the page at the specified path to reflect the updated vote counts on the front end
    revalidatePath(path);
  } catch (error) {
    // Log any errors to the console for troubleshooting
    console.log(error);
  }
}

// Function to handle downvoting a question
export async function downVoteQuestion(params: QuestionVoteParams) {
  try {
    // Connect to MongoDB database
    connectToDatabase();

    // Destructure the parameters for easy access
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    // Initialize an empty update query
    let updateQuery = {};

    // Determine the appropriate update action based on the user's current vote status
    if (hasdownVoted) {
      // If user has already downvoted, we remove their ID from the downvotes array
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      // If user has previously upvoted, we remove their ID from upvotes and add to downvotes
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      // If the user hasn’t voted, we add their ID to the downvotes array if it’s not already there
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    // Apply the update query to the question document
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true, // Returns the updated document after the update
    });

    // If no question is found, throw an error
    if (!question) {
      throw new Error("Question not found");
    }

    // Revalidate the page at the specified path to reflect the updated vote counts on the front end
    revalidatePath(path);
  } catch (error) {
    // Log any errors to the console for troubleshooting
    console.log(error);
  }
}
