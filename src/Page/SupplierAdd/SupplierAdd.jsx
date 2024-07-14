import axios from "axios";
import React, { useContext, useState } from "react";
import useSupplierHook from "../../Hook/SupplierHook/useSupplierHook";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiTwotoneFileAdd } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import SupplierUpdateModal from "../../Components/SupplierUpdateModal/SupplierUpdateModal";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hook/useAxiosPublic";
const SupplierAdd = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [updateSupplier, setUpdateSupplier] = useState();
  const [selectCreaditDuration, setSelectCreaditDuration] = useState();
  const [selectMode, setSelectMode] = useState("");
  const [search, setSearch] = useState("");
  const [supplierData, refetch] = useSupplierHook();
  console.log(supplierData);
  const supplierAddHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const supplierName = form.supplierName.value;
    const supplierPhoneNumber = form.supplierPhoneNumber.value;
    const supplierAddress = form.supplierAddress.value;
    const creaditDuration = selectCreaditDuration;
    const supplierMode = selectMode;
    const supplierInfo = {
      supplierName: supplierName,
      supplierPhoneNumber: supplierPhoneNumber,
      supplierAddress: supplierAddress,
      creaditDuration: creaditDuration,
      supplierMode: supplierMode,
      userEmail: user?.email,
    };
    const existingSupplier = supplierData.find(
      (supplier) => supplier.supplierName === supplierName
    );
    if (existingSupplier) {
      Swal.fire({
        title: "Wrong",
        text: `${supplierName} already add your database`,
        icon: "error",
      });
      form.reset();
    } else {
      axiosPublic.post("api/supplierInfo", supplierInfo).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Congratulation",
            text: `${supplierName} add successfully`,
            icon: "success",
          });
          refetch();
          form.reset();
        }
      });
    }
  };

  const supplierDelHandler = (id, supplierName) => {
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
        axiosPublic.delete(`api/supplierInfo/${id}`).then((res) => {
          if (res.data.deletedCount == 1) {
            Swal.fire({
              title: "Congratulation",
              text: ` ${supplierName}Delete successfully`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const userwiseSupplier = supplierData.filter(
    (supplier) => supplier.userEmail === user?.email
  );

  const supplierUpdateModal = (id) => {
    const findDataForUpdate = supplierData.find(
      (supplier) => supplier._id === id
    );
    setUpdateSupplier(findDataForUpdate);
  };

  const filterSupplier = userwiseSupplier.filter(
    (supplier) =>
      supplier.supplierName.toLowerCase().includes(search.toLowerCase()) ||
      supplier.supplierPhoneNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-20 ">
      <form onSubmit={supplierAddHandler}>
        <div>
          <h3 className="text-2xl font-bold mb-8">Add Supplier Information</h3>
        </div>
        <div className="flex gap-5">
          <input
            required
            type="text"
            name="supplierName"
            placeholder="Type Supplier Company Name"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            required
            type="text"
            name="supplierPhoneNumber"
            placeholder="Type Supplier Phone Number"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            required
            type="text"
            name="supplierAddress"
            placeholder="Type Supplier Address"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mt-5 flex gap-5">
          <select
            required
            onChange={(e) => setSelectCreaditDuration(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Select creadit duration
            </option>
            <option>7</option>
            <option>15</option>
            <option>30</option>
            <option>60</option>
            <option>90</option>
            <option>0</option>
          </select>
          <select
            required
            onChange={(e) => setSelectMode(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Select Mode
            </option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success text-white">
            Add Supplier
          </button>
        </div>
      </form>
      <div className="mt-8">
        <h3 className="text-right font-bold text-sm">
          Total Supplier:{userwiseSupplier.length}
        </h3>
        <div className="text-right my-5">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 p-2 h-10 rounded-lg border-2 border-red-700 text-xs"
            placeholder="Seach by phone number or Supplier name"
          />
        </div>
      </div>
      <div className="">
        <table class="table table-xs text-center">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Supplier Company Name</th>
              <th> Supplier Phone Number</th>
              <th>Supplier Address</th>
              <th>Creadit Duration</th>
              <th>Mode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterSupplier.length === 0 ? (
              <td colspan={8} className="py-12 text-center">
                Data not Found
              </td>
            ) : (
              filterSupplier?.map((supplier, index) => (
                <tr key={supplier._id}>
                  <th>{index + 1}</th>
                  <td>{supplier.supplierName}</td>
                  <td>{supplier.supplierPhoneNumber}</td>
                  <td>{supplier.supplierAddress}</td>
                  <td>{supplier.creaditDuration} Days</td>
                  <td>{supplier.supplierMode}</td>
                  <td className="flex justify-center gap-2">
                    <Link
                      to={`/due-bill-add/${supplier._id}`}
                      className="bg-green-700 p-2"
                    >
                      <AiTwotoneFileAdd className="text-white text-sm" />
                    </Link>
                    <Link
                      to={`/due-bill-view/${supplier._id}`}
                      className="bg-red-700 p-2"
                    >
                      <FaEye className="text-white text-sm" />
                    </Link>
                    <button
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                      className="bg-blue-700 p-2"
                    >
                      <FaEdit
                        onClick={() => supplierUpdateModal(supplier._id)}
                        className="text-white text-sm"
                      />
                    </button>
                    <button className="bg-red-700 p-2">
                      <MdDelete
                        onClick={() =>
                          supplierDelHandler(
                            supplier._id,
                            supplier.supplierName
                          )
                        }
                        className="text-white text-sm"
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <SupplierUpdateModal
        updateSupplier={updateSupplier}
      ></SupplierUpdateModal>
    </div>
  );
};

export default SupplierAdd;
