import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toggleSidebar } from "../redux/modeSlice";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { PiShareFatLight } from "react-icons/pi";
import NumericLabel from "react-pretty-numbers";
import { api, dp } from "../util/constants";
import Chat from "./Chat";
import SideVideoCard from "./SideVideoCard";
import CommentSection from "./CommentSection";
const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState("");
  const [show, setShow] = useState(false);
  const isLive = useSelector((store) => store.search.isLive);
  const videos = useSelector((store) => store.videos.initial);

  const [showDetails, setShowDetails] = useState("...more");
  const dispatch = useDispatch();
  let videoId = searchParams.get("v");
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(toggleSidebar(true));
    } else {
      dispatch(toggleSidebar(false));
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const getVideoData = async () => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=` +
        api
    );
    const data = await response.json();
    console.log(data.items[0]);
    setData(data.items[0]);
  };
  useEffect(() => {
    getVideoData();
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    if (showDetails === "...more") {
      setShow(true);
      setShowDetails("Show less");
    } else {
      setShow(false);
      setShowDetails("...more");
    }
  };
  const option = {
    justification: "L",
    locales: "en-US",
    percentage: false,
    precision: 2,
    wholenumber: null,
    commafy: true,
    cssClass: ["red"],
    shortFormat: true,
    shortFormatMinValue: 10000,
    shortFormatPrecision: 1,
    title: true,
  };

  return (
    <div className="w-full">
      <div className="max-w-screen-lg flex md:flex-row flex-col gap-4 justify-between mx-auto pt-6">
        <div className="md:w-[65%] w-full aspect-video">
          <div className="w-full aspect-video mb-2">
            <iframe
              className="w-full aspect-video"
              src={
                "https://www.youtube-nocookie.com/embed/" +
                videoId +
                "?autoplay=1"
              }
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div>
            <div>
              <h2 className="text-lg font-semibold mb-2 dark:text-white md:ml-0 ml-2">
                {data?.snippet?.localized?.title}
              </h2>
              <div className="flex justify-between items-center">
                <div className="flex md:gap-3 gap-2 items-center dark:text-white md:ml-0 ml-2">
                  <img
                    src={dp}
                    alt="profile"
                    className="rounded-full md:w-8 md:h-8 h-4 w-4"
                  />
                  <p className="md:text-[12px] text-[6px]">
                    {data?.snippet?.channelTitle}
                  </p>
                  <button className="text-black hover:bg-gray-300 md:text-[12px] text-[6px] md:py-[6px] py-[2px] rounded-2xl px-2 md:px-3 bg-gray-100 border border-gray-300">
                    Join
                  </button>
                  <button className="bg-black md:text-[12px] md:py-[6px] px-2 py-[2px] hover:bg-gray-800 text-[6px] rounded-2xl md:px-3 text-white">
                    Subscribe
                  </button>
                </div>
                <div className="flex items-center gap-2 md:mr-0 mr-4">
                  <div className="flex cursor-pointer items-center rounded-2xl md:py-[6px] px-1 py-[2px] md:px-3 bg-gray-200">
                    <div className="flex  gap-2 pr-2 border border-r-gray-400 items-center">
                      <BsHandThumbsUp className="w-3 h-3 md:w-5 md:h-5" />
                      <p className="font-semibold md:text-[12px] text-[6px]">
                        <NumericLabel params={option}>
                          {data?.statistics?.likeCount}
                        </NumericLabel>
                      </p>
                    </div>
                    <div className="ml-2">
                      <BsHandThumbsDown className="w-3 h-3 md:w-5 md:h-5" />
                    </div>
                  </div>
                  <div className="flex cursor-pointer gap-2 items-center rounded-2xl md:py-[6px] px-2 py-[2px] md:px-4 bg-gray-200">
                    <PiShareFatLight className="w-3 h-3 md:w-5 md:h-5" />
                    <p className="md:text-[12px] text-[6px]">Share</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mr-0 mr-4 md:ml-0 ml-2">
              <div className="bg-zinc-100 rounded-lg mb-4">
                {show ? (
                  <p className="text-sm">
                    {data?.snippet?.description}
                    <span
                      onClick={handleClick}
                      className="font-semibold cursor-pointer "
                    >
                      {"  "}
                      {showDetails}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm">
                    {data?.snippet?.description.slice(0, 150)}
                    <span
                      onClick={handleClick}
                      className="font-semibold cursor-pointer"
                    >
                      {"  "} {showDetails}
                    </span>
                  </p>
                )}
              </div>
              <CommentSection />
            </div>
          </div>
        </div>
        {isLive ? (
          <div className="flex flex-col">
            <Chat />
            <div className="md:p-0 p-2">
              {videos?.map((video, index) => (
                <Link to={"/watch?v=" + video.id}>
                  <SideVideoCard key={index} video={video} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="md:p-0 p-2">
            {videos?.map((video, index) => (
              <Link to={"/watch?v=" + video.id}>
                <SideVideoCard key={index} video={video} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
