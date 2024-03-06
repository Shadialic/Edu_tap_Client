import React, { useEffect, useState } from "react";

function DateTime() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return (
    <div>
      <p> {date.toLocaleTimeString()}</p>
      <p className="text-center"> {date.toLocaleDateString()}</p>
    </div>
  );
}

export default DateTime;
