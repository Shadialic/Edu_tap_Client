import React, { useEffect, useState } from "react";
import empty from "../../../public/images/tutor/empty.png";
import Header from "../../components/UserComponents/Layouts/Header";
import { enrollments } from "../../api/UserApi";
import { useSelector } from "react-redux";
import Collections from "../../components/UserComponents/Classes/Collections";
import { Loader } from "../../components/Constans/Loader/Loader";

function Enrollments() {
  const [course, setCourses] = useState([]);
  const [Id, setId] = useState();
  const [chapter, setChapter] = useState([]);
  const [tutors, setTutors] = useState();
  const [isOpn, setOpn] = useState(false);
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector((state) => state.user.userInfo);
  const userId = userInfo.id;

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await enrollments(userId);
        const fetchedCourses = response.courses;
        const chapters = response.chapter;
        const tutors = response.tutors;
        setCourses(fetchedCourses);
        setChapter(chapters);
        setTutors(tutors);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, [userId]);

  const handleClass = (id) => {
    setId(id);
    setOpn(true);
  };

  return (
    <div>
      <Header state="Home" />
      {loading && <Loader />}

      {!isOpn ? (
        <div className="p-6">
          <h1 className="font-prompt font-prompt-semibold text-4xl">
            Learn New Skill
          </h1>
          {course.length > 0 ? (
            <div className="flex flex-wrap p-6 gap-6">
              {course.map((course) => (
                <div
                  onClick={() => handleClass(course._id)}
                  key={course._id}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-2 hover:scale-105 hover:shadow-md"
                >
                  <div className="rounded-lg shadow-xl shadow-gray-400">
                    <img
                      className="w-full h-auto rounded-t-lg"
                      src={course.image}
                      alt={course.title}
                    />
                    <div className="p-4 ">
                      <h3 className="text-xl font-prompt font-prompt-semibold mb-2">
                        {course.title}
                      </h3>
                      <div className="font-prompt border-t-2">
                        <p className="mt-4">Author: {course.auther}</p>
                        <p className="mb-2">Category: {course.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center p-8">
              <h1 className="font-prompt-semibold text-3xl font-prompt"></h1>
              <img className="w-[40%] h-[50%]" src={empty} alt="Empty Image" />
            </div>
          )}
        </div>
      ) : (
        <Collections
          chapter={chapter}
          courseId={Id}
          tutors={tutors}
          course={course}
        />
      )}
    </div>
  );
}

export default Enrollments;
