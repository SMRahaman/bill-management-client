import React, { useContext, useEffect, useState } from "react";
import Header from "../Common/Header/Header";
import SideMenubar from "../Common/SideMenubar/SideMenubar";
import { Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../Components/AuthProvider/AuthProvider";
import axios from "axios";
import userUserHook from "../Hook/UserHook/userUserHook";

const Main = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [userData] = userUserHook();
  const specifiqUserForRole = userData.find(
    (role) => role?.userEmail === user?.email
  );
  console.log(specifiqUserForRole);
  return (
    <div className="z-10">
      <div className="z-[10] fixed w-full">
        <Header userRole={specifiqUserForRole}></Header>
      </div>
      <div className="flex flex-row relative">
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <div className="w-[20%] overflow-auto">
              <SideMenubar userRole={specifiqUserForRole}></SideMenubar>
            </div>
          )}
        <div
          className={
            location.pathname !== "/login" && location.pathname !== "/register"
              ? "w-[80%] absolute left-[260px] pe-5"
              : "w-full "
          }
        >
          <Outlet userRole={specifiqUserForRole}></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Main;
