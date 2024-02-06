import React from "react";

import empty from "../../../public/images/tutor/empty.png";
import Header from "../../components/UserComponents/Layouts/Header";
function Enrollments() {
  return (
    <div>
      <Header state="Home" />

      <div className="p-6">
        <h1 className="font-prompt font-prompt-semibold text-4xl">
          Learn New Skill
        </h1>

        <div className="flex justify-center items-center p-8">
          <h1 className="font-prompt-semibold text-3xl font-prompt">
          </h1>
          <img className="w-[40%] h-[50%]" src={empty} alt="Empty Image" />
        </div>
        
      </div>
    </div>
  );
}

export default Enrollments;
