import React, { useEffect, useRef, useState } from "react";
// import empty from "../../../public/images/tutor/noData.png";
import ChapterForm from "../Add_form/ChapterForm";
import {
  fetchChapter,
  manageChapter,
} from "../../../api/VendorApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Loader } from "../../Constans/Loader/Loader";

function DetaileClass({ courseId }) {
  const [isOpn,setOpn] = useState(false);
  const [chapter,setChpter] = useState([]);
  const [manageControle, setmanageControle] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteChapterId, setDeleteChapterId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await fetchChapter();
        const filterData = res.data.data;
        const data = filterData.filter((item) => item.course_id === courseId);
        setChpter(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch chapters:", error);
      }
    };
    fetch();
  }, [courseId,isOpn]);

  const videoRef = useRef(null);
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setmanageControle(!manageControle);
    } else {
      video.pause();
      setmanageControle(!manageControle);
    }
  };

  const addChapter = () => {
    setOpn(true);
  };

  const handleDelete = async () => {
    try {
      await manageChapter(deleteChapterId);
      setDialogOpen(false);
      const res = await fetchChapter();
      const filterData = res.data.data;
      const data = filterData.filter((item) => item.course_id === courseId);
      setChpter(data);
      toast.success("Chapter deleted successfully.");
    } catch (error) {
      console.error("Failed to delete chapter:", error);
      toast.error("Failed to delete chapter.");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteChapterId(id);
    setDialogOpen(true);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          {dialogOpen && (
            <Dialog
              open={true} 
              handler={handleCancel}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 1, y: -100 },
              }}
            >
              <DialogHeader>Delete Chapter</DialogHeader>
              <DialogBody>
                Are you sure you want to delete this chapter?
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleCancel}
                  className="mr-1"
                >
                  Cancel
                </Button>
                <Button variant="gradient" color="green" onClick={handleDelete}>
                  Confirm
                </Button>
              </DialogFooter>
            </Dialog>
          )}
          {!isOpn ? (
            <div className="w-screen h-screen">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-6 bg-gray-200">
                  <h1 className="text-3xl font-prompt font-semibold m-0">
                    Chapters
                  </h1>
                  <button
                    onClick={addChapter}
                    className="px-4 py-2 bg-violet-600 font-prompt text-white rounded-lg"
                  >
                    Add Chapter
                  </button>
                </div>
                <div className="flex flex-col gap-6 p-6 overflow-auto   w">
                  {chapter.map((item, index) => (
                    <div
                      key={index + 1}
                      className="border-2 border-gray-100 rounded-lg"
                    >
                      <div className="video-container relative">
                        <video
                          className="w-full"
                          ref={videoRef}
                          src={item.chapterVideo}
                          controls={manageControle ? "controls" : ""}
                        />
                        <div className="custom-controls flex justify-center items-center absolute inset-0 ">
                          <button
                            className={`${
                              !manageControle
                                ? "bg-white rounded-full p-1 pl-4 pr-3"
                                : ""
                            }`}
                            onClick={togglePlayPause}
                          >
                            {manageControle ? (
                              <FontAwesomeIcon icon={faPause} />
                            ) : (
                              <FontAwesomeIcon icon={faPlay} />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <h1 className="text-xl font-prompt-semibold">
                          #{index + 1} {item.chapterTitle}
                        </h1>
                        <button
                          className="text-purple-600"
                          onClick={() => handleDeleteClick(item._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <ChapterForm setOpn={setOpn} courseId={courseId} />
          )}
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default DetaileClass;
