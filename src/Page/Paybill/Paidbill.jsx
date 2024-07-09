import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Components/AuthProvider/AuthProvider';
import useDueBillHook from '../../Hook/DueBillHook/useDueBillHook';
const Paidbill = () => {
    const {user}=useContext(AuthContext);
    const[billSearch,setBillSearch]=useState('');
    const[dueBillData]=useDueBillHook();
    const paidBillFilter=dueBillData.filter(bill=>bill.billStatus==='Paid by cash'|| bill.billStatus==='Paid by bank');
    const FilterDatabyBill = paidBillFilter.filter(
      (bill) =>
        bill._id.toLowerCase().includes(billSearch.toLowerCase()) ||
        bill.supplierName.toLowerCase().includes(billSearch.toLowerCase())
    );
  
    return (
        <div className="mt-20">
        <h3 className="font-bold text-2xl">Pay Bill by {user?.displayName}</h3>
        <div className="text-right right-6">
          <input
            type="text"
            onChange={(e) => setBillSearch(e.target.value)}
            className="w-72 p-2 h-10 rounded-lg border-2 border-red-700 text-xs"
            placeholder="Seach by Invoice Number or Supplier Name"
          />
        </div>
        <div className="overflow-x-auto py-5">
          <table class="table text-center table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th className="border border-slate-400">SL No.</th>
                <th className="border border-slate-400">Receiver Name</th>
                <th className="border border-slate-400">Bill Received Date</th>
                <th className="border border-slate-400">Supplier Name</th>
                <th className="border border-slate-400">Creadit Duration</th>
                <th className="border border-slate-400">Company Name</th>
                <th className="border border-slate-400">Submited Name</th>
                <th className="border border-slate-400">Voucher Number</th>
                <th className="border border-slate-400">Sub Total</th>
                <th className="border border-slate-400">Total Due</th>
                <th className="border border-slate-400">Bill Status</th>
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
                    <td className="border border-slate-400">
                      {bill.receiverName}
                    </td>
                    <td className="border border-slate-400">
                      {bill.billReceiveDate}
                    </td>
                    <td className="border border-slate-400">
                      {bill.supplierName}
                    </td>
                    <td className="border border-slate-400">
                      {bill.creaditDays}
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
                      {bill.dueAmount ? bill.dueAmount : bill.subTotal} TK
                    </td>
                    <td className="border border-slate-400">
                      {bill.billStatus}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
    </div>
    );
};

export default Paidbill;