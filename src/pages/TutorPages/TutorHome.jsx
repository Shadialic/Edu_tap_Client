import React, { useState, useEffect } from "react";
import Home from "../../components/TutorComponents/Dashboard/Home";
import { Loader } from "../../components/Constans/Loader/Loader";

function TutorHome() {
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
        <Home />
      )}
    </>
  );
}

export default TutorHome;
