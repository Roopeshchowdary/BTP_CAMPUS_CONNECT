import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "../../../components/ui/avatar";
import { Label } from "../../../components/ui/label";
// import { Textarea } from "../../ui/textarea";
import { Textarea } from "../../../components/ui/textarea.jsx";
import { Button } from "../../../components/ui/button";
import { addComment } from "./socialDB";
import CommentCards from "./CommentCards";
import { getAbbreabtionName } from "./socialUtil";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function CommentsSection({
  pic,
  userName,
  userId,
  comments,
  blogId,
  setCommentsCount,
}) {
  const [allComments, setAllComments] = useState(comments ?? []);
  const textRef = useRef(null);
  const name = getAbbreabtionName(userName);

  const postComment = async () => {
    const comment = textRef.current.value;
    textRef.current.value = "";
    const newComment = {
      comment,
      userName,
      userId,
      pic,
      createdAt: new Date().getTime(),
    };

    const newAllcomments = [newComment, ...allComments];

    setAllComments(newAllcomments);
    setCommentsCount((prev) => prev + 1);

    try {
      await addComment(blogId, newComment);
    } catch (error) {
      setAllComments((prev) => prev.slice(0, -1));
      setCommentsCount((prev) => prev - 1);
      toast("Something went wrong");
    }
  };

  return (
    <div className=" mx-auto">
      <h2 className="font-semibold text-2xl mb-6">Comments</h2>
      <div className="text-sm flex items-start gap-4 mb-6">
        <Avatar className="w-12 h-12">
          <AvatarImage alt="Your avatar" src={pic} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <Label htmlFor="new-comment">Add a comment</Label>
          <Textarea
            className="mb-2"
            id="new-comment"
            placeholder="Share your thoughts..."
            ref={textRef}
          />
          <Button onClick={() => postComment()}>Post Comment</Button>
        </div>
      </div>
      {allComments.length > 0 ? (
        allComments.map((comment, index) => {
          return (
            <CommentCards
              key={index}
              userName={comment.userName}
              pic={comment.pic}
              createdAt={comment.createdAt}
              comment={comment.comment}
              commentUserId={comment.userId}
              userId={userId}
            />
          );
        })
      ) : (
        <span>
          <h2>No comments yet</h2>
        </span>
      )}
    </div>
  );
}
