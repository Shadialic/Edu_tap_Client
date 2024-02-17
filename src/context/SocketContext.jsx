// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useSelector } from "react-redux"; // Uncomment this line

// import io from "socket.io-client";

// const SocketContext = createContext();

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error("useSocket must be used within a SocketContextProvider");
//   }
//   return context;
// };

// export const SocketContextProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [notification, setNotification] = useState([]);
//   const [tutorNotification, setTutorNotification] = useState([]);

  // const userOnline = useSelector((state) => state.user.userInfo); // Uncomment this line
// const ownerOnline = useSelector((state) => state.tutor.tutorInfo); // Uncomment this line

//   useEffect(() => {
//     const query = {};
//     if (userOnline?._id) {
//       query.userId = userOnline._id;
//     }
//     // if (ownerOnline?._id) {
//     //   query.tutorId = tutorOnline._id;
//     // }

//     const newSocket = io("http://localhost:3000", {
//       query,
//     });

//     setSocket(newSocket);

//     newSocket.on("message", (users) => {
//         console.log(users);
//       setOnlineUsers(users);
//     });
//     newSocket.on("typing", (data) => {
//         console.log(data);
//         setNotification(users);
//     });


//     // Clean up socket connection when the component unmounts
//     return () => newSocket.close();
//   }, [userOnline?._id]);

//   return (
//     <SocketContext.Provider
//       value={{
//         socket,
//         onlineUsers,
//         notification,
//         setNotification,
//         tutorNotification,
//         setTutorNotification,
//       }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// };
