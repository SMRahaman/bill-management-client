import React, { useContext } from "react";
import blankUser from "../../assets/blank image.webp";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
const Header = ({ userRole }) => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout()
      .then(navigate("/"))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="navbar bg-[#301934] px-8 flex justify-between  ">
        <div className="navbar-start">
          <h3 className="lg:text-2xl text-lg text-white uppercase font-bold">
            Bill Management System
          </h3>
        </div>
        <div>
          <div>
            {user && (
              <button onClick={logoutHandler} className="btn btn-primary">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
