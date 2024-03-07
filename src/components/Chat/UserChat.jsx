import React, { useEffect, useRef, useState } from "react";
import Header from "../UserComponents/Layouts/Header";
import { io } from "socket.io-client";
import { Typography, Avatar, IconButton } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { getChats, getMessages, sendMessage } from "../../api/UserApi";
import InputEmoji from "react-input-emoji";
import { TimeMange } from "../../helpers/TimeMange";
import { useNavigate } from "react-router-dom";
import profile from "../../../public/images/user/profile.png";

function UserChat() {
  const navigate = useNavigate();
  const [userChats, setUserChats] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [textMessage, setTextMessage] = useState("");
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [groupChat, setGroupChat] = useState([]);
  const [notification, setNotification] = useState([]);
  const scroll = useRef();

  const filteredMembers = userChats
    .map((chat) => chat.members)
    .flat()
    .filter((member) =>
      member.tutorName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const sendTextMessage = async () => {
    const isGroupChat = selectedMember.groupName;
    const groupChat = currentChat._id;
    const recipientId = currentChat.members[0]._id;
    const senderId = userInfo.id;
    const chatId = currentChat._id;
    const text = textMessage;
    const userName = userInfo.userName;
    const userImage = userInfo.image;
    try {
      const res = await sendMessage({
        text,
        chatId,
        senderId,
        recipientId,
        groupChat,
        userName,
        userImage,
        isGroupChat,
      });
      const response = res.saveMeassage;
      setNewMessage(response);

      setTextMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [userInfo.id, newMessage]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", userInfo.id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    const recipientId = socket.id;
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage, socket, currentChat]);

  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });
    socket.on("getNotification", (res) => {
      if (currentChat?._id === res.senderId) {
        setNotification((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotification((prev) => [res, ...prev]);
      }
    });
    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await getChats(userInfo.id);
        setUserChats(res.chats);
        setGroupChat(res.groupchat);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, [userInfo.id]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getMessages(currentChat?._id);
        console.log(res.message);
        setMessages(res.message);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (newMessage !== null) {
      setMessages((prev) => [...prev, newMessage]);
    }
  }, [newMessage, currentChat]);

  useEffect(() => {
    if (!currentChat) {
      return;
    }

    const handleNewMessage = async (message) => {
      if (message.chatId === currentChat._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };
    socket?.on("newMessage", handleNewMessage);
    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  const handleVideoCall = async () => {
    if (currentChat._id && userInfo.id) {
      const videoData = [currentChat._id, userInfo.id];
      if (videoData[1]) {
        navigate("/videocall", { state: { data: videoData } });
      } else {
        console.error("Data is empty. Unable to initiate video call.");
      }
    } else {
      console.error("Recipient details or sender details are missing.");
    }
  };

  return (
    <>
      <Header state="Home" />
      <div className="bg-authentication-background bg-cover bg-gray-100 flex justify-center items-center w-screen h-screen py-7 px-5">
        <div className="bg-white w-full sm:max-w-[90%] min-h-[90%] overflow-hidden rounded-md flex flex-col sm:flex-row mb-16">
          <div className="w-full sm:w-[29%] h-full border-r-0 sm:border-r-2 border-b-0 sm:border-b-2 border-gray-200">
            <h1 className="font-prompt text-xl font-prompt-semibold p-3 border-b border-gray-200">
              Chats
            </h1>
            <div className="p-3">
              <input
                type="text"
                className="w-full h-10 outline-none font-prompt text-sm border-b-2 border-violet-600"
                placeholder="Search or start a new chat"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="overflow-auto flex-1">
              {userChats.map((chat, index) => (
                <div
                  key={index}
                  className={`p-3 border-b border-gray-200 hover:bg-violet-700 hover:text-white hover:rounded-md cursor-pointer ${
                    selectedMember && selectedMember._id === chat._id
                      ? "bg-violet-700 text-white rounded-md"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedMember(chat);
                    setCurrentChat(chat);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {chat.members[0].image ? (
                        <Avatar
                          src={chat.members[0].image}
                          alt="avatar"
                          size="md"
                        />
                      ) : (
                        <Avatar src={profile} alt="avatar" size="md" />
                      )}

                      <div>
                        <Typography
                          variant="h6"
                          className="text- font-prompt font-prompt-semibold  mb-2 ml-2"
                        >
                          {chat.members[0].tutorName}
                        </Typography>
                      </div>
                    </div>
                    <Typography
                      variant="small"
                      className="text-sm font-prompt-light"
                    >
                      {TimeMange(chat.createdAt) === "NaN years ago"
                        ? "just now"
                        : TimeMange(chat.createdAt)}
                    </Typography>
                  </div>
                </div>
              ))}
              {groupChat &&
                groupChat.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 border-b border-gray-200 hover:bg-violet-700 hover:text-white hover:rounded-md cursor-pointer ${
                      selectedMember && selectedMember._id === item._id
                        ? "bg-violet-700 text-white rounded-md"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedMember(item);
                      setCurrentChat(item);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {item.image ? (
                          <Avatar src={item.image} alt="avatar" size="md" />
                        ) : (
                          <Avatar src={profile} alt="avatar" size="md" />
                        )}

                        <div>
                          <Typography
                            variant="h6"
                            className="text-font-prompt font-prompt-semibold  mb-2 ml-2"
                          >
                            {item.groupName}
                          </Typography>
                        </div>
                      </div>
                      <Typography
                        variant="small"
                        className="text-sm font-prompt-light"
                      >
                        {TimeMange(item.createdAt) === "NaN years ago"
                          ? "just now"
                          : TimeMange(item.createdAt)}
                      </Typography>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-full sm:w-[70%] h-[500px] border-t sm:border-t-0 border-gray-200">
            {currentChat ? (
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-3 border-b border-gray-200">
                  <div className="flex items-center">
                    <Avatar
                      src={currentChat.members[0].image || currentChat.image}
                      alt="avatar"
                      size="md"
                    />
                    <div className="ml-3">
                      <Typography variant="h6">
                        {currentChat.members[0].tutorName ||
                          currentChat.groupName}
                      </Typography>
                      {!onlineUsers.some(
                        (user) => user.userId === currentChat._id
                      ) && (
                        <Typography
                          variant="small"
                          color="gray"
                          className="text-sm font-normal"
                        >
                          online
                        </Typography>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FontAwesomeIcon
                      onClick={handleVideoCall}
                      icon={faVideo}
                      className="text-violet-600 mr-4"
                    />
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="text-violet-600 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-4 hidescroll">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex flex-row mb-2 rounded-md w-fit h-auto ${
                        message.senderId === userInfo.id
                          ? "ml-auto bg-violet-600 text-white"
                          : "mr-auto bg-white shadow-xl shadow-gray-200"
                      }`}
                    >
                      {currentChat.groupName &&
                      message.senderId !== userInfo.id ? (
                        <>
                          {message.userImage ? (
                            <Avatar
                              src={message.userImage}
                              alt="avatar"
                              size="md"
                            />
                          ) : (
                            <Avatar src={profile} alt="avatar" size="md" />
                          )}

                          <div>
                            <h1 className="font-prompt-semibold">
                              {message.userName}
                            </h1>
                            <h1 className="mr-2 p-1">{message.text}</h1>
                            <span className="flex justify-end items-end text-[10px] font-prompt-light">
                              {TimeMange(message.createdAt) == "NaN years ago"
                                ? "just now"
                                : TimeMange(message.createdAt)}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="message p-2 rounded-md w-fit h-auto font-prompt mb-2">
                          <h1 className="mr-2 ">{message.text}</h1>
                          <span className="flex justify-end items-end text-[10px] font-prompt-light">
                            {TimeMange(message.createdAt) == "NaN years ago"
                              ? "just now"
                              : TimeMange(message.createdAt)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={scroll}></div>
                </div>
                <div className="flex items-center p-4 border-t border-gray-200">
                  <InputEmoji
                    value={textMessage}
                    onChange={setTextMessage}
                    cleanOnEnter
                    onEnter={() => {
                      sendTextMessage();
                    }}
                  />
                  <IconButton
                    onClick={sendTextMessage}
                    variant="text"
                    className="rounded-full text-violet-600 ml-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </IconButton>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full">
                <h1>Not selected Yet</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserChat;
