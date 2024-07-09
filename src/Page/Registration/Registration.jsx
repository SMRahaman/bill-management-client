import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";
const Registration = () => {
  const { register } = useContext(AuthContext);
  const registerHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photourl.value;
    const email = form.email.value;
    const password = form.password.value;
    register(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        if (user) {
          updateProfile(user, {
            displayName: name,
            photoURL: photoURL,
          });
          axios
            .post("https://bill-deposite-server.vercel.app/api/user", {
              userEmail: email,
              userName: name,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.insertedId) {
                Swal.fire({
                  title: "Congratulation",
                  text: `${name} your registration successfully`,
                  icon: "success",
                });
              }
            });
        }
        form.reset();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="hero min-h-screen  py-20">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-[400px]  shadow-2xl bg-base-100">
            <form onSubmit={registerHandler} className="card-body">
              <div>
                <h3 className="text-2xl uppercase font-bold text-center">
                  Registration
                </h3>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  name="photourl"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Registration</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
