import { getQuestionById } from "@/lib/actions/question.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params }) => {
  const result = await getQuestionById({ questionId: params._id });
  console.log("question: " + result);
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div>
          <Link href={`/profile/${result.author.clerkId}`}>
            <Image
              src={result.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
