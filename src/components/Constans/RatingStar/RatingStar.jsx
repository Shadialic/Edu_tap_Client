import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { FaStar ,FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
function RatingStar({stars,reviews}) {
  const [rating, setRating] = useState(null); 
  const [hover, setHover] = useState(null);
  const totalStars = 5;

  const handleRating = (rate) => {
    setRating(rate);
  };

  
  return (
    <>
   {/* {[...Array[5]].map((star,index)=>{
    const currentTating=index+1
    return (

  <label htmlFor="
  ">
    <input type="radio" name="rating"  style={{ display: "none" }} value={currentTating} onClick={()=>setRating(currentTating)}/>
    <FaStar size={50}
    color={currentTating<=(hover||rating)?'#ffc187':'#e4e5e9'}
    className=""/>
  </label>
    )
    })} */}
   
    <div className="flex flex-row ">
      <h1 className="font-prompt ml-5 mt-2">Course Rating <span className="ml-3 ">{rating}</span></h1>

      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <div className="">

         
          <label key={index} className="">
            <input
              type="radio"
              name="rating"
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
