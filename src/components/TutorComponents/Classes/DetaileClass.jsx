import React, { useEffect, useRef, useState } from "react";
import ChapterForm from "../Add_form/ChapterForm";
import { fetchChapter } from "../../../api/VendorApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
function DetaileClass({ courseId }) {
  console.log(courseId, "courseId");
  const [isOpn, setOpn] = useState(false);
  const [chapter, setChpter] = useState([]);
  const [manageControle, setmanageControle] = useState(false);

  const addChapter = () => {
    setOpn(true);
  };
  useEffect(() => {
    const fetch = async () => {
      await fetchChapter().then((res) => {
        const filterData = res.data.data;
        console.log(filterData, "llllfilterData");
        const data = filterData.filter((item) => item.course_id === courseId);
        console.log(data, "ddd");
        setChpter(data);
      });
    };
    fetch();
  }, []);
  console.log(chapter, ";;;;;;a");

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

  return (
    <>
      {isOpn ? (
        <ChapterForm setOpn={setOpn} courseId={courseId} />
      ) : (
        <div className="w-screen h-screen">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-prompt font-semibold p-6 mb-6">
              Chapters
            </h1>
            <button
              onClick={addChapter}
              className="w-32 h-12 bg-violet-600 font-prompt text-white mr-14 mt-2 rounded-lg"
            >
              Add Chapter
            </button>
          </div>
          <div className="">
            {chapter.map((item, index) => (
              <div className="ml-12 border-2 flex flex-col border-gray-300 w-[80%] h-32">
                <div className="video-container w-[300px] h-[200px]">
                  <video
                    ref={videoRef}
                    src={item.chapterVideo}
                    width="300"
                    height="300"
                    controls={manageControle ? "controls" : ""}
                  />
                  <div className="custom-controls">
                    <button
                     className={`absolute top-10 left-20 ${!manageControle ? 'bg-white rounded-full pl-3 pr-3 pt-1 pb-1' : ''}`}
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
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default DetaileClass;
