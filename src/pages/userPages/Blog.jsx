import React, { useEffect, useState } from "react";
import Header from "../../components/UserComponents/Layouts/Header";
import { createBlog, getBlog } from "../../api/UserApi";
import { useSelector } from "react-redux";
import { Typography, Input, Avatar } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import DetailBLog from "../../components/UserComponents/Blog/DetailBLog";
function Blog() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null); // Fix: Corrected typo in setCurrentBlog
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blogOPn, setBlogOpn] = useState(false);
  const [blogId, setBlogId] = useState(null);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = {
      title,
      description,
      date: new Date(),
      image,
      author: userInfo.id,
    };
    try {
      const response = await createBlog(blogData);
      setCurrentBlog(response.data.blog);
      setOpen(false);
      toast(response.data.alert);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };
  const detailBlog = (blogId) => {
    setBlogId(blogId);
    setBlogOpn(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlog();

        setBlogs(response.data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [currentBlog]);
  function truncateDescription(description) {
    const lines = description.split("\n");
    const truncatedDescription = lines.slice(0, 3).join("\n");
    if (lines.length > 2) {
      return truncatedDescription + "...";
    }
    return truncatedDescription;
  }

  return (
    <div>
      {blogOPn ? (
        <DetailBLog blog={blogs} blogId={blogId} />
      ) : (
        <>
          <div className="flex flex-col w-screen h-screen overflow-x-hidden overflow-y-hidden">
            <Header />
            <div className="w-full h-full flex flex-col">
              <h1 className="text-3xl font-prompt font-prompt-semibold p-6">
                Latest Updates
              </h1>
              {blogs.length > 0 && (
                <div className="flex flex-row gap-2 w-[90%] h-full pl-16">
                  <div className="w-[45%] h-[50%]  ">
                    <img
                      className="w-full h-full"
                      src={blogs[0].image}
                      alt=""
                    />
                  </div>
                  <div className="w-[60%] h-[50%]  ">
                    <h1 className="p-6 sm:text-4xl font-Kantumruy">
                      {blogs[0].title}
                    </h1>
                    <p className="p-6">
                      {truncateDescription(blogs[0].description)}
                    </p>
                    <div className="flex flex-row lg:p-6">
                      <Avatar
                        src={blogs[0].authorProfile}
                        alt="avatar"
                        size="md"
                      />
                      <h1 className="pt-3 pl-2">{blogs[0].authorName}</h1>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full pl-10 h-full">
            {blogs.length > 0 && (
              <div className="flex flex-wrap p-6 gap-6">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    onClick={() => detailBlog(blog._id)}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2 hover:scale-105 hover:shadow-md"
                    style={{ height: "400px" }}
                  >
                    <div className="h-full w-full rounded-lg shadow-xl shadow-gray-400  relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-14 bg-white rounded-3xl  flex justify-center items-center">
                        <div className="flex flex-row pr-10 ">
                          <Avatar
                            src={blogs[0].authorProfile}
                            alt="avatar"
                            size="md"
                            className=""
                          />
                          <h1 className="pt-3 text-lg pl-2">
                            {blogs[0].authorName}
                          </h1>
                        </div>
                      </div>

                      <img
                        className="w-full h-56 rounded-t-lg"
                        src={blog.image}
                        alt={blog.title}
                      />
                      <div className="p-4 ">
                        <h3 className="text-xl font-prompt font-prompt-semibold mb-2 text-center">
                          {blog.title}
                        </h3>
                        <div className="font-prompt border-t-2 pt-2">
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            style={{
                              "--fa-primary-color": "#670881",
                              "--fa-secondary-color": "#670881",
                            }}
                          />
                          <span className="pl-2">
                            {moment(blog.date).format("MM/DD/YYYY")}
                          </span>
                          <FontAwesomeIcon
                            icon={faEye}
                            style={{ color: "#B197FC" }}
                            className="pl-10"
                          />
                          <span className="pl-2">5 views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="w-screen flex flex-row justify-center items-center">
              <button
                onClick={handleOpen}
                className="w-[10%] bg-white rounded-md text-violet-600 shadow-xl border-[1px] border-violet-600 shadow-gray-200 font-prompt h-12"
              >
                Create Your blog
              </button>
              {open && (
                <div className="fixed inset-0 overflow-y-hidden">
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white w-full max-w-md p-4 rounded-lg z-50">
                      <div className="flex flex-col">
                        <h2 className="text-xl font-semibold">
                          Create Your Blog
                        </h2>
                        <form onSubmit={(e) => handleSubmit(e)}>
                          <div className="flex flex-col justify-start">
                            <Typography variant="h6">Title</Typography>
                            <Input
                              value={title}
                              onChange={handleTitleChange}
                              placeholder="Blog Title"
                              className="w-full border border-gray-300 p-2 rounded-md"
                            />
                            <Typography variant="h6">Description</Typography>
                            <textarea
                              value={description}
                              onChange={handleDescriptionChange}
                              placeholder="Your Blog"
                              className="w-full border border-gray-300 p-2 rounded-md"
                              rowsMin={3}
                            />
                            <Typography variant="h6">Image</Typography>
                            <input
                              type="file"
                              name="image"
                              accept="image/*"
                              onChange={handleImage}
                            />
                          </div>
                          <div className="flex justify-end mt-4">
                            <button
                              type="button"
                              onClick={handleClose}
                              className="text-red-500 hover:text-red-700 mr-4"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <ToastContainer />
          </div>{" "}
        </>
      )}
    </div>
  );
}

export default Blog;
