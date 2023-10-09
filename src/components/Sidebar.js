import React from "react";
import { AiFillHome } from "react-icons/ai";
import { MdSlowMotionVideo } from "react-icons/md";
import { RxVideo } from "react-icons/rx";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { useSelector } from "react-redux";

const list = [
  {
    name: "Home",
    pic: <AiFillHome className="h-full w-full dark:text-white" />,
  },
  {
    name: "Shorts",
    pic: <MdSlowMotionVideo className="h-full w-full dark:text-white" />,
  },
  {
    name: "Subscription",
    pic: <RxVideo className="h-full w-full dark:text-white" />,
  },
  {
    name: "Library",
    pic: <MdOutlineVideoLibrary className="h-full w-full dark:text-white" />,
  },
];


const Sidebar = () => {
    const sidebar = useSelector((store) => store.mode.sidebar);
  return (
    <div className="">
      {sidebar && (
        <div className="flex flex-col text-xs gap-3">
          {list.map((item, i) => (
            <div key={i} className="flex flex-col gap-1  items-center p-2">
              <span className=" w-3 h-3 sm:w-5 sm:h-5">{item.pic}</span>
              <p className="dark:text-white text-[7px] md:text-xs">{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
