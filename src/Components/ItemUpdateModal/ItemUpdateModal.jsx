import React, { useState } from "react";
import useItemHook from "../../Hook/ItemHook/useItemHook";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const ItemUpdateModal = ({ updateItem }) => {
  const axiosPublic = useAxiosPublic();
  const [updateItemType, setUpdateItemType] = useState(updateItem?.itemType);
  const [updateItemMode, setUpdateItemMode] = useState(updateItem?.itemMode);
  console.log(updateItemMode, updateItemType);
  const [itemData, refetch, isLoding] = useItemHook();
  const itemUpdateHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const updateItemName = form.itemName.value;
    const updateitemtype = updateItemType;
    const updateitemmode = updateItemMode;
    const item = {
      itemName: updateItemName,
      itemType: updateitemtype,
      itemMode: updateitemmode,
    };

    axiosPublic.put(`api/item/${updateItem._id}`, item).then((res) => {
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
          <form onSubmit={itemUpdateHandler}>
            <div>
              <h3 className="text-2xl font-bold mb-8">Update Item</h3>
            </div>
            <div>
              <input
                required
                defaultValue={updateItem?.itemName}
                type="text"
                name="itemName"
                placeholder="Type Item Name"
                className="input input-bordered w-full max-w-sm"
              />
            </div>
            <div className="mt-5">
              <select
                required
                value={updateItemType ? updateItemType : updateItem?.itemType}
                onChange={(e) => setUpdateItemType(e.target.value)}
                className="select select-bordered w-full max-w-sm"
              >
                <option>{updateItem?.itemType}</option>
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
            <div className="mt-5">
              <select
                required
                value={updateItemMode ? updateItemMode : updateItem?.itemMode}
                onChange={(e) => setUpdateItemMode(e.target.value)}
                className="select select-bordered w-full max-w-sm"
              >
                <option>{updateItem?.itemMode}</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="mt-5">
              <button type="submit" className="btn btn-success text-white ">
                Update Item
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ItemUpdateModal;
