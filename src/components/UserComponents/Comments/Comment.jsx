import React, { useEffect, useState } from "react";
import { LoadComments, postCommnets } from "../../../api/UserApi";

function Comment({ chapterId, userInfo }) {
  const [comment, setComment] = useState("");
  const [showCommnet, setShowComment] = useState([]);
  console.log(userInfo, "kkkk");
  console.log(chapterId[0], "ll");
  const chapter = chapterId[0]._id;
  useEffect(()=>{
    const fetch=async()=>{
      const response= await LoadComments(chapter).then((res)=>{

          console.log(res,'responsdddddddddde');
          setShowComment(res.comments)
      })
    }
    fetch()
  },[comment])

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
    console.log(data, "eeeeeeeeeeeeeeeeeeee");
    const response = await postCommnets(data);
    const comments = response.data.saveComment;

    console.log(response, "Comment submitted:", comment);

  };
  console.log(showCommnet,'showCommnet');

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
          {/* <InputEmoji/> */}
          <div className="flex flex-row justify-end gap-4 mt-2">
            <div className="font-prompt w-auto rounded-full p-2 h-10 hover:bg-blue-gray-100">
              <button onClick={() => setComment("")}>Cancel</button>
            </div>
            <div className="font-prompt w-auto rounded-full p-2 h-10 hover:bg-blue-gray-100">
              <button onClick={handleSubmit}>Comment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
