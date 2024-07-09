import React from "react";
import { useLoaderData } from "react-router-dom";
const DueBillDetails = () => {
  const billDetails = useLoaderData();
  const {
    _id,
    subTotal,
    dueAmount,
    creaditDays,
    coampanyVoucher,
    purchaseDate,
    purchaseType,
    billsubmiteDate,
    items,
    ProjectOrderNumber,
    advancePaymentMoneyR,
    foundationMoneyR,
    donataionAmount,
    advancePayment,
    billReceiveDate,
    receiverName,
    billpaidDate,
    billStatus,
  } = billDetails;
  return (
    <div className="mt-20">
      <div className="mb-3">
        <h3 className="text-2xl font-bold">Voucher Information</h3>
      </div>
      <div>
        <div className="flex flex-row gap-1 justify-between">
         <div className="flex flex-col gap-1">
         <span className="text-sm">
            <span className="font-bold">Voucher Number</span>: {_id}
          </span> 
          <span className="text-sm">
            <span className="font-bold">Purchase For</span>: {coampanyVoucher}
          </span>
          <span className="text-sm">
            <span className="font-bold">Bill Submit Date:</span>{" "}
            {billsubmiteDate}
          </span>
          <span className="text-sm">
            <span className="font-bold">Purchase Date</span> {purchaseDate}
          </span>
          <span className="text-sm">
            <span className="font-bold">Purchase Type</span>: {purchaseType}
          </span>
          <span className="text-sm">
            <span className="font-bold">Bill Status</span>: {billStatus}
          </span>
          
         </div>
         <div className="flex flex-col gap-1">
         <span className="text-sm">
            <span className="font-bold">Creadit Duration</span>: {creaditDays}
          </span>
          <span className="text-sm">
            <span className="font-bold">Project Order Number:</span>{" "}
            {ProjectOrderNumber}
          </span>
          <span className="text-sm">
            <span className="font-bold">Advance Paymet Money Receipt</span>: {advancePaymentMoneyR}
          </span>
          <span className="text-sm">
            <span className="font-bold">
              SIMEC Foundation Money Receipt Number
            </span>
            : {foundationMoneyR}
          </span>
          <span className="text-sm">
            <span className="font-bold">Bill Received Date</span>: {billReceiveDate?billReceiveDate:'Pending'}
          </span>
          <span className="text-sm">
            <span className="font-bold">Bill Receiver Name</span>: {receiverName?receiverName:'Pending'}
          </span>
          <span className="text-sm">
            <span className="font-bold">Bill Paid Date</span>: {billpaidDate?billpaidDate:'Pending'}
          </span>
         </div>
        </div>
        <div>
          <div className="mt-5">
            <h3 className="text-2xl font-bold">Items List</h3>
          </div>
          <table class="table table-xs mx-auto border mt-3">
            <thead className="sticky text-center top-0">
              <tr>
                <th className="border border-slate-400">SL No.</th>
                <th className="border border-slate-400">Item name</th>
                <th className="border border-slate-400">Brand Name</th>
                <th className="border border-slate-400">Serial Number</th>
                <th className="border border-slate-400">Item Warranty</th>
                <th className="border border-slate-400"> Quantity</th>
                <th className="border border-slate-400">Unit</th>
                <th className="border border-slate-400">Unit Price </th>
                <th className="border border-slate-400">Total Price </th>
              </tr>
            </thead>
            <tbody className="text-center table-xs overflow-y-auto">
              {items?.map((item, index) => (
                <tr key={index}>
                  <td className="border border-slate-400">{index + 1}</td>
                  <td className="border border-slate-400">
                    {item.selectedItem}
                  </td>
                  <td className="border border-slate-400">{item.itemBrand}</td>
                  <td className="border border-slate-400">
                    {item.itemSerialNumber}
                  </td>
                  <td className="border border-slate-400">
                    {item.itemWarrantyPeriod}
                  </td>
                  <td className="border border-slate-400">
                    {item.itemQuantity}
                  </td>
                  <td className="border border-slate-400">{item.itemUnit}</td>
                  <td className="border border-slate-400">
                    {item.unitPrice} Tk.
                  </td>
                  <td className="border border-slate-400">
                    {item.totalPrice} Tk.
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col text-xs text-right font-bold mt-3">
            <span>Sub Total: {subTotal} Tk</span>
            <span>
              Donation Amount: {donataionAmount?donataionAmount:'0.00'} Tk.
            </span>
            <span>Advanced Amount: {advancePayment?advancePayment:'0.00'} Tk.</span>
            <span>Due Amount: {dueAmount?dueAmount:subTotal} Tk.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueBillDetails;
