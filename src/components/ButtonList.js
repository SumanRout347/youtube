import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setLiveVideos } from "../redux/videoSlice";
import { api } from "../util/constants";
import { setLive, setSearch } from "../redux/searchSlice";

const ButtonList = () => {
  const list = [
    "All",
    "Music",
    "Live",
    "Gaming",
    "Javascript",
    "Funny Videos",
    "Cricket",
    "Football",
    "Gadgets",
    "Python",
    "React",
    "Java",
    "Akshay Saini",
    "Fifa",
    "Recently Updated",
    "Watched",
    "New to you",
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);
  const dispatch = useDispatch();
  const liveVideos = useSelector((store) => store.videos.liveVideo);
  const liveVideo = async () => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&eventType=live&maxResults=25&q=news&type=video&key=` +
        api
    );

    const data = await response.json();
    console.log(data.items);
    dispatch(setLiveVideos(data.items));
  };

  const handleClick = (i) => {
    setActiveIndex(i);
    if (i === 2) {
      liveVideo();
      dispatch(setLive(true));
      dispatch(setSearch(false))
    }
  };
  const prev = () => {
    let box = document.getElementById("slider");
    setRight(true);
    box.scrollLeft = box.scrollLeft - 350;
    if (box.scrollLeft === 0) {
      setLeft(false);
      setRight(true);
    }
  };
  const next = () => {
    let box = document.getElementById("slider");
    setLeft(true);
    box.scrollLeft = box.scrollLeft + 350;
    console.log(box.scrollLeft);
    if (box.scrollLeft >= 383) {
      setRight(false);
      setLeft(true);
    }
  };
  return (
    <div className="py-3  flex gap-2 items-center ">
      {left && (
        <div className="bg-gray-300 rounded-full p-2 dark:bg-slate-400 lg:flex hidden">
          <AiOutlineLeft
            onClick={prev}
            className="dark:text-white cursor-pointer"
          />
        </div>
      )}

      <div
        id="slider"
        className="overflow-x-scroll transition-all duration-300 scroll-smooth sm:w-[500px] w-[250px] md:w-[600px]  lg:w-[820px] xl:w-[1000px]"
      >
        <div className="flex w-max gap-2">
          {list.map((item, i) => (
            <div
              onClick={() => handleClick(i)}
              key={i}
              className={
                activeIndex === i
                  ? "bg-black dark:bg-slate-600 text-[6px] sm:text-sm text-white rounded-lg sm:py-1  sm:px-3 px-2 cursor-pointer"
                  : "bg-gray-200 dark:bg-slate-400 text-[6px] sm:text-sm text-black rounded-lg sm:py-1 sm:px-3 px-2 cursor-pointer"
              }
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
      {right && (
        <div className="bg-gray-300 rounded-full p-2 dark:bg-slate-400 lg:flex hidden">
          <AiOutlineRight
            onClick={next}
            className="dark:text-white cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default ButtonList;
