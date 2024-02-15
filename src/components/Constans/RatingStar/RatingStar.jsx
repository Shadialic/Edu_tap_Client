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
      <h1 className="font-prompt">Your Rating <span className="ml-2 text-md">{rating}</span></h1>
    <div className="flex flex-row ">
      <p className="mt-1 pl-2 font-prompt  "></p> {/* Display current rating */}

      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index} className="">
            <input
              type="radio"
              name="rating"
              value={currentRating}
              style={{ display: "none" }}
              onClick={() => setRating(currentRating)}
            />
            <span
              className="star"
              style={{
                fontSize: 30,
                color: currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
      {/* Render the react-simple-star-rating component */}
      {/* <Rating
        ratingValue={rating}
        size={20}
        className="ml-10 flex"
        transition
        fillColor="gold"
        emptyColor="gray"
        onClick={handleRating}
      /> */}
    </div>
    </>
  );
}

export default RatingStar;
