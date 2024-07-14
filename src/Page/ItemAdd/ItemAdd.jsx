import React, { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import useItemHook from "../../Hook/ItemHook/useItemHook";
import ItemUpdateModal from "../../Components/ItemUpdateModal/ItemUpdateModal";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const ItemAdd = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [updateItem, setUpadateItem] = useState();
  const [selectMode, setselectMode] = useState("");
  const [selectItemType, setselectItemType] = useState("");
  const [itemData, refetch] = useItemHook();
  console.log(itemData);
  const itemAddHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const itemName = form.itemName.value;
    const itemMode = selectMode;
    const itemType = selectItemType;
    const item = {
      itemName: itemName,
      itemType: itemType,
      itemMode: itemMode,
      userEmail: user?.email,
    };
    const existingItem = itemData.find(
      (item) => item.itemName.toLowerCase() === itemName.toLowerCase()
    );
    if (existingItem) {
      Swal.fire({
        title: "Wrong",
        text: `${itemName} already add your database`,
        icon: "error",
      });
    } else {
      axiosPublic.post("api/item", item).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Congratulation",
            text: `${itemName} add successfully`,
            icon: "success",
          });
          refetch();
          form.reset();
        }
      });
    }
  };

  const itemDelHandler = (id, itemName) => {
    console.log(id);
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
        axiosPublic.delete(`api/item/${id}`).then((res) => {
          if (res.data.deletedCount == 1) {
            Swal.fire({
              title: "Congratulation",
              text: ` ${itemName}Delete successfully`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const itemUpdateModal = (id) => {
    const findDataForUpdate = itemData.find((item) => item._id === id);
    setUpadateItem(findDataForUpdate);
  };

  return (
    <div className="pt-20 ">
      <form onSubmit={itemAddHandler}>
        <div>
          <h3 className="text-2xl font-bold mb-8">Add Item</h3>
        </div>
        <div className="grid grid-cols-3 place-content-center gap-2">
          <div>
            <input
              required
              type="text"
              name="itemName"
              placeholder="Type Item Name"
              className="input input-bordered w-full max-w-sm"
            />
          </div>
          <div className="">
            <select
              required
              onChange={(e) => setselectItemType(e.target.value)}
              className="select select-bordered w-full max-w-sm"
            >
              <option disabled selected>
                Select Item Type
              </option>
              <option>Consimable Goods</option>
              <option>Stationay Items</option>
              <option>Current Asset</option>
              <option>Fixed Asset</option>
              <option>Electrical Items</option>
              <option>Electronics Items</option>
              <option>Machineries Items</option>
              <option>Meterail Items</option>
              <option>Others</option>
            </select>
          </div>
          <div>
            <select
              required
              onChange={(e) => setselectMode(e.target.value)}
              className="select select-bordered w-full max-w-sm"
            >
              <option disabled selected>
                Select Mode
              </option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success text-white">
            Add Item
          </button>
        </div>
      </form>
      <div className="mt-12 ">
        <h3 className="text-right font-bold text-sm">
          Total Item:{itemData.length}
        </h3>
      </div>
      <div className="my-12">
        <table class="table table-xs text-center">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Item Name</th>
              <th>Item Type</th>
              <th>Mode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {itemData.length === 0 ? (
              <td colspan={8} className="py-12 text-center">
                Data not Found
              </td>
            ) : (
              itemData.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.itemName}</td>
                  <td>{item.itemType}</td>
                  <td>{item.itemMode}</td>
                  <td className="flex justify-center gap-2">
                    <button
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                      className="bg-blue-700 p-2"
                    >
                      <FaEdit
                        onClick={() => itemUpdateModal(item._id)}
                        className="text-white text-lg"
                      />
                    </button>
                    <button className="bg-red-700 p-2">
                      <MdDelete
                        onClick={() => itemDelHandler(item._id, item.itemName)}
                        className="text-white text-lg"
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ItemUpdateModal updateItem={updateItem}></ItemUpdateModal>
    </div>
  );
};

export default ItemAdd;
