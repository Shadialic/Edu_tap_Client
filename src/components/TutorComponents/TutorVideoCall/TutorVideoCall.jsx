import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";


function TutorVideoCall() {
  const location = useLocation();
  const { recieverId } = location.state;

  const currentCompany = useSelector((state) => {
    return state.company;
  });


  const myMeeting = async (element) => {
    const appID = 1892667175;
    const serverSecret = "fb30adc523e092a198d5757d03ca27f2";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      recieverId,
      Date.now().toString(),
      currentCompany.companyName
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http://localhost:5173/room/${recieverId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
    });
   
  };
  return (
    <div className="mt-20">
      <div ref={myMeeting} />
    </div>
  );
}

export default TutorVideoCall;
