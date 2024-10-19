"use server";
// Directive for Next.js indicating that this file contains server-side logic.

import Answer from "@/database/answer.model"; // Import the Answer model from the database models. This allows for interacting with the 'Answer' collection.
import { CreateAnswerParams } from "./shared.types"; // Import a type definition 'CreateAnswerParams', which defines the structure for the function parameters.
import { connectToDatabase } from "../mongoose"; // Import the function to connect to the MongoDB database using Mongoose.
import { revalidatePath } from "next/cache"; // Import the revalidatePath function from Next.js, used to trigger a revalidation of the cache for a particular path.
import Question from "@/database/question.model"; // Import the Question model from the database. This is used to interact with the 'Question' collection.

export async function createAnswer(params: CreateAnswerParams) {
  // Asynchronous function to create a new answer in the database, using the parameters passed into it.
  try {
    connectToDatabase(); // Establish a connection to the database.
    const { content, author, question, path } = params; // Destructure the 'params' object into individual variables: content, author, question, and path.
    const newAnswer = new Answer({
      content,
      author,
      question,
    }); // Create a new instance of the Answer model using the provided 'content', 'author', and 'question' data.

    // Add the answer to the question's answer array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });
    // Update the specific question by its 'question' ID, pushing the newly created answer's ID to the 'answers' array in the question document.

    // TODO : A interaction...
    // Placeholder for any additional logic related to interaction, potentially for notification or user feedback.
    revalidatePath(path); // Revalidate the cache for the provided path to reflect the newly created answer.
  } catch (error) {
    console.log(error);
  }
}
