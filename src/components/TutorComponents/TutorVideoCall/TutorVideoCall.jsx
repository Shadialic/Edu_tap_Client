import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";

function TutorVideoCall() {
  const currentUserDetails = useSelector((state) => state.tutor.tutorInfo);
  const [clientstate, setClientState] = useState("");
  const location = useLocation();
  const data = location.state?.data || "";

  const senderdetails = data[0];
  const recipientdetails = data[1];
  let roomId, receiverId;
  if (data) {
    roomId = senderdetails.toString();
    receiverId = recipientdetails.toString();
  }

  if (!data) {
    const queryParams = new URLSearchParams(location.search);
    roomId = queryParams.get("roomId");
    receiverId = queryParams.get("receiverId");
  } else {
    roomId = senderdetails.toString();
    receiverId = recipientdetails.toString();
  }

  const myMeeting = async (element) => {
    try {
      // generate Kit Token
      const appID = 1892667175;
      const serverSecret = "fb30adc523e092a198d5757d03ca27f2";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        currentUserDetails.email
      );

      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Personal link",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              "/videocall/" +
              "?roomId=" +
              roomId +
              "&receiverId=" +
              receiverId,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      });
    } catch (error) {
      console.error("Error in myMeeting:", error);
      // Handle error appropriately
    }
  };

  return (
    <>
      <div ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>
    </>
  );
}

export default TutorVideoCall;
