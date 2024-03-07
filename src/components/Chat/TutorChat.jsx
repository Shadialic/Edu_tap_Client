import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  Typography,
  Avatar,
  IconButton,
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { getMessages, sendMessage } from "../../api/UserApi";
import InputEmoji from "react-input-emoji";
import {
  createGroup,
  getTutorChats,
  teacherStudents,
} from "../../api/VendorApi";
import Header from "../TutorComponents/TutorLayouts/Header";
import { TimeMange } from "../../helpers/TimeMange";
import { useNavigate } from "react-router-dom";
import profile from "../../../public/images/user/profile.png";

function TutorChat() {
  const navigate = useNavigate();
  const [userChats, setUserChats] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const tutorInfo = useSelector((state) => state.tutor.tutorInfo);
  const [textMessage, setTextMessage] = useState("");
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notification, setNotification] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupChat, setGroupChat] = useState([]);
  const [image, setImage] = useState(null);
  const [searchUsers, setSearchUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const scroll = useRef();

  const handleSearch = async (e) => {
    const searchData = e.target.value.toLowerCase();
    setSearchQuery(searchData);
    const filterData = searchUsers.filter(
      (item) =>
        !searchQuery ||
        item.userName.toLowerCase().includes(searchQuery) ||
        item.email.toLowerCase().includes(searchQuery)
    );
    setSearchUsers(filterData);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectUser = (user) => {
    const isSelected = selectedUsers.some(
      (selectedUser) => selectedUser === user
    );
    if (isSelected) {
      const updatedUsers = selectedUsers.filter(
        (selectedUser) => selectedUser !== user
      );
      setSelectedUsers(updatedUsers);
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleGroupChat = async (e) => {
    e.preventDefault();
    if (!groupName) {
      toast("Please enter a group name.");
      setOpen(false);
      return;
    }
    const receiverIds = selectedUsers.map((item) => item.members[0]._id);
    const senderId = tutorInfo.id;
    try {
      const formData = new FormData();
      formData.append("groupName", groupName);
      formData.append("senderId", senderId);
      receiverIds.forEach((id) => formData.append("receiverIds", id));
      if (image) {
        formData.append("image", image);
      }
      const response = await createGroup(formData);
      toast(response.alert);
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast("An error occurred while creating the group.");
    }
  };
  const handleCancelSelection = () => {
    setSelectedUsers(null);
  };

  const sendTextMessage = async () => {
    const isGroupChat = selectedMember.groupName;
    const recipientId = currentChat.members[0]._id;
    const groupChat = currentChat._id;
    const senderId = tutorInfo.id;
    const chatId = currentChat._id;
    const text = textMessage;
    const userName = tutorInfo.name;
    const userImage = tutorInfo.image;
    try {
      const res = await sendMessage({
        text,
        chatId,
        senderId,
        recipientId,
        groupChat,
        isGroupChat,
        userImage,
        userName,
      });
      const response = res.saveMeassage;
      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await getTutorChats(tutorInfo.id);
        setUserChats(res.chats);
        setGroupChat(res.groupchat);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, [tutorInfo.id, open]);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [tutorInfo.id, newMessage]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", tutorInfo.id);
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
  }, [socket, currentChat, messages]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getMessages(currentChat?._id);
        setMessages(res.message);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat]);

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
    if (currentChat._id && tutorInfo.id) {
      const videoData = [currentChat._id, tutorInfo.id];
      if (videoData[1]) {
        navigate("/vendor/videocall", { state: { data: videoData } });
      } else {
        console.error("Data is empty. Unable to initiate video call.");
      }
    } else {
      console.error("Recipient details or sender details are missing.");
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await teacherStudents(tutorInfo.id);
      const chats = response.chats;
      const students = chats.map((item) => {
        return item.members;
      });
      setSearchUsers(chats);
    };
    fetch();
  }, []);

  console.log(userChats, "userChats");
  console.log(searchUsers, "searchUsers");
  console.log(selectedMember, "selectedMember");

  // const filterData = searchUsers.filter(item => {
  //   const lowerCaseSearchQuery = searchQuery.toLowerCase();
  //   const lowerCaseUserName = item.userName ? item.userName.toLowerCase() : '';
  //   const lowerCaseEmail = item.email ? item.email.toLowerCase() : '';
  //   return (
  //     !searchQuery ||
  //     lowerCaseUserName.includes(lowerCaseSearchQuery) ||
  //     lowerCaseEmail.includes(lowerCaseSearchQuery)
  //   );
  // });
  // console.log(filterData, "filterData");

  return (
    <>
      <Header />
      <div className="bg-authentication-background bg-cover bg-gray-100 flex justify-center items-center w-screen h-screen py-7 px-5">
        <div className="bg-white  w-full sm:max-w-[90%] min-h-[90%] overflow-hidden rounded-md flex flex-col sm:flex-row mb-16">
          <div className="w-full sm:w-[29%] h-full border-r-0 sm:border-r-2 border-b-0 sm:border-b-2 border-gray-200">
            <div className="flex flex-row justify-between">
              <h1 className="font-prompt text-xl font-prompt-semibold p-3 border-b border-gray-200">
                Chats
              </h1>
              <div className="flex items-center pr-2 relative">
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="text-violet-600 cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-44 font-prompt p-2 bg-white border border-gray-200 rounded shadow-lg">
                    <ul>
                      <li onClick={() => setOpen((cur) => !cur)}>New Group</li>
                    </ul>
                  </div>
                )}
                <div className="flex flex-row">
                  <Dialog
                    open={open}
                    handler={() => setOpen((cur) => !cur)}
                    className="w-full"
                  >
                    <div className="flex flex-row w-full">
                      <div className="w-1/2">
                        <Card className="w-full max-w-[23rem] mx-auto h-full">
                          <CardBody className="flex flex-col gap-4 ">
                            <form onSubmit={handleGroupChat}>
                              <Typography variant="h6">Group Name</Typography>
                              <Input
                                label="Group Name"
                                size="lg"
                                onChange={(e) => setGroupName(e.target.value)}
                              />
                              <Typography variant="h6">
                                Profile Image
                              </Typography>
                              <Input
                                label="upload image"
                                size="lg"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                              />
                              <Typography variant="h6">Add Users</Typography>
                              {selectedUsers.length > 0 && (
                                <div className="flex items-center">
                                  {selectedUsers.map((user, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center"
                                    >
                                      <Avatar
                                        src={user.members[0].image}
                                        alt={`Selected User ${index}`}
                                      />
                                      {/* Optionally, you can include a cancel button for each selected user */}
                                      {/* <Button onClick={() => handleDeselectUser(user)}>Cancel</Button> */}
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div></div>

                              <CardFooter className="pt-0 mt-5">
                                <Button
                                  className="bg-violet-600 "
                                  variant="gradient"
                                  fullWidth
                                  type="submit"
                                >
                                  Create Group
                                </Button>
                              </CardFooter>
                            </form>
                          </CardBody>
                        </Card>
                      </div>

                      <div className="w-1/2 ">
                        <input
                          type="text"
                          placeholder="Search..."
                          onChange={handleSearch}
                          className="w-full px-3 py-2 mb-4 mt-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                        {searchUsers &&
                          searchUsers.map((item, index) => (
                            <Card key={index}>
                              <List>
                                <ListItem className="p-0">
                                  <label
                                    htmlFor={`vertical-list-react-${index}`}
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                  >
                                    <ListItemPrefix className="mr-3">
                                      <Checkbox
                                        id={`vertical-list-react-${index}`}
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        containerProps={{ className: "p-0" }}
                                        onClick={() => handleSelectUser(item)}
                                        checked={selectedUsers.includes(item)}
                                      />
                                    </ListItemPrefix>
                                    {item.members[0].image ? (
                                      <Avatar
                                        src={item.members[0].image}
                                        alt="avatar"
                                        size="md"
                                      />
                                    ) : (
                                      <Avatar
                                        src={profile}
                                        alt="avatar"
                                        size="md"
                                      />
                                    )}

                                    <div className="flex flex-col pl-2">
                                      <Typography
                                        color="blue-gray"
                                        className="font-medium"
                                      >
                                        {item.members[0].userName}
                                      </Typography>
                                      <Typography
                                        color="blue-gray"
                                        className="text-[12px]"
                                      >
                                        {item.members[0].email}
                                      </Typography>
                                    </div>
                                  </label>
                                </ListItem>
                              </List>
                            </Card>
                          ))}
                      </div>
                    </div>
                  </Dialog>
                </div>
              </div>
            </div>

            <div className="p-3">
              <input
                type="text"
                className="w-full h-10 outline-none font-prompt text-sm border-b-2 border-violet-600"
                placeholder="Search or start a new chat"
                // value={searchQuery}
                // onChange={handleSearch}
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
                          className="text-font-prompt font- uppercase mb-2 ml-2"
                        >
                          {chat.members[0].userName}
                        </Typography>
                        <Typography
                          variant="h6"
                          className="text-font-prompt font- uppercase mb-2"
                        >
                          {chat.members[0].email}
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

              {groupChat.map((item, index) => (
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
                          className="text-font-prompt font- uppercase mb-2"
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
                    {currentChat.members[0].image ? (
                      <Avatar
                        src={currentChat.members[0].image || currentChat.image}
                        alt="avatar"
                        size="md"
                      />
                    ) : (
                      <Avatar src={profile} alt="avatar" size="md" />
                    )}

                    <div className="ml-3">
                      <Typography variant="h6">
                        {currentChat.members[0].userName ||
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
                        message.senderId === tutorInfo.id
                          ? "ml-auto bg-violet-600 text-white"
                          : "mr-auto bg-white shadow-xl shadow-gray-200"
                      }`}
                    >
                      {currentChat.groupName &&
                      message.senderId !== tutorInfo.id ? (
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
      <ToastContainer />
    </>
  );
}

export default TutorChat;
