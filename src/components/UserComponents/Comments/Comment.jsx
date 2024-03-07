import React, { useEffect, useState } from "react";
import { LoadComments, postCommnets } from "../../../api/UserApi";
import user from "../../../../public/images/user/user.png";
import { Avatar } from "@material-tailwind/react";
import { TimeMange } from "../../../helpers/TimeMange";
import { io } from "socket.io-client";

function Comment({ chapterId, userInfo }) {
  console.log(chapterId,'chapterId');
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState([]);
  const [socket, setSocket] = useState(null);
  const chapter = chapterId.length > 0 ? chapterId[0]._id : null;


  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("new-comment", ({ comment }) => {
        setShowComments((prevComments) => [...prevComments, comment]);
      });
      return () => {
        socket.off("new-comment");
      };
    }
  }, [socket]);
  useEffect(() => {
    const fetch = async () => {
      const response = await LoadComments(chapter);
      setShowComments(response.comments);
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };
  const handleSubmit = async () => {
    const data = {
      comment: commentText,
      author: userInfo.userName,
      Date: new Date(),
      chapterId: chapter,
      Image: userInfo.image,
    };
    setCommentText("");
    try {
      const response = await postCommnets(data);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <>
      <div className="mt-6">
        <h1 className="text-xl font-prompt font-prompt-semibold">Comments</h1>
        <div className="w-full h-8 mt-2">
          <input
            type="text"
            className="w-full h-10 border-b outline-none font-prompt"
            placeholder="Add a Comment"
            value={commentText}
            onChange={handleChange}
          />
          <div className="flex flex-row justify-end gap-4 mt-2">
            <div className="font-prompt w-auto rounded-full p-2 h-10 hover:bg-blue-gray-100">
              <button onClick={() => setCommentText("")}>Cancel</button>
            </div>
            {commentText.length > 0 ? (
              <div className="font-prompt w-auto rounded-full p-2 h-10 bg-blue-700 text-white">
                <button onClick={handleSubmit}>Comment</button>
              </div>
            ) : (
              <div className="font-prompt w-auto rounded-full p-2 h-10 ">
                <button onClick={handleSubmit}>Comment</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {showComments.map((comment, index) => (
          <div key={index} className="mt-7">
            <div className="flex flex-row font-prompt">
              {comment.Image ? (
                <img src={comment.Image} alt="" />
              ) : (
                <Avatar src={user} alt="avatar" size="md" />
              )}
              <p className="pl-2 font-prompt-semibold">{comment.author}</p>
              <p className="pl-4 pt-1 text-[13px]">
                {TimeMange(comment.Date) === "NaN years ago"
                  ? "just now"
                  : TimeMange(comment.Date)}
              </p>
            </div>
            <p className="pl-14 pb-4 font-prompt">{comment.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Comment;
