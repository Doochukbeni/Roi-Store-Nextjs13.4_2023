import { User } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import Image from "next/image";
import { Icons } from "./Icon";
import { AvatarProps } from "@radix-ui/react-avatar";

interface userAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">;
}

const UserAvatar = ({ user, ...props }: userAvatarProps) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
            fill
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name} </span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
