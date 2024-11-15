import QuestionCard from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Filter from "@/components/shared/search/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestion } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = auth();

  if (!userId) return null;

  const result = await getSavedQuestion({
    clerkId: userId,
  });
  // TODO: FIX ISSUE WITH RESPONSIVE
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          placeholder="Search for questions"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions.length > 0 ? (
          result?.questions.map((question: any) => (
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
            title="There&rsquo;s no saved question to show"
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
