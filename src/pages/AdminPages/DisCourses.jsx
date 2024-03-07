import React, { useEffect, useState } from "react";
import Sidebar from "../../components/AdminComponents/Layouts/Sidebar";
import Navbar from "../../components/AdminComponents/Layouts/Navbar";
import DisplayCourse from "../../components/AdminComponents/courseManage/showCourse/DisplayCourse";
import { getCourse } from "../../api/AdminApi";
import { Loader } from "../../components/Constans/Loader/Loader";
function DisCourses() {
  const [searchInput, setSearchInput] = useState("");
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourseData = async () => {
    try {
      const res = await getCourse();
      const courseList = res.data.data;
      setCourse(courseList);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const filteredCourses = course.filter((userData) => {
    const searchLowerCase = searchInput.toLowerCase();
    const title = userData.title.toLowerCase().includes(searchLowerCase);
    const category = userData.category.toLowerCase().includes(searchLowerCase);
    const payment = userData.payment.toString().includes(searchLowerCase);
    return title || category || payment;
  });

  return (
    <div>
      <Sidebar state={"disCourses"} />
      <Navbar
        state={"disCourses"}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <div className="mt-4 flex flex-col gap-12 p-4 xl:ml-80">
        {loading ? (
          <p><Loader/></p>
        ) : (
          <DisplayCourse userDatas={filteredCourses} />
        )}
      </div>
    </div>
  );
}

export default DisCourses;
