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
import useSupplierHook from "../../Hook/SupplierHook/useSupplierHook";
const Paybill = () => {
  const { user } = useContext(AuthContext);
  const [selectStartDate, setSeletStartDate] = useState("");
  const [selectEndDate, setSelectEndDate] = useState("");
  const [selectSupplier, setSelectSupplier] = useState("");
  const [paysystem,setPaySystem]=useState("");
  const [filterReceivesBills, setFilterReceivesBill] = useState([]);
  const [ ,refetch]=useDueBillHook();
  const [supplierData] = useSupplierHook();
  console.log(supplierData);
  const billPaidDate = moment().format("YYYY-MM-DD");
  const searcReceivedBill = (e) => {
    e.preventDefault();
    console.log(selectStartDate, selectEndDate, selectSupplier);
    axios
      .get(
        `https://bill-deposite-server.vercel.app/api/filtered-due-bill?fromDate=${selectStartDate}&toDate=${selectEndDate}&supplier=${selectSupplier}&billStatus='Received'`
      )
      .then((res) => {
        console.log(res.data);
        if(res.data.length==0){
          alert('No Received Bill Found')
        }
        else{
          setFilterReceivesBill(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  const dueBillPay = (id) => {
    console.log(id);
    axios
      .patch(`https://bill-deposite-server.vercel.app/api/due-bill/${id}`, {
        billStatus: paysystem,
        billpaidDate:billPaidDate,
        paidUser:user?.displayName,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Thank You",
            text: `Bill paid Successfully`,
            icon: "success",
          });
          refetch();
        }
       
      });
  };
 
  return (
    <div className="mt-20">
      <h3 className="font-bold text-2xl">Bill Pay by Accounts</h3>
      <form>
        <div className="mt-5 grid grid-cols-3 gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-xs">Select Start Date</span>
            <input
              type="date"
              placeholder="Select purchase date"
              onChange={(e) => setSeletStartDate(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs">Select End Date</span>
            <input
              type="date"
              placeholder="Select purchase date"
              onChange={(e) => setSelectEndDate(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs">Supplier Name</span>
            <select
              required
              onChange={(e) => setSelectSupplier(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option>Select Supplier Name</option>
              {supplierData?.map(
                (supplier) =>
                  supplier.supplierMode === "Active" && (
                    <option>{supplier.supplierName}</option>
                  )
              )}
            </select>
          </div>
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={searcReceivedBill}
            className="bg-green-700 rounded text-white  w-[50%] h-[40px]"
          >
            Search Received Bill
          </button>
        </div>
      </form>

    {
      filterReceivesBills.length<0  && <div className="overflow-x-auto">
      <table class="table border table-pin-rows table-pin-cols  table-xs mt-5">
        <thead className="sticky text-center top-0">
          <tr>
            <th className="border border-slate-400">SL No.</th>
            <th className="border border-slate-400">Bill Submit Date</th>
            <th className="border border-slate-400">Supplier Name</th>
            <th className="border border-slate-400">Company Name</th>
            <th className="border border-slate-400">Submited Name</th>
            <th className="border border-slate-400">Voucher Number</th>
            <th className="border border-slate-400">Creadit Duration</th>
            <th className="border border-slate-400">Sub Total</th>
            <th className="border border-slate-400">Donation</th>
            <th className="border border-slate-400">Advanced</th>
            <th className="border border-slate-400">Total Due</th>
            <th className="border border-slate-400"> Status</th>
            <th className="border border-slate-400"> Receiver Name</th>
            <th className="border border-slate-400">Action</th>
          </tr>
        </thead>
        <tbody className="text-center table-xs ">
          {filterReceivesBills.length === 0 ? (
            <td colspan={8} className="py-12">
              Data not Found
            </td>
          ) : (
            filterReceivesBills?.map((bill, index) => (
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
                <td className="border border-slate-400">{bill.creaditDays}</td>
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
                <td className="border border-slate-400">{bill.billStatus}</td>
                <td className="border border-slate-400">
                  {bill.receiverName}
                </td>
                <td className="border border-slate-400">
                  <div className="flex gap-2 justify-center">
                    <Link to={`/due-bill-details/${bill._id}`}>
                      <button className="bg-blue-900 p-2">
                        <TbListDetails className="text-white text-sm" />
                      </button>
                    </Link>
                 
                  <select
                      onClickCapture={()=>dueBillPay(bill._id)}
                      onClick={(e) => setPaySystem(e.target.value)}
                      className="bg-green-700 text-white"
                    >
                      <option disabled selected>select pay method</option>
                      <option>Paid by cash</option>
                      <option>Paid by bank</option>
                    </select>
                  </div>
             
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    
    }
    </div>
  );
};

export default Paybill;
