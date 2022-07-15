import React, { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [backTotopButton, setBackToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  //   for scroll up :
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backTotopButton && (
        <button
          className="animate-bounce"
          style={{
            height: "50px",
            width: "50px",
            position: "fixed",
            bottom: "50px",
            right: "50px",
            fontSize: "50px",
            zIndex: "999999",
          }}
          onClick={scrollUp}
        >
          <FaArrowCircleUp style={{ color: "#0C7B93" }}></FaArrowCircleUp>
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
