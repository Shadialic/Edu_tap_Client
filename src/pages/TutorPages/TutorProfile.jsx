import React, { useState, useEffect } from "react";
import DisProfile from "../../components/TutorComponents/Profile/DisProfile";
import { Loader } from "../../components/Constans/Loader/Loader";

function TutorProfile() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <DisProfile />
      )}
    </>
  );
}

export default TutorProfile;
