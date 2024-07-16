import React from "react";
import logo from "../../assets/akij-group-vector-logo.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className="flex justify-center mt-8">
        <img className="w-[400px] h-80" src={logo} alt="" />
      </div>
      <div>
        <h3 className="uppercase text-3xl text-red-700 text-center mt-4 font-bold">
          Welcome to Bill Management System
        </h3>
      </div>
      <div className="flex justify-center gap-5 mt-8">
        <Link to="/login">
          <button className="btn btn-outline">Login here</button>
        </Link>
        <button className="btn btn-outline">About</button>
      </div>
    </div>
  );
};

export default Home;
