import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { updateRating, getUserCourseRating } from "../../api/UserApi";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const StarRating = ({ userId, courseId ,currentrating}) => {
  
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(-1);

  const handleChange = async (event, newValue) => {
    setRating(newValue);
    await updateRating({ userId, courseId, newValue });
  };

  const handleChangeActive = (event, newHover) => {
    setHover(newHover);
  };

  useEffect(() => {
    const fetchRating = async () => {
      const response = await getUserCourseRating({ courseId, userId });
      console.log(response, "pppppppppp");
      setRating(response.yourRating.star);
    };
    fetchRating();
  }, [userId, courseId]);
  console.log(hover, "00000", rating);
  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="flex flex-row font-prompt pl-3  ">
        <span>YourRating</span>
      </div>
      <Rating
        className="ml-2"
        name="hover-feedback"
        value={rating}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={handleChange}
        onChangeActive={handleChangeActive}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {rating !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
      )}
    </Box>
  );
};

export default StarRating;
