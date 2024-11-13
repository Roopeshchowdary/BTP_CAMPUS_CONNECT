import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { useState, lazy, Suspense, useEffect } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "../../../components/ui/sheet";
const CommentsSection = lazy(() => import("./CommentsSection"));
import { toast } from "react-toastify";
import { addLike, removeLike } from "./socialDB.js";
export default function SocialTab({ likes, comments, blogId, user, isliked }) {
  const [liked, setLiked] = useState(isliked);
  const [allLikes, setAllLikes] = useState(likes);
  const [commentsCount, setCommentsCount] = useState(comments.length);

  useEffect(() => {
    if (blogId) {
      setLiked(isliked);
      setAllLikes(likes);
      setCommentsCount(comments.length);
    }
  }, [blogId, isliked]);

  const likeOnClick = async () => {
    setLiked((prev) => !prev);
    if (liked) {
      setAllLikes((prev) => prev - 1);

      try {
        await removeLike(blogId, user.uid);
      } catch (error) {
        setLiked((prev) => !prev);
        setAllLikes((prev) => prev + 1);
        toast("Something went wrong");
      }
    } else {
      setAllLikes((prev) => prev + 1);

      try {
        await addLike(blogId, user.uid);
      } catch (error) {
        setLiked((prev) => !prev);
        setAllLikes((prev) => prev - 1);
        toast("Something went wrong");
      }
    }
  };

  const shareOnClick = async () => {
    try {
      const currentUrl = window.location.href;

      await navigator.clipboard.writeText(currentUrl);
      toast("Link copied to clipboard");
    } catch (error) {
      toast("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg hover:bg-gray-100 transition-all duration-500 ease-in-out w-full">
      <div className="flex items-center space-x-4">
        <div className="group relative">
          <Button
            className="text-gray-600 hover:text-red-500 transition-colors duration-300"
            size="icon"
            variant="ghost"
            style={{
              color: liked ? "red" : " ",
            }}
            onClick={() => likeOnClick()}
          >
            <HeartIcon className="w-5 h-5" fill={liked ? "red" : " none"} />
            <span className="sr-only">Like</span>
          </Button>
          <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-white rounded-lg shadow-lg z-10 transition-opacity duration-300">
            <p>Like</p>
          </div>
        </div>

        <Sheet>
          <div className="group relative">
            <SheetTrigger
              className="text-gray-600 hover:text-blue-500 transition-colors duration-300 flex items-center space-x-1"
              size="icon"
              variant="ghost"
            >
              {/* <img src={CommentIcon} className="w-5 h-5" /> */}
              <TextIcon className="w-5 h-5" />
              <span className="sr-only">Comment</span>
            </SheetTrigger>
            <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-white rounded-lg shadow-lg z-10 transition-opacity duration-300">
              <p>Comment</p>
            </div>
          </div>
          <SheetContent className="w-full md:w-3/4 lg:w-1/2 xl:w-[30%]">
            <Suspense fallback={<div>Loading...</div>}>
              <CommentsSection
                pic={user.photoURL}
                userName={user.displayName}
                userId={user.uid}
                setCommentsCount={setCommentsCount}
                blogId={blogId}
                comments={comments}
              />
            </Suspense>
          </SheetContent>
        </Sheet>

        <div className="group relative">
          <Button
            className="text-gray-600 hover:text-green-500 transition-colors duration-300"
            size="icon"
            variant="ghost"
            onClick={() => shareOnClick()}
          >
            <ShareIcon className="w-5 h-5" />
            <span className="sr-only">Share</span>
          </Button>
          <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-white rounded-lg shadow-lg z-10 transition-opacity duration-300">
            <p>Share</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Badge>{allLikes} Likes</Badge>
        <Badge>{commentsCount} Comments</Badge>
      </div>
    </div>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function TextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  );
}
