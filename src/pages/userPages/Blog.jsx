import React, { useState } from "react";
import Header from "../../components/UserComponents/Layouts/Header";
import { createBlog } from "../../api/UserApi";
import { useSelector } from "react-redux";
import { Avatar } from "@material-tailwind/react";

function Blog() {
  const userInfo = useSelector((state) => state.user.userInfo);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    const blogData = {
      ...formData,
      date: new Date(),
      image,
      author: userInfo.id,
    };

    const response = await createBlog(blogData);
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-hidden">
      <Header />
      <div className="w-full h-full flex justify-center ">
        <div className="w-[90%] h-[50%] bg-violet-500 mt-10 rounded-xl flex justify-center ">
          <div className="bg-white w-[18%] rounded-2xl mt-10 flex flex-col items-center">
            <div className="flex flex-row gap-2 pl-1 items-center">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
              />
              <h1 className="font-prompt text-lg">Hello</h1>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-4 p-4">
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Title"
              />
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Description"
              />
              <input type="file" name="image" onChange={handleImage} />
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-16 p-9">
          <div
            className="relative flex mb-6 flex-col text-gray-700 bg-white shadow-md shadow-[#8a51abf1] rounded-xl w-64 max-h-80 justify-center items-center transition-property: box-shadow;
              transition-duration: 150ms duration-200 transform hover:scale-105 hover:shadow-md"
          >
            <div className=" overflow-hidden text-gray-700 bg-white shadow-lg  rounded-xl  w-[75%]">
              <img
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="profile-picture"
                className="w-full h-40 p-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
