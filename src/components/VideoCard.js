import React, { useEffect, useState } from "react";
import { api } from "../util/constants";
import NumericLabel from "react-pretty-numbers";


const VideoCard = ({ video }) => {
  const [profile, setProfile] = useState("");
  console.log(video);
  const { snippet} = video;
  const { localized, thumbnails, channelId, channelTitle } = snippet;
  const getChannelPic = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=` +
          api
      );

      const data = await response.json();
      console.log(data);
      setProfile(data?.items[0]?.snippet?.thumbnails);
    } catch (error) {}
  };
  useEffect(() => {
    getChannelPic();
    // eslint-disable-next-line
  }, []);
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
    <div className="mb-2 md:w-[350px] sm:w-[200px] w-[150px] cursor-pointer rounded-lg pt-4">
      <img
        src={thumbnails?.medium?.url}
        className="w-full rounded-lg object-cover mb-2"
        alt="videoPic"
      />
      <div className="flex md:gap-4 gap-2">
        <img
          src={profile?.default?.url}
          alt="profile"
          className="rounded-full md:w-8 md:h-8 h-3 w-3"
        />
        <p className="font-bold dark:text-gray-300 text-[8px] md:text-sm lg:text-base">
          {localized?.title || snippet.title}
        </p>
      </div>
      <div className="md:pl-12 pl-5">
        <p className="text-sm text-gray-500 text-[8px] md:text-base">
          {channelTitle}
        </p>
        <div className="flex gap-1 text-sm text-gray-500 text-[8px] md:text-base">
          <p className="">
            <NumericLabel params={option}>
              {video?.statistics?.viewCount}
            </NumericLabel>
          </p>
          <p>views</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
