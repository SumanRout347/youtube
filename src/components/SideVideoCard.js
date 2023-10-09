import React, { useEffect, useState } from "react";
import NumericLabel from "react-pretty-numbers"
import { useSelector } from "react-redux";

const SideVideoCard = ({video}) => {
  const [profile, setProfile] = useState("");
  console.log(video);
  const { snippet, statistics } = video;
  const { localized, thumbnails, channelId, channelTitle } = snippet;
  const isSearch = useSelector((store) => store.search.isSearch);
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
    <div className="mb-2 sm:w-[400px] flex gap-2  w-[300px] cursor-pointer rounded-lg pt-4">
      <img
        src={thumbnails?.medium?.url}
        className="w-1/2 rounded-lg object-cover mb-2"
        alt="videoPic"
      />
      <div className="flex flex-col">
        <p className="font-semibold dark:text-gray-300 mb-2 text-[14px]">

          {localized?.title.slice(0,54)+"..." || snippet.title.slice(0,54)+'...'}
        </p>
        <p className="text-sm text-gray-500 ">{channelTitle}</p>
      </div>
      {/* <div className="pl-12">
        <p className="text-sm text-gray-500">{channelTitle}</p>
        <p className="text-sm text-gray-500">
          <NumericLabel params={option}>
            {isSearch ? 1 + "m" : statistics?.videoCount}
          </NumericLabel>{" "}
          views
        </p>
      </div> */}
    </div>
  );
};

export default SideVideoCard;
