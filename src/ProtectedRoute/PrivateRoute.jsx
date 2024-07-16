import React, { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider/AuthProvider";
import userUserHook from "../Hook/UserHook/userUserHook";
import { BallTriangle } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(AuthContext);
  const location = useLocation();
  if (loader) {
    return (
      <div className="flex flex-col items-center justify-center mt-[280px]">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <div>Loading...</div>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return (
    <div>
      <Navigate state={location.pathname} to="/login"></Navigate>
    </div>
  );
};

export default PrivateRoute;
