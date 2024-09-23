import UserCard from "@/components/card/UserCard";
import Filter from "@/components/shared/search/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";

import React from "react";

const Page = () => {
  // Create a user card
  // from the user data get the => profile, username , email , popular question tag by them [by number of upvotes]
  // user card link to user profile /profile/:id
  // tags should be clickable and should redirect to tag/:id
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          placeholder="Search amazing minds here..."
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses=""
        />
      </div>
      <div className="mt-12 flex flex-wrap gap-4">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </>
  );
};

export default Page;
