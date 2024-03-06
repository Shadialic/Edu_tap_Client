import React, { useState, useEffect } from "react";
import Header from "../../components/UserComponents/Layouts/Header";
import { Footer } from "../../components/UserComponents/Layouts/Footer";
import AboutPage from "../../components/UserComponents/About/AboutPage";
import { Loader } from "../../components/Constans/Loader/Loader";

function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <AboutPage />
          <Footer />
        </>
      )}
    </>
  );
}

export default About;
