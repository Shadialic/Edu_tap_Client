import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

function RatingStar() {
  const [rating, setRating] = useState(0); // Initialize rating state with a default value
  const [hover, setHover] = useState(null);
  const totalStars = 5;

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <>
    <div className="flex flex-row ">
      <h1 className="font-prompt ml-5 mt-2">Course Rating <span className="ml-3 ">{rating}</span></h1>
      {/* <p className="mt-1 pl-2 ml-2 font-prompt ">{rating}</p>  */}

      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <div className="">

         
          <label key={index} className="">
            <input
              type="radio"
              name="rating"
              // value={currentRating}
              style={{ display: "none" }}
              onClick={() => setRating(currentRating)}
            />
            <span
              className="star"
              style={{
                fontSize: 25,
                color: currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
          </div>
        );
      })}
    
    </div>
    </>
  );
}

export default RatingStar;
