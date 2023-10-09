import React from "react";
import { AiFillHome } from "react-icons/ai";
import { MdSlowMotionVideo } from "react-icons/md";
import { RxVideo } from "react-icons/rx";
import { BsFire, BsNewspaper } from "react-icons/bs";
import { BiMoviePlay } from "react-icons/bi";
import { AiOutlineShopping } from "react-icons/ai";
import { SiYoutubestudio, SiYoutubemusic } from "react-icons/si";

import {
  MdOutlineVideoLibrary,
  MdOutlineHistory,
  MdOutlineWatchLater,
  MdOutlineMusicNote,
  MdHelpOutline,
  MdOutlineSettings,
  MdOutlinedFlag,
  MdOutlineFeedback,
  MdGames,
} from "react-icons/md";
import { AiFillYoutube } from "react-icons/ai";
import { HiBars3 } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../redux/modeSlice";
const SliderSidebar = () => {
  const dispath = useDispatch();
  const slider = useSelector((store) => store.mode.slider);
  const list1 = [
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
  ];
  const list2 = [
    {
      name: "Library",
      pic: <MdOutlineVideoLibrary className="h-full w-full dark:text-white" />,
    },
    {
      name: "History",
      pic: <MdOutlineHistory className="h-full w-full dark:text-white" />,
    },
    {
      name: "Watch Later",
      pic: <MdOutlineWatchLater className="h-full w-full dark:text-white" />,
    },
  ];
  const list3 = [
    {
      name: "Trending",
      pic: <BsFire className="h-full w-full dark:text-white" />,
    },
    {
      name: "Shopping",
      pic: <AiOutlineShopping className="h-full w-full dark:text-white" />,
    },
    {
      name: "Music",
      pic: <MdOutlineMusicNote className="h-full w-full dark:text-white" />,
    },
    {
      name: "Movies",
      pic: <BiMoviePlay className="h-full w-full dark:text-white" />,
    },
    {
      name: "Gaming",
      pic: <MdGames className="h-full w-full dark:text-white" />,
    },
    {
      name: "News",
      pic: <BsNewspaper className="h-full w-full dark:text-white" />,
    },
  ];
  const list4 = [
    {
      name: "YouTube Premium",
      pic: <AiFillYoutube className="h-full w-full " />,
    },
    {
      name: "YouTube Studio",
      pic: <SiYoutubestudio className="h-full w-full " />,
    },
    {
      name: "YouTube Music",
      pic: <SiYoutubemusic className="h-full w-full" />,
    },
  ];
  const list5 = [
    {
      name: "Settings",
      pic: <MdOutlineSettings className="h-full w-full dark:text-white " />,
    },
    {
      name: "Report History",
      pic: <MdOutlinedFlag className="h-full w-full dark:text-white" />,
    },
    {
      name: "Help",
      pic: <MdHelpOutline className="h-full w-full dark:text-white" />,
    },
    {
      name: "Send feedback",
      pic: <MdOutlineFeedback className="h-full w-full dark:text-white" />,
    },
  ];
  return (
    <div
      className={
        slider
          ? "absolute z-10 bg-white overflow-y-scroll w-[230px] flex flex-col duration-300 shadow-lg  dark:bg-slate-800 left-0 transition top-0 py-3 px-1 h-screen"
          : "absolute -translate-x-[250px] z-10 duration-300 transition bg-white top-0 py-3 px-1 h-screen"
      }
    >
      <div className="flex w-max  xl:ml-5 sm:gap-4  items-center">
        <HiBars3
          onClick={() => dispath(toggleSlider())}
          className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer  text-black dark:text-white"
        />

        <div className="flex items-center justify-center relative ">
          <AiFillYoutube className="text-red-600 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
          <p className="font-bold dark:text-white text-black lg:text-[20px] sm:text-xs text-[6px] ">
            YouTube
          </p>
        </div>
      </div>
      <div className="flex flex-col text-xs gap-3 p-[15px]">
        {list1.map((item, i) => (
          <div
            key={i}
            className="flex hover:bg-gray-200 dark:hover:bg-gray-400 cursor-pointer hover:rounded-lg gap-8  items-center p-2"
          >
            <span className=" w-3 h-3 sm:w-6 sm:h-6">{item.pic}</span>
            <p className="dark:text-white font-medium text-[14px]">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <hr />
      <div className="flex flex-col text-xs gap-3 p-[15px]">
        {list2.map((item, i) => (
          <div
            key={i}
            className="flex hover:bg-gray-200 dark:hover:bg-gray-400 cursor-pointer hover:rounded-lg gap-8  items-center p-2"
          >
            <span className=" w-3 h-3 sm:w-6 sm:h-6">{item.pic}</span>
            <p className="dark:text-white font-medium text-[14px]">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <hr />
      <p className="pl-5 pt-4 font-semibold text-[16px] dark:text-white ">
        Explore
      </p>
      <div className="flex flex-col text-xs gap-3 p-[15px]">
        {list3.map((item, i) => (
          <div
            key={i}
            className="flex gap-8 hover:bg-gray-200 dark:hover:bg-gray-400 cursor-pointer hover:rounded-lg  items-center p-2"
          >
            <span className=" w-3 h-3 sm:w-6 sm:h-6">{item.pic}</span>
            <p className="dark:text-white font-medium text-[14px]">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <hr />
      <p className="pl-5 pt-4 font-semibold text-[16px] dark:text-white ">
        More from YouTube
      </p>
      <div className="flex flex-col text-xs gap-3 p-[15px]">
        {list4.map((item, i) => (
          <div
            key={i}
            className="flex gap-8  hover:bg-gray-200 dark:hover:bg-gray-400 cursor-pointer hover:rounded-lg items-center p-2"
          >
            <span className=" w-3 h-3 sm:w-6 sm:h-6 text-red-600">
              {item.pic}
            </span>
            <p className="dark:text-white font-medium text-[14px]">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <hr />
      <div className="flex flex-col text-xs gap-3 p-[15px]">
        {list5.map((item, i) => (
          <div
            key={i}
            className="flex hover:bg-gray-200 dark:hover:bg-gray-400 cursor-pointer hover:rounded-lg gap-8  items-center p-2"
          >
            <span className=" w-3 h-3 sm:w-6 sm:h-6">{item.pic}</span>
            <p className="dark:text-white font-medium text-[14px]">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <hr />
      <div className="flex flex-col text-gray-500 font-semibold text-[13px] gap-3 pl-5 pt-[15px]">
        <div>
          <div className="flex gap-2">
            <p>About</p>
            <p>Press</p>
            <p>Copyright</p>
          </div>
          <div className="flex gap-2">
            <p>Contact us</p>
            <p>Creators</p>
          </div>
          <div className="flex gap-2">
            <p>Advertise</p>
            <p>Developers</p>
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            <p>Terms</p>
            <p>Privacy</p>
            <p>Policy & Safety</p>
          </div>
          <div>
            <p>How YouTube works</p>
          </div>
          <div>
            <p>Test new features</p>
          </div>
        </div>
        <p>© 2023 Google LLC</p>
      </div>
    </div>
  );
};

export default SliderSidebar;
