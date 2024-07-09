import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { Link, useLoaderData } from "react-router-dom";
import useDueBillHook from "../../Hook/DueBillHook/useDueBillHook";
const DueBillView = () => {
  const supplierInfo = useLoaderData();
  const [dueBillData] = useDueBillHook();
  const [billSearch, setBillSearch] = useState("");
  console.log(billSearch);
  const supplierWiseFilterData = dueBillData.filter(
    (bill) => bill.supplierId === supplierInfo._id
  );
  const FilterDatabyBill = supplierWiseFilterData.filter(
    (bill) =>
      bill._id.toLowerCase().includes(billSearch.toLowerCase()) ||
      bill.billNumber.toLowerCase().includes(billSearch.toLowerCase())
  );
  console.log(FilterDatabyBill);
  return (
    <div className="mt-20">
      <div className="fixed top-20">
        <h3 className="text-2xl font-bold mb-4">Due Bill View</h3>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">
            Supplier-Name: {supplierInfo.supplierName}
          </h3>
          <h3 className="text-sm font-semibold">
            Supplier-Id: {supplierInfo._id}
          </h3>
          <h3 className="text-sm font-semibold">
            Supplier-Phone Number: {supplierInfo.supplierPhoneNumber}
          </h3>
          <h3 className="text-sm font-semibold">
            Supplier-Address: {supplierInfo.supplierAddress}
          </h3>
        </div>
      </div>
      <div>
        <div className="text-right mb-4 fixed top-64 right-6">
          <input
            type="text"
            onChange={(e) => setBillSearch(e.target.value)}
            className="w-72 p-2 h-10 rounded-lg border-2 border-red-700 text-xs"
            placeholder="Seach by Invoice Number or Voucher Number"
          />
        </div>
       <div className="overflow-x-auto mt-80">
       <table class="table table-xs border">
          <thead className="sticky text-center top-0">
            <tr>
              <th className="border border-slate-400">SL No.</th>
              <th className="border border-slate-400">Bill Submit Date</th>
              <th className="border border-slate-400">Voucher Number</th>
              <th className="border border-slate-400">Invoice Number</th>
              <th className="border border-slate-400">PO Number</th>
              <th className="border border-slate-400">Sub Total</th>
              <th className="border border-slate-400">Total Due</th>
              <th className="border border-slate-400"> Status</th>
              <th className="border border-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="text-center table-xs ">
            {FilterDatabyBill.length === 0 ? (
              <td colspan={8} className="py-12">
                Data not Found
              </td>
            ) : (
              FilterDatabyBill?.map((bill, index) => (
                <tr key={bill._id}>
                  <td className="border border-slate-400">{index + 1}</td>
                  <td className="border border-slate-400">{bill.billsubmiteDate}</td>
                  <td className="border border-slate-400">{bill._id}</td>
                  <td className="border border-slate-400">{bill.billNumber}</td>
                  <td className="border border-slate-400">
                    {bill.ProjectOrderNumber}
                  </td>
                  <td className="border border-slate-400">
                    {bill.subTotal} TK
                  </td>
                  <td className="border border-slate-400">
                    {bill.dueAmount ? bill.dueAmount : bill.subTotal} TK
                  </td>
                  <td className="border border-slate-400">{bill.billStatus}</td>
               
                  <td className="border border-slate-400">
                    <div className="flex gap-2 justify-center">
                      <Link to={`/due-bill-details/${bill._id}`}>
                        <button className="bg-blue-900 p-2">
                          <TbListDetails className="text-white text-sm" />
                        </button>
                      </Link>
                      <button className="bg-blue-700 p-2">
                        <FaEdit className="text-white text-sm" />
                      </button>
                      <button className="bg-red-700 p-2">
                        <MdDelete className="text-white text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
       </div>
      </div>
    </div>
  );
};

export default DueBillView;
