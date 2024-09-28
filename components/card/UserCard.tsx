import Image from "next/image";
import Link from "next/link";
import React from "react";
// import RenderTag from "../shared/RenderTag";
// import RenderTag from "../shared/RenderTag";

// get user data from pages
interface UserCardProps {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <>
      <Link href={`/profile/:${user.clerkId}`}>
        <Image
          src={`/${user.picture}`}
          alt={"user-pic"}
          width={100}
          height={100}
          className="cursor-pointer rounded-full"
        />
        <h3 className="h3-bold text-dark200_light900 my-2.5">{user.name}</h3>
        <p className="body-regular text-dark500_light500">@{user.username}</p>
      </Link>
    </>
  );
};

export default UserCard;
