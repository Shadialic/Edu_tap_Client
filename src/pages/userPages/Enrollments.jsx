import React, { useEffect } from "react";

import empty from "../../../public/images/tutor/empty.png";
import Header from "../../components/UserComponents/Layouts/Header";
import { enrollments } from "../../api/UserApi";
import { useSelector } from "react-redux";
function Enrollments() {
  const userInfo = useSelector((state) => state.user.userInfo);
 const userid=userInfo.id
 console.log(userid,'aaa');
  useEffect(()=>{
    const fetch=async()=>{
      await enrollments(userid).then((res)=>{

      })

    }
    fetch();

  },[])
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
