import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "../../../components/ui/avatar";

import { Card } from "../../../components/ui/card";
import { getAbbreabtionName, timeAgo } from "./socialUtil";

export default function CommentCards({
  comment,
  userName,
  createdAt,
  pic,
  userId,
  commentUserId,
}) {
  return (
    <Card
      className="mb-6"
      style={{
        backgroundColor: commentUserId === userId ? " #acacea" : "#F5F5F5",
      }}
    >
      <div className="flex gap-4 p-4">
        <Avatar className="w-12 h-12">
          <AvatarImage alt="User avatar" src={pic} />
          <AvatarFallback>{getAbbreabtionName(userName)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1.5">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{userName}</div>
            <div className="text-gray-500 text-xs">{timeAgo(createdAt)}</div>
          </div>
          <p>{comment}</p>
        </div>
      </div>
    </Card>
  );
}
