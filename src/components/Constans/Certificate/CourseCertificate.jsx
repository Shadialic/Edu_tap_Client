import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import bg from "../../../../public/images/tutor/bg-home.jpg";
export function downloadPDF(detailsRef) {
  const element = detailsRef.current;
  html2canvas(element).then((canvas) => {
    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imageData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("document.pdf");
  });
}

function CourseCertificate() {
  const location = useLocation();
  const navigate = useNavigate();
  const details = location.state;
  const course = details.course;
  const detailsRef = useRef(null);
  const handleDownloadPDF = () => {
    downloadPDF(detailsRef);
  };

  return (
    <div>
      <FontAwesomeIcon
        icon={faArrowLeft}
        onClick={() => navigate("/enrollments")}
      />
      <div
        ref={detailsRef}
        className="pm-certificate-body px-4 flex justify-center items-center h-screen"
      >
        <div className="w-[100%] h-[90%] bg-white relative">
          <div className="absolute inset-0 flex flex-col justify-c">
            <h1 className="text-[40px] text-center font-prompt-semibold font-prompt">
              Certificate <br />
              <span className="text-[30px] font-prompt-xlight">Of Course</span>
            </h1>
            <div className=" text-center text-3xl">
              <h1 className="">Is Hereby Presented To</h1>
            </div>
            <div className=" text-center text-[60px] ">
              <h1 className="">{details.name}</h1>
              <p className="text-[16px]">
                For Successfully Completing the {course[0].category}{" "}
                {course[0].title} course
              </p>
            </div>
            <div className="flex justify-between items-center w-[70%] mx-auto font-prompt ">
              <h1 className="text-center">
                DATE <br />
                27/2/2024
              </h1>
              <h1 className="text-right">
                SIGNATURE <br /> Edu-tap Team
              </h1>
            </div>
          </div>
          <img className="z-10 h-full" src={bg} alt="" />
        </div>
      </div>
      <FontAwesomeIcon
        onClick={handleDownloadPDF}
        className="m cursor-pointer absolute bottom-2  right-4"
        icon={faDownload}
        style={{ color: "#B197FC", fontSize: "30px" }}
      />
    </div>
  );
}

export default CourseCertificate;
