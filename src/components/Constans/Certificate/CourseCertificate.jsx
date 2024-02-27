import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from 'html2canvas'; // Import html2canvas library
import jsPDF from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export function downloadPDF(detailsRef) {
    html2canvas(detailsRef.current).then(canvas => {
        const imageData = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        pdf.addImage(imageData, 'PNG', 0, 0);
        pdf.save("document.pdf");
    });
}

function CourseCertificate() {
    const location = useLocation();
    console.log("Current location:", location);
    const detailsRef = useRef(null); // Create a ref

    const handleDownloadPDF = () => {
        downloadPDF(detailsRef); 
    };

    return (
        <div>
            <div className="pm-certificate-body px-4 flex justify-center items-center h-screen bg-gray-300">
                <div className="container pm-certificate-container relative w-800 h-600 bg-blue-500 p-8 text-gray-800 font-sans">
                    {/* Outer Border */}
                    <div className="outer-border absolute w-794 h-594 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"></div>

                    {/* Inner Border */}
                    <div className="inner-border absolute w-730 h-530 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"></div>

                    {/* Certificate Body */}
                    <div className="pm-certificate-border relative w-720 h-520 border border-gray-300 bg-white text-gray-800">
                        {/* Certificate Header */}
                        <div className="pm-certificate-header mb-10">
                            <div className="pm-certificate-title text-center">
                                <h2 className="text-3xl font-cursive">Buffalo Public Schools Certificate of Completion</h2>
                            </div>
                        </div>

                        {/* Certificate Body */}
                        <div ref={detailsRef} className="pm-certificate-body px-4">
                            {/* Certificate Name */}
                            <div className="pm-certificate-block">
                                <div className="text-center">
                                    <span className="pm-name-text font-bold text-2xl">TrueNorth Administrator</span>
                                </div>
                            </div>

                            {/* Earned */}
                            <div className="pm-earned mt-6 text-center">
                                <span className="pm-earned-text font-cursive block">has earned</span>
                                <span className="pm-credits-text font-bold block">PD175: 1.0 Credit Hours</span>
                            </div>

                            {/* Course Title */}
                            <div className="pm-course-title mt-4 text-center">
                                <span className="pm-earned-text font-cursive block">while completing the training course entitled</span>
                                <span className="pm-credits-text font-bold block">BPS PGS Initial PLO for Principals at Cluster Meetings</span>
                            </div>
                        </div>

                        {/* Certificate Footer */}
                        <div className="pm-certificate-footer flex justify-between items-center px-4 absolute bottom-0 left-0 w-full">
                            <div className="pm-certified text-center">
                                <span className="pm-credits-text block">Buffalo City School District</span>
                                <span className="block border-b border-gray-700 mb-3"></span>
                                <span className="font-bold block">Crystal Benton Instructional Specialist II, Staff Development</span>
                            </div>
                            <div className="col-xs-4"></div>
                            <div className="pm-certified text-center">
                                <span className="pm-credits-text block">Date Completed</span>
                                <span className="block border-b border-gray-700 mb-3"></span>
                                <span className="font-bold block">DOB: </span>
                                <span className="font-bold block">Social Security # (last 4 digits)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Add FontAwesomeIcon for download */}
            <FontAwesomeIcon
                onClick={handleDownloadPDF}
                className="mb-2 cursor-pointer"
                icon={faDownload}
                style={{ color: "#B197FC", fontSize: "24px" }}
            />
        </div>
    );
}

export default CourseCertificate;
