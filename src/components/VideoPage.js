import React, { useEffect} from "react";
import VideoCard from "./VideoCard";
import { api } from "../util/constants";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setVideos } from "../redux/videoSlice";

const VideoPage = () => {
  const videos = useSelector((store) => store.videos.initial);
  const isSearch = useSelector((store) => store.search.isSearch);
  const isLive = useSelector((store) => store.search.isLive);
  const searchedVideos = useSelector((store) => store.videos.searchVideo);
  const liveVideos = useSelector((store) => store.videos.liveVideo);

  const dispatch = useDispatch();

  const getVideos = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=30&&videoDuration=medium&key=` +
          api
      );

      const data = await response.json();
      console.log(data.items);
      dispatch(setVideos(data.items));
    } catch (error) {}
  };

  useEffect(() => {
    getVideos();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="">
      <div className="flex flex-wrap md:gap-8 gap-2">
        {isSearch && searchedVideos
          ? searchedVideos?.map((video, index) => (
              <Link to={"/watch?v=" + video.id.videoId}>
                <VideoCard key={index} video={video} />
              </Link>
            ))
          : videos && !isSearch && !isLive
          ? videos?.map((video, index) => (
              <Link to={"/watch?v=" + video.id}>
                <VideoCard key={index} video={video} />
              </Link>
            ))
          : isLive &&
            liveVideos &&
            liveVideos?.map((video, index) => (
              <Link to={"/watch?v=" + video.id.videoId}>
                <VideoCard key={index} video={video} />
              </Link>
            ))}
        {/* {videos &&
          videos?.map((video,index) => (
            <Link to={"/watch?v="+video.id}>
              <VideoCard key={index} video={video} />
            </Link>
          ))} */}
      </div>
    </div>
  );
};

export default VideoPage;
