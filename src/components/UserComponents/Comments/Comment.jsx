import React, { useEffect, useState } from "react";
import { LoadComments, postCommnets } from "../../../api/UserApi";
import user from "../../../../public/images/user/user.png";
import { Avatar } from "@material-tailwind/react";
function Comment({ chapterId, userInfo }) {
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState([]);
  const chapter = chapterId[0]._id;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await LoadComments(chapter);
        setShowComment(response.comments);
      } catch (error) {
        console.error("Error loading comments:", error);
      }
    };

    fetchComments();
  }, [chapter, comment]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      comment: comment,
      auther: userInfo.userName,
      Date: new Date(),
      chapterId: chapter,
      Image: userInfo.image,
    };
    setComment("");

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
            value={comment}
            onChange={handleChange}
          />
          <div className="flex flex-row justify-end gap-4 mt-2">
            <div className="font-prompt w-auto rounded-full p-2 h-10 hover:bg-blue-gray-100">
              <button onClick={() => setComment("")}>Cancel</button>
            </div>
            {comment.length > 0 ? (
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
        {showComment.map((comment, index) => (
          <div key={index} className="mt-8">
            <div className="flex flex-row font-prompt">
              {comment.image && comment.image ? (
                <img src={comment.image} alt="" />
              ) : (
                <Avatar src={user} alt="avatar" size="md" />
              )}
              <p className="pl-2 font-prompt-semibold">{comment.auther}</p>
              <p className="pl-5">
                {" "}
                {new Date(comment.Date).toLocaleString()}
              </p>{" "}
            </div>
            <p className="pl-14 pb-4 font-prompt">{comment.comment}</p>{" "}
            {/* Render the comment text */}
            {/* Render the date */}
          </div>
        ))}
      </div>
    </>
  );
}

export default Comment;
