import React from "react";
import Header from "../UserComponents/Layouts/Header";
import { Textarea, Button, IconButton, Input } from "@material-tailwind/react";
import { LinkIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function UserChat() {
  return (
    <>
      <Header state="Home" />
      <div className="bg-authentication-background bg-cover bg-gray-100 flex justify-center items-center w-screen h-screen py-7 px-5">
        <div className="bg-white w-full h-fit sm:max-w-[90%] min-h-[90%] overflow-auto rounded-md flex justify-center items-center shadow-xl p-3 gap-5 flex-row mb-16">
          <div className="w-[29%] h-[500px] border-2 border-t-0 border-x-0 ">
            <h1 className="font-prompt text-xl font-prompt-semibold">Chats</h1>
            <div className="border-2 border-gray-100 shadow-lg shadow-gray-100 h-10 rounded-md mt-8">
              <input
                type="text"
                className="w-[95%] h-full outline-none font-prompt text-sm border-b-2 border-violet-600 "
                placeholder="Search or start a new chat"
              />
            </div>
          </div>
          <div className="w-[70%] h-[500px] border-2 border-b-0 mb-2">
            <div className="w-full h-[12%] border-2  border-gray-100 ">
            <FontAwesomeIcon icon={faUser} />
              <h1 className="text-xl font-prompt-semibold">You</h1>
            </div>
            <div className="flex w-[100%] flex-row  items-center gap-2 rounded-md border border-gray-900/10 bg-gray-900/5 p-2 mt-[51%] ">
              <div className="flex  ">
                <IconButton variant="text" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </IconButton>
                <IconButton variant="text" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                </IconButton>
              </div>
              <Input
             
                resize={true}
                placeholder="Your Message"
                className="min-h-full !border-0 focus:border-transparent"
                containerProps={{
                  className: "grid h-full",
                }}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div>
                <IconButton variant="text" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default UserChat;
