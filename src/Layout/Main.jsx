import React, { useContext, useEffect, useState } from "react";
import Header from "../Common/Header/Header";
import SideMenubar from "../Common/SideMenubar/SideMenubar";
import { Outlet, useLocation } from "react-router-dom";

const Main = () => {
  const location = useLocation();
  return (
    <div className="z-10">
      {location.pathname !== "/login" && location.pathname !== "/" && (
        <div className="z-[10] fixed w-full">
          <Header></Header>
        </div>
      )}
      <div className="flex flex-row relative">
        {location.pathname !== "/login" && location.pathname !== "/" && (
          <div className="w-[20%] overflow-auto">
            <SideMenubar></SideMenubar>
          </div>
        )}
        <div
          className={
            location.pathname == "/login" || location.pathname == "/"
              ? "w-full"
              : "w-[80%] absolute left-[260px] pe-5"
          }
        >
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Main;
