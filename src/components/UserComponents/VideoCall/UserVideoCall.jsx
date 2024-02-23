import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";

function UserVideoCall() {
  const { recieverId } = useParams();
  const currentUserDetails = useSelector((state) =>state.user.userInfo
  );

  const myMeeting = async (element) => {
    if (currentUserDetails.id === recieverId) {
      const appID = 1892667175;
      const serverSecret = "fb30adc523e092a198d5757d03ca27f2";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        recieverId,
        Date.now().toString(),
        currentUserDetails.userName
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
      });
    } else {
      console.log('invalid user');
      // toast.error("Invalid User link!");
    }
  };
  return (

    <div className="mt-20 ">
      <div ref={myMeeting} />
    </div>

  );
}

export default UserVideoCall;
