import React, { useEffect, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";

import { FaUserCircle } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode, toggleSlider } from "../redux/modeSlice";
import { YOUTUBE_SEARCH_API, api } from "../util/constants";
import { cacheData, setLive, setSearch } from "../redux/searchSlice";
import { setSearchVideos } from "../redux/videoSlice";

const Header = () => {
  const dispath = useDispatch();

  const [searchText, setSearchText] = useState("");
  const darkMode = useSelector((store) => store.mode.value);
  const slider = useSelector((store) => store.mode.slider);
  const searchCache = useSelector((store) => store.search.suggestions);

  const [suggestions, setSuggestions] = useState([]);
  const [suggestionSearch, setSuggestionSearch] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);

  const searchVideo = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&q=${
          suggestionSearch ? suggestionSearch : ""
        }&videoDuration=medium&key=` + api
      );

      const data = await response.json();
      console.log(data.items);
      dispath(setSearchVideos(data.items));
    } catch (error) {}
  };
  const handleSuggestion = (val) => {
    console.log("hello");
    setSuggestionSearch(val);
    searchVideo();
    dispath(setSearch(true));
    // setSuggestionSearch("");
  };
  const handleNavigation = () => {
    dispath(setSearch(false));
    dispath(setLive(false));
  };
  const handleSubmit = () => {
    searchVideo();
    setSearchText("");
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestion(false);
    }, 1000);
  };

  const getSuggestions = async () => {
    try {
      const response = await fetch(YOUTUBE_SEARCH_API + searchText);
      const data = await response.json();
      console.log(data)
      setSuggestions(data[1]);
      dispath(cacheData({ [searchText]: data[1] }));
    } catch (error) {
      
    }
   
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // eslint-disable-next-line
  }, [darkMode]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchText]) {
        setSuggestions(searchCache[searchText]);
      } else {
        getSuggestions();
        console.log("call");
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [searchText]);
  return (
    <div
      className={
        slider
          ? "flex lg:gap-0 pointer-events-none items-center justify-between px-2 py-2 w-full"
          : "flex lg:gap-0 items-center justify-between px-2 py-2 w-full"
      }
    >
      <div className="flex w-max  xl:ml-5 sm:gap-4  items-center">
        <HiBars3
          onClick={() => dispath(toggleSlider())}
          className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer  dark:text-white"
        />

        <div
          onClick={handleNavigation}
          className="flex items-center cursor-pointer justify-center relative "
        >
          <AiFillYoutube className="text-red-600  w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
          <p className="font-bold dark:text-white  lg:text-[20px] sm:text-xs text-[6px] ">
            YouTube
          </p>
        </div>
      </div>
      <div className="w-[80%] relative sm:ml-0 ml-2 flex justify-center items-center gap-5">
        <div className="w-3/5 flex dark:text-white">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            onBlur={handleBlur}
            type="text"
            className="w-full rounded-l-full md:px-4 md:py-2 sm:py-[4px] py-[2px] md:text-base sm:text-xs text-[4px] px-2 outline-none hover:outline-none bg-transparent border border-gray-300"
            placeholder="Search"
          />
          <div
            onClick={handleSubmit}
            className="bg-transparent cursor-pointer  bg-gray-200  dark:bg-gray-400 border border-b-gray-300 border-t-gray-300 border-r-gray-300 rounded-r-full md:px-6 sm:px-2 px-[2px] flex justify-center items-center"
          >
            <AiOutlineSearch className="md:w-7 md:h-7 sm:w-5 sm:h-5 w-2 h-2 " />
          </div>
        </div>
        <div
          onClick={() => dispath(toggleMode())}
          className="flex bg-gray-400 cursor-pointer sm:gap-2 gap-1 dark:text-white items-center rounded-full border border-gray-400 md:py-2 md:px-5 sm:py-[2px] px-1"
        >
          {darkMode ? (
            <BsFillSunFill className="md:w-6 md:h-6 sm:w-4 sm:h-4 w-2 h-2 " />
          ) : (
            <BsFillMoonFill className="md:w-6 md:h-6 sm:w-4 sm:h-4 w-2 h-2 " />
          )}
          <span className="md:text-sm font-bold sm:text-xs text-[6px]">
            {darkMode ? "LIGHT" : "DARK"}
          </span>
        </div>
        {suggestions && showSuggestion && (
          <div className="absolute md:top-11 top-6 py-2 dark:bg-slate-800 dark:text-white  border-gray-200 border md:w-[530px] w-[300px] md:right-[343px] right-[50px] z-10 shadow-lg rounded-lg bg-white">
            {suggestions.map((suggestion, i) => (
              <div
                onClick={() => handleSuggestion(suggestion)}
                className="hover:bg-gray-100 hover:dark:bg-gray-500 font-semibold px-4 py-1 cursor-pointer"
                key={i}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <FaUserCircle className="w-4 h-4 sm:w-6 sm:h-6 sm:mr-5 dark:text-white" />
      </div>
    </div>
  );
};

export default Header;
