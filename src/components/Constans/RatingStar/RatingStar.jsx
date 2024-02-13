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
    <div className="flex flex-row ml-6">
      <p className="mt-2.5 pl-2 font-prompt ml-2 ">{rating}</p> {/* Display current rating */}

      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index} className="pl-2">
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
  );
}

export default RatingStar;
