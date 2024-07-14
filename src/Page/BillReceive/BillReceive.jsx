import React, { useContext, useEffect, useState } from "react";
import useDueBillHook from "../../Hook/DueBillHook/useDueBillHook";
import userUserHook from "../../Hook/UserHook/userUserHook";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import axios from "axios";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useCategoryHook from "../../Hook/CategoryHook/useCategoryHook";
import moment from "moment";
import useAxiosPublic from "../../Hook/useAxiosPublic";
const BillReceive = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [selectUser, setSelectUser] = useState("");
  const [selectDate, setSeletDate] = useState("");
  const [selectVoucher, setSelectVoucher] = useState("");
  const [filterDueBills, setFilterDuesBill] = useState([]);
  console.log(filterDueBills);
  const [dueBillData, refetch, isLoading] = useDueBillHook();
  const [categoryData] = useCategoryHook();
  const [userData] = userUserHook();
  const billReceiveDate = moment().format("YYYY-MM-DD");
  const searchDueBill = (e) => {
    e.preventDefault();
    const filterDueBill = dueBillData.filter(
      (bill) =>
        (bill.userName === selectUser &&
          bill.billsubmiteDate === selectDate &&
          bill.billStatus === "Pending") ||
        (bill.coampanyVoucher === selectVoucher &&
          bill.billStatus === "Pending")
    );

    setFilterDuesBill(filterDueBill);
  };
  const dueBillReceive = (id) => {
    console.log(id);
    axiosPublic
      .patch(`api/due-bill/${id}`, {
        billStatus: "Received",
        billReceiveDate: billReceiveDate,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Thank You",
            text: `Bill Receive Successfully`,
            icon: "success",
          });
          refetch();
        }
      });
  };
  return (
    <div className="mt-20">
      <h3 className="font-bold text-2xl">Bill Receive by Accounts</h3>
      <form onSubmit={searchDueBill}>
        <div className="mt-5 grid grid-cols-3 gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-xs">
              Select Bill submit date by Logistic user
            </span>
            <input
              type="date"
              placeholder="Select purchase date"
              onChange={(e) => setSeletDate(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs">Submited Name</span>
            <select
              onChange={(e) => setSelectUser(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option>Select Submited Name</option>

              {userData?.map(
                (user) =>
                  user.role === "Logistic-User" && (
                    <option>{user.userName}</option>
                  )
              )}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs">Voucher Name</span>
            <select
              required
              onChange={(e) => setSelectVoucher(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option>Select Voucher Name</option>
              {categoryData?.map(
                (cat) =>
                  cat.categoryMode === "Active" && (
                    <option>{cat.categoryName}</option>
                  )
              )}
            </select>
          </div>
        </div>
        <div className="mt-12 text-center">
          <button className="bg-green-700 rounded text-white  w-[50%] h-[40px]">
            Search due Bill
          </button>
        </div>
      </form>
      {filterDueBills.length == 1 && (
        <div className="overflow-x-auto">
          <table class="table border table-pin-rows table-pin-cols  table-xs mt-5">
            <thead className="sticky text-center top-0">
              <tr>
                <th className="border border-slate-400">SL No.</th>
                <th className="border border-slate-400">Bill Submit Date</th>
                <th className="border border-slate-400">Supplier Name</th>
                <th className="border border-slate-400">Company Name</th>
                <th className="border border-slate-400">Submited Name</th>
                <th className="border border-slate-400">Voucher Number</th>
                <th className="border border-slate-400">Sub Total</th>
                <th className="border border-slate-400">Donation</th>
                <th className="border border-slate-400">Advanced</th>
                <th className="border border-slate-400">Total Due</th>
                <th className="border border-slate-400"> Status</th>
                <th className="border border-slate-400">Action</th>
              </tr>
            </thead>
            <tbody className="text-center table-xs ">
              {filterDueBills.length === 0 ? (
                <td colspan={8} className="py-12">
                  Data not Found
                </td>
              ) : (
                filterDueBills?.map((bill, index) => (
                  <tr key={bill._id}>
                    <td className="border border-slate-400">{index + 1}</td>
                    <td className="border border-slate-400">
                      {bill.billsubmiteDate}
                    </td>
                    <td className="border border-slate-400">
                      {bill.supplierName}
                    </td>
                    <td className="border border-slate-400">
                      {bill.coampanyVoucher}
                    </td>
                    <td className="border border-slate-400">{bill.userName}</td>
                    <td className="border border-slate-400">{bill._id}</td>
                    <td className="border border-slate-400">
                      {bill.subTotal} TK
                    </td>
                    <td className="border border-slate-400">
                      {bill.donataionAmount ? bill.donataionAmount : 0} TK
                    </td>
                    <td className="border border-slate-400">
                      {bill.advancePayment ? bill.advancePayment : 0} TK
                    </td>
                    <td className="border border-slate-400">
                      {bill.dueAmount ? bill.dueAmount : bill.subTotal} TK
                    </td>
                    <td className="border border-slate-400">
                      {bill.billStatus}
                    </td>
                    <td className="border border-slate-400">
                      <div className="flex gap-2 justify-center">
                        <Link to={`/due-bill-details/${bill._id}`}>
                          <button className="bg-blue-900 p-2">
                            <TbListDetails className="text-white text-sm" />
                          </button>
                        </Link>

                        {bill.billStatus === "Pending" ? (
                          <button
                            onClick={() => dueBillReceive(bill._id)}
                            className="bg-green-800 text-white p-1 rounded"
                          >
                            Receive
                          </button>
                        ) : (
                          <button className="bg-red-800 text-white p-1 rounded">
                            Received
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default BillReceive;
