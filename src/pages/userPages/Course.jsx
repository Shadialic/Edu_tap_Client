import React, { useState } from "react";
import DisCourse from "../../components/UserComponents/CourseManage/DisCourse";
import Navbar from "../../components/UserComponents/Layouts/Header";
import { Loader } from "../../components/Constans/Loader/Loader"; // Import the Loader component

function Course() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Navbar />
      {loading && <Loader />}
      <DisCourse onLoad={() => setLoading(true)} />
    </div>
  );
}

export default Course;
