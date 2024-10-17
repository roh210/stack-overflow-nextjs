import React from "react";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface TagProps {
  tag: {
    _id: string;
    name: string;
    questions: string;
  };
}

// getting an hydration error -- ignore

const TagCard = ({ tag }: TagProps) => {
  return (
    <>
      <Link
        href={`/tags/${tag._id}`}
        className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
      >
        <article className="background-light900_dark200 light-border flex w-full flex-col items-start justify-center gap-3 rounded-2xl border p-8">
          <Badge className="paragraph-semibold rounded border bg-light-800 px-5 py-1.5 text-base dark:border-dark-300 dark:bg-dark-200">
            {tag.name}
          </Badge>
          <p className="small-regular text-dark500_light700">
            JavaScript, often abbreviated as JS, is a programming language that
            is one of the core technologies of the World Wide Web, alongside
            HTML and CSS.
          </p>
          <p className="small-medium text-dark400_light500">
            <span className="body-semibold primary-text-gradient mr-2">
              {tag.questions.length}+
            </span>{" "}
            Questions
          </p>
        </article>
      </Link>
    </>
  );
};

export default TagCard;
