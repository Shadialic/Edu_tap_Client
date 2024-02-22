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
  console.log(formData, "ppppppppp");
  const handleSubmit = async () => {
    const blogData = {
      ...formData,
      date: new Date(),
      image,
      author: userInfo.id,
    };
    console.log(blogData, "blogData");

    const response = await createBlog(blogData);
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-hidden">
      <Header />
      <div className="w-full h-full flex justify-center ">
        <div className="w-[90%] h-[50%] bg-violet-500 mt-10 rounded-xl flex justify-center ">
          <div className="bg-white w-[18%] h-[auto] rounded-2xl mt-10 flex flex-col items-center">
            <div className="flex flex-row gap-2 pl-1 items-center">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
              />
              <h1 className="font-prompt text-lg">Helllp</h1>
            </div>
          </div>
          <div>
            <h1>dksssssssssssssdkf</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
{
  /*     
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Author"
      />
      <input
        type="text"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Description"
      />
     
      <input type="file" name='image' onChange={handleImage} />
      <button onClick={handleSubmit}>Submit</button> */
}
