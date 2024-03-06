import React from "react";
import { Card } from "@material-tailwind/react";

function TutorDeatails({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {formData &&
        formData.map((item) => (
          <div key={item.id}>
            <div className="w-full">
              <div className="justify-center items-center">
                <h1 className="text-2xl font-prompt">My Profile</h1>
                <Card className="w-[80%] mt-5 ml-[10%] border-[1px] rounded-xl p-3 border-[#d3d2d2]  ">
                  <div className="flex flex-row gap-5">
                    <div className="flex flex-col gap-5 mt-4">
                      <h1 className="uppercase font-prompt text-0d rounded-md h-12 p-6 text-white bg-violet-600 text-center flex items-center justify-center">
                        Full Name
                      </h1>
                      <h1 className="uppercase font-prompt text-0d rounded-md h-12 p-6 text-white bg-violet-600 text-center flex items-center justify-center">
                        Ema0d
                      </h1>
                      <h1 className="uppercase font-prompt text-0d rounded-md h-12 p-6 text-white bg-violet-600 text-center flex items-center justify-center">
                        Phone Number
                      </h1>
                    </div>
                    <div className="flex flex-col gap-5 mt-4">
                      <input
                        name="userName"
                        className="w-[100%] border-[1px] border-[#da05dace] focus:border-[#FAFA] bg-white h-12 rounded-md p-6 font-prompt text-lg"
                        style={{ paddingLeft: "1px" }}
                        value={item.tutorName}
                        onChange={(e) => handleChange(e)}
                        type="text"
                      />
                      <input
                        name="email"
                        className="w-[100%] border-[1px] border-[#da05dace] focus:border-[#FAFA] bg-white h-12 rounded-md p-6 font-prompt text-lg"
                        style={{ paddingLeft: "1px" }}
                        value={item.email}
                        onChange={(e) => handleChange(e)}
                        type="text"
                      />
                      <input
                        name="phone"
                        className="w-[100%] border-[1px] border-[#da05dace] focus:border-[#FAFA] bg-white h-12 rounded-md p-6 font-prompt text-lg"
                        style={{ paddingLeft: "1px" }}
                        value={item.phone}
                        onChange={(e) => handleChange(e)}
                        type="text"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default TutorDeatails;
