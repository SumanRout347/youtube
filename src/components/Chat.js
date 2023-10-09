import React, { useEffect, useState } from "react";
import { dp } from "../util/constants";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../redux/chatSlice";
import { generate, generateSentence } from "../util/helper";
import { IoMdSend } from "react-icons/io";

const Chat = () => {
  const dispatch = useDispatch();
  const [typeChat, setTypeChat] = useState("");
  const chat = useSelector((store) => store.chat.chatData);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(addChat({ name: generate(), message: generateSentence() }));
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);
  const submit = () => {
    if (typeChat) dispatch(addChat({ name: "Sluggerboi", message: typeChat }));
    setTypeChat("");
  };
  return (
    <div className=" w-full border border-gray-300 rounded-lg h-[450px] overflow-y-scroll ">
        <div><div className="border border-b-gray-300 py-3 px-5 ">
        <h2>Live chat</h2>
      </div>
      <div className="flex flex-col-reverse border border-b-gray-300">
        {chat?.map((data, i) => (
          <div key={i} className="py-3 px-5 flex gap-4 items-center">
            <img src={dp} alt="" className="rounded-full w-6 h-6" />
            <div className="flex items-center gap-2 text-sm">
              <p className="text-gray-500">{data?.name}</p>
              <p>{data?.message}</p>
            </div>
          </div>
        ))}
      </div></div>
      
      <div className="py-3 px-5 flex justify-between items-center text-sm">
        <div className="flex gap-4 items-center">
          <img src={dp} alt="" className="rounded-full w-6 h-6" />
          <div className="pt-2">
            <p className="text-gray-500 mb-1 md:text-base text-xs">Sluggerboi</p>
            <input
              type="text"
              placeholder="Chat"
              value={typeChat}
              onChange={(e) => setTypeChat(e.target.value)}
              className="outline-none hover:outline-none bg-transparent border-b-gray-500 border-b px-1"
            />
          </div>
        </div>
        <button onClick={submit}>
          <IoMdSend className="md:h-6 md:w-6 h-3 w-3 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
