import React, { useState } from "react";
import useCategoryHook from "../../Hook/CategoryHook/useCategoryHook";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hook/useAxiosPublic";


const CategoryUpdateModal = ({ updateCategory }) => {
  const axiosPublic = useAxiosPublic();
  console.log(updateCategory);
  // const{_id,categoryMode,categoryName}=updateCategory
  const [updateCatMode, setCatUpdateMode] = useState(
    updateCategory?.categoryMode
  );
  console.log(updateCatMode);
  const [categoryData, refetch, isLoding] = useCategoryHook();
  const CatUpdateHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryName = form.catName.value;
    const categoryMode = updateCatMode;
    const category = { categoryName: categoryName, categoryMode: categoryMode };

    axiosPublic
      .put(`api/category/${updateCategory?._id}`, category)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Congratulation",
            text: `Update successfully`,
            icon: "success",
          });
          refetch();
          form.reset();
        }
      });
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={CatUpdateHandler}>
            <div>
              <h3 className="text-2xl font-bold mb-8">
                Update Comapny (Voucher type wise)
              </h3>
            </div>
            <div>
              <input
                required
                defaultValue={updateCategory?.categoryName}
                type="text"
                name="catName"
                placeholder="Type Company Name"
                className="input input-bordered w-full max-w-sm"
              />
            </div>
            <div className="mt-5">
              <select
                required
                value={
                  updateCatMode ? updateCatMode : updateCategory?.categoryMode
                }
                onChange={(e) => setCatUpdateMode(e.target.value)}
                className="select select-bordered w-full max-w-sm"
              >
                <option>
                  {updateCatMode ? updateCatMode : updateCategory?.categoryMode}
                </option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="mt-5">
              <button type="submit" className="btn btn-success text-white ">
                Update Category
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CategoryUpdateModal;
