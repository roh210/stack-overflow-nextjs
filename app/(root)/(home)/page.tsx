import QuestionCard from "@/components/card/QuestionCard";
import HomeFilters from "@/components/Home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import Filter from "@/components/shared/search/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: 1,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    tags: [{ _id: "1", name: "next.js" }],
    author: { _id: "1", name: "Sujata | JS Mastery", picture: "" }, // Assuming an empty picture field
    upvotes: 0,
    views: 0,
    answers: [], // No answers yet
    createdAt: new Date("2021-09-01T12:00:00.000Z"), // Adjust the date format as needed
  },
  {
    _id: 2,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    tags: [{ _id: "1", name: "next.js" }],
    author: { _id: "1", name: "Sujata | JS Mastery", picture: "" },
    upvotes: 100200020,
    views: 40300020,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
  {
    _id: 3,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    tags: [{ _id: "1", name: "next.js" }],
    author: { _id: "1", name: "Sujata | JS Mastery", picture: "" },
    upvotes: 11001,
    views: 3333,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
  {
    _id: 4,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    tags: [{ _id: "1", name: "next.js" }],
    author: { _id: "1", name: "Sujata | JS Mastery", picture: "" },
    upvotes: 3333,
    views: 333,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
];

export default function Page() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          {questions.length !== 0 && (
            <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
              Ask Question
            </Button>
          )}
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          placeholder="Search for questions"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              views={question.views}
              author={question.author}
              upvotes={question.upvotes}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There&rsquo;s no question to show"
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. Our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>
    </>
  );
}
