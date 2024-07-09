import axios from "axios";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import useCategoryHook from "../../Hook/CategoryHook/useCategoryHook";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CategoryUpdateModal from "../../Components/CategoryUpdateModal/CategoryUpdateModal";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";

const CategoryAdd = () => {
  const {user}=useContext(AuthContext);
  const [updateCategory, setUpadateCategory] = useState();
  const [selectCategory, setselectCategory] = useState("");
  const [categoryData, refetch] = useCategoryHook();
  console.log(categoryData);
  const CatAddHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryName = form.catName.value;
    const categoryMode = selectCategory;
    const category = {
      categoryName: categoryName,
      categoryMode: categoryMode,
      userEmail:user?.email,
    };
    const existingCategory = categoryData.find(
      (category) => category.categoryName.toLowerCase() === categoryName.toLowerCase()
    );
    if (existingCategory) {
      Swal.fire({
        title: "Wrong",
        text: `${categoryName} already have your database`,
        icon: "error",
      });
    } else {
      axios.post("https://bill-deposite-server.vercel.app/api/category", category).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Congratulation",
            text: `${categoryName} add successfully`,
            icon: "success",
          });
          refetch();
          form.reset();
        }
      });
    }
  };

  const catDelHandler = (id, categoryName) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://bill-deposite-server.vercel.app/api/category/${id}`).then((res) => {
          if (res.data.deletedCount == 1) {
            Swal.fire({
              title: "Congratulation",
              text: ` ${categoryName}Delete successfully`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const catUpdateModal = (id) => {
    const findDataForUpdate = categoryData.find(
      (category) => category._id === id
    );
    setUpadateCategory(findDataForUpdate);
  };

  const userWiseCategory=categoryData.filter(cat=>cat.userEmail===user?.email);

  return (
    <div className="pt-20 ">
      <form onSubmit={CatAddHandler}>
        <div>
          <h3 className="text-2xl font-bold mb-8">
            Add Comapny (Voucher type wise)
          </h3>
        </div>
          <div className="grid grid-cols-3 gap-3">
          <div>
          <input
            required
            type="text"
            name="catName"
            placeholder="Type Company Name"
            className="input input-bordered w-full max-w-sm"
          />
        </div>
        <div className="">
          <select
            required
            onChange={(e) => setselectCategory(e.target.value)}
            className="select select-bordered w-full max-w-sm"
          >
            <option disabled selected>
              Select Category Mode
            </option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
          </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success text-white">
            Add Category
          </button>
        </div>
      </form>
      <div className="mt-12 ">
        <h3 className="text-right font-bold text-sm">
          Total Company:{categoryData.length}
        </h3>
      </div>
      <div className="my-12">
        <table class="table table-xs text-center">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Company Name</th>
              <th> Mode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userWiseCategory.length===0?<td colspan={8} className="py-12 text-center">Data not Found</td>:userWiseCategory.map((category, index) => (
              <tr key={category._id}>
                <th>{index + 1}</th>
                <td>{category.categoryName}</td>
                <td>{category.categoryMode}</td>
                <td className="flex justify-center gap-2">
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                    className="bg-blue-700 p-2"
                  >
                    <FaEdit
                      onClick={() => catUpdateModal(category._id)}
                      className="text-white text-lg"
                    />
                  </button>
                  <button className="bg-red-700 p-2">
                    <MdDelete
                      onClick={() =>
                        catDelHandler(category._id, category.categoryName)
                      }
                      className="text-white text-lg"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CategoryUpdateModal
        updateCategory={updateCategory}
      ></CategoryUpdateModal>
    </div>
  );
};

export default CategoryAdd;
