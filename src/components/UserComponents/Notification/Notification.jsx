import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

function Notification() {
  const [isOpn, setIsOpn] = useState(false);

  const toggleNotificationModal = () => {
    setIsOpn(!isOpn); 
  };

  return (
    <div className="absolute top-0">
      <FontAwesomeIcon
        icon={faBell}
        className="text-center mt-5"
        onClick={toggleNotificationModal}  
      />
      {isOpn && (
        <div className="absolute z-10 flex  min-w-[250px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm shadow-lg shadow-blue-gray-500/10 focus:outline-none">
         <div className="flex flex-row"> 

          <h1 className="text-start text-md font-prompt-semibold ">Notifications</h1>
            <h1 className="ml-3">Mark all as  Read</h1>
         </div>
        </div>
      )}
    </div>
  );
}

export default Notification;
