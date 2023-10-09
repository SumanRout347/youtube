import React, { useEffect } from "react";
import ButtonList from "./ButtonList";
import VideoPage from "./VideoPage";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleSidebar } from "../redux/modeSlice";

const MainContainer = () => {
  const slider = useSelector((store) => store.mode.slider);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(toggleSidebar(true));
    } else {
      dispatch(toggleSidebar(false));
    }
  }, [location.pathname]);
  return (
    <div
      className={
        slider ? "flex flex-col h-[980px] md:h-[960px]  lg:h-[538px] overflow-hidden pointer-events-none" : "flex flex-col"
      }
    >
      <ButtonList />
      <VideoPage />
    </div>
  );
};

export default MainContainer;
