import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useSupplierHook from "../../Hook/SupplierHook/useSupplierHook";

const supplierUpdateModal = ({ updateSupplier }) => {
  const axiosPublic = useAxiosPublic();
  const [updateCreaditDuration, setUpdateCreaditDuration] = useState(
    updateSupplier?.creaditDuration
  );
  const [updateMode, setUpdateMode] = useState(updateSupplier?.supplierMode);
  const [, refetch] = useSupplierHook();
  const supplierUpdateHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const supplierName = form.supplierName.value;
    const supplierPhoneNumber = form.supplierPhoneNumber.value;
    const supplierAddress = form.supplierAddress.value;
    const creaditDuration = updateCreaditDuration;
    const supplierMode = updateMode;
    const supplierInfo = {
      supplierName: supplierName,
      supplierPhoneNumber: supplierPhoneNumber,
      supplierAddress: supplierAddress,
      creaditDuration: creaditDuration,
      supplierMode: supplierMode,
    };
    axiosPublic
      .put(`api/supplierInfo/${updateSupplier?._id}`, supplierInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Congratulation",
            text: `${supplierName} update successfully`,
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
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={supplierUpdateHandler}>
            <div>
              <h3 className="text-2xl font-bold mb-8">
                Update Supplier Information
              </h3>
            </div>
            <div className="flex gap-5">
              <input
                required
                defaultValue={updateSupplier?.supplierName}
                type="text"
                name="supplierName"
                placeholder="Type Supplier Company Name"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                required
                defaultValue={updateSupplier?.supplierPhoneNumber}
                type="text"
                name="supplierPhoneNumber"
                placeholder="Type Supplier Phone Number"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                required
                defaultValue={updateSupplier?.supplierAddress}
                type="text"
                name="supplierAddress"
                placeholder="Type Supplier Address"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="mt-5 flex gap-5">
              <select
                value={
                  updateCreaditDuration
                    ? updateCreaditDuration
                    : updateSupplier?.creaditDuration
                }
                required
                onChange={(e) => setUpdateCreaditDuration(e.target.value)}
                className="select select-bordered w-full max-w-xs"
              >
                <option>7 days</option>
                <option>15 days</option>
                <option>30 days</option>
                <option>60 days</option>
                <option>90 days</option>
                <option>No creadit</option>
              </select>
              <select
                value={updateMode ? updateMode : updateSupplier?.supplierMode}
                required
                onChange={(e) => setUpdateMode(e.target.value)}
                className="select select-bordered w-full max-w-xs"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="mt-5">
              <button type="submit" className="btn btn-success text-white">
                Update Supplier
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default supplierUpdateModal;
