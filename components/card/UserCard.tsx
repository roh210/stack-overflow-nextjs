import React from "react";

const UserCard = () => {
  return (
    <div className="card-wrapper flex w-[260px] shrink-0 flex-col items-center justify-center gap-5 p-[30px]">
      <div>user profile pic</div>
      <div>user name</div>
      <div>user email</div>
      <div>popular question tag</div>
    </div>
  );
};

export default UserCard;
