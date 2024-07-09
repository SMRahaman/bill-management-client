import React, { useContext, useEffect, useState } from "react";
import useDueBillHook from "../../Hook/DueBillHook/useDueBillHook";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import useSupplierHook from "../../Hook/SupplierHook/useSupplierHook";
import DataTable from "../DataTable/DataTable";
const SupplierWiseReport = () => {
  const { user } = useContext(AuthContext);
  const [supplierData] = useSupplierHook();
  const [dueBillData] = useDueBillHook();
  const [reportType, setSelectReportType] = useState("");
  const [filterReport, setFilterReport] = useState([]);
  const userWiseSupplier = supplierData.filter(
    (supplier) => supplier.userEmail === user?.email
  );
  const searcBill = (e) => {
    e.preventDefault();
    const supplierWiseFilterData = dueBillData.filter(
      (bill) => bill.supplierName === reportType
    );
    console.log(supplierWiseFilterData);
    if (supplierWiseFilterData.length > 0) {
      setFilterReport(supplierWiseFilterData);
    } else {
      alert("Data not found");
    }
  };

  return (
    <div className="mt-20">
      <h3 className="font-bold text-2xl">Supplier Wise Report</h3>
      <form>
        <div className="mt-5 grid grid-cols-1 ">
          <div className="flex flex-col gap-2">
            <span className="text-xs">Select Supplier Name</span>
            <select
              required
              onChange={(e) => setSelectReportType(e.target.value)}
              className="select select-bordered w-full "
            >
              <option>Select Item Name</option>
              {userWiseSupplier.map(
                (supplier) =>
                  supplier.supplierMode === "Active" && (
                    <option key={supplier._id}>{supplier.supplierName}</option>
                  )
              )}
            </select>
          </div>
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={searcBill}
            className="bg-green-700 rounded text-white  w-[50%] h-[40px]"
          >
            Search Bill
          </button>
        </div>
      </form>
      {
      filterReport.length>0 && (
        <DataTable filterReport={filterReport} reportType={reportType}></DataTable>   
      )
     }
    </div>
  );
};

export default SupplierWiseReport;
