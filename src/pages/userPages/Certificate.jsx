import React, { useState, useEffect } from "react";
import CourseCertificate from "../../components/Constans/Certificate/CourseCertificate";
import { Loader } from "../../components/Constans/Loader/Loader";

function Certificate() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <div>{loading ? <Loader /> : <CourseCertificate />}</div>;
}

export default Certificate;
