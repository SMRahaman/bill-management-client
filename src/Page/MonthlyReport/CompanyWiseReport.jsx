import React, { useContext, useEffect, useState } from "react";
import useDueBillHook from "../../Hook/DueBillHook/useDueBillHook";
import useCategoryHook from "../../Hook/CategoryHook/useCategoryHook";
import DataTable from "../DataTable/DataTable";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
const CompanyWiseReport = () => {
  const { user } = useContext(AuthContext);
  const [catData] = useCategoryHook();
  const [dueBillData] = useDueBillHook();
  const [reportType, setSelectReportType] = useState("");
  const [filterReport, setFilterReport] = useState([]);
  const searcBill = (e) => {
    e.preventDefault();
    const comapnyWiseFilterData = dueBillData.filter(
      (bill) =>
        bill.userEmail === user?.email &&
        bill.coampanyVoucher.toLowerCase() === reportType.toLowerCase()
    );
    if (comapnyWiseFilterData.length > 0) {
      setFilterReport(comapnyWiseFilterData);
    } else {
      alert("Data not found");
    }
  };

  return (
    <div className="mt-20">
      <h3 className="font-bold text-2xl">Company Wise Report</h3>
      <form>
        <div className="mt-5 grid grid-cols-1 ">
          <div className="flex flex-col gap-2">
            <span className="text-xs">Select Comapany Name</span>
            <select
              required
              onChange={(e) => setSelectReportType(e.target.value)}
              className="select select-bordered w-full "
            >
              <option>Select Company Name</option>
              {catData.map(
                (cat) =>
                  cat.categoryMode === "Active" && (
                    <option key={cat._id}>{cat.categoryName}</option>
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
      {filterReport.length > 0 && (
        <DataTable filterReport={filterReport}></DataTable>
      )}
    </div>
  );
};

export default CompanyWiseReport;
