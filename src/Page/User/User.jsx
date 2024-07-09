import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import userUserHook from "../../Hook/UserHook/userUserHook";

const User = () => {
  const [role, setRole] = useState("");
  const[userData]=userUserHook();
  const userUpdateHandler=(id)=>{
    axios.patch(`https://bill-deposite-server.vercel.app/api/user/${id}`,{
        role: role,
    })
    .then(res=>{
        console.log(res.data)
        if(res.data.modifiedCount>0){
            Swal.fire({
                title: "Congratulation",
                text: ` Your role update successfully`,
                icon: "success",
              });

              refetch();
        }
    })
  }
  return (
    <div className="mt-20">
      <div>
        <h3 className="text-2xl font-bold mb-5">User List</h3>
      </div>
      <div className="text-right mb-5">
        <button className="bg-red-700 p-3 text-white rounded"><Link to='/register'>Create a new account</Link></button>
      </div>
      <table class="table table-xs text-center">
        <thead>
          <tr>
            <th>SL No.</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.length === 0 ? (
            <td colspan={8} className="py-12 text-center">
              Data not Found
            </td>
          ) : (
            userData?.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.userEmail}</td>
                <td >
                  <button>
                  <select
                    value={user.role}
                    onChange={(e) => setRole(e.target.value)}
                    onClick={()=>userUpdateHandler(user._id)}
                    className=" bg-blue-700 text-white text-center rounded-md border-none w-[130px] h-[30px] text-xs"
                  >
                    <option>---</option>
                    <option>Admin</option>
                    <option>SuperAdmin</option>
                    <option>Logistic-User</option>
                    <option>Account-User</option>
                  </select>
                  </button>
                </td>
                <td className="flex justify-center gap-2">
                  <button className="bg-red-700 p-2">
                    <MdDelete className="text-white text-sm" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default User;
