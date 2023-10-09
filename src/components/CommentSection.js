import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { CiFaceSmile } from "react-icons/ci";
import { commentsData } from "../util/helper";
const CommentSection = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState(commentsData);
  const submit = () => {
    console.log("hello");
    setCommentArray([...commentArray, { name: "sam", value: comment }]);
    setComment("");
  };
  return (
    <div className="mr-1 dark:text-white">
      <div className="mb-4 md:text-base text-xs flex justify-between">
        <p>{commentArray.length} Comments</p>
        <p className="cursor-pointer" onClick={() => setShowComments(!showComments)}>{showComments?"Hide":"Show"}</p>
      </div>
      {showComments && (
        <>
          <div className="mb-6">
            <div className="flex gap-4">
              <FaUserCircle className="md:w-8 md:h-8 w-3 h-3" />
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    comment && setBtnDisable(false);
                    comment === "" && setBtnDisable(true);
                  }}
                  className="border-b border-b-gray-300 dark:text-black dark:bg-transparent outline-none  hover:outline-none w-full mb-2"
                />
                <div className="flex justify-between">
                  <div className="relative">
                    <CiFaceSmile
                      onClick={() => setShowEmoji(!showEmoji)}
                      className="md:w-6 md:h-6 w-2 h-2 cursor-pointer bg-gray-200 dark:bg-transparent rounded-full"
                    />
                    {showEmoji && (
                      <div className="absolute hidden md:flex">
                        <EmojiPicker height={400} width={400} />
                      </div>
                    )}
                  </div>
                  <div className="gap-3 flex">
                    <button className="hover:bg-gray-300 rounded-2xl px-3 py-1 md:text-base text-xs">
                      Cancel
                    </button>
                    <button
                      disabled={btnDisable}
                      onClick={submit}
                      className={
                        btnDisable
                          ? "bg-gray-200 rounded-2xl px-3 py-1 text-gray-400 md:text-base text-xs"
                          : "bg-blue-600 rounded-2xl px-3 py-1 text-white md:text-base text-xs"
                      }
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-4">
              {commentArray.map((comment, i) => (
                <div key={i} className="flex gap-4 text-sm">
                  <FaUserCircle className="md:w-7 md:h-7 w-3 h-3" />
                  <div>
                    <div className="mb-2 md:text-base text-[12px]">
                      <p className="font-semibold">@{comment.name}</p>
                      <p>{comment.value}</p>
                    </div>
                    <p className="md:text-xs text-[10px] text-gray-800">
                      Reply
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentSection;
