import React, { useContext, useEffect, useState } from "react";
import useDueBillHook from "../../Hook/DueBillHook/useDueBillHook";
import axios from "axios";
import DataTable from "../DataTable/DataTable";
import useCategoryHook from "../../Hook/CategoryHook/useCategoryHook";
import userUserHook from "../../Hook/UserHook/userUserHook";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hook/useAxiosPublic";
const MonthlyReportByBillStatus = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [catData] = useCategoryHook();
  const [selectStartDate, setSeletStartDate] = useState("");
  const [selectEndDate, setSelectEndDate] = useState("");
  const [reportType, setSelectReportType] = useState("");
  const [company, setSelectCompany] = useState("");
  const [filterReport, setFilterReport] = useState([]);
  const [, refetch] = useDueBillHook();
  const searcBill = (e) => {
    e.preventDefault();
    console.log(selectStartDate, selectEndDate, reportType);
    axiosPublic
      .get(
        `api/monthly-report-billStatus?fromDate=${selectStartDate}&toDate=${selectEndDate}&report=${reportType}&company=${company}&email=${user?.email}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.length == 0) {
          alert("Data not found");
        } else {
          setFilterReport(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-20">
      <h3 className="font-bold text-2xl">Bill Status Wise Report</h3>
      <form>
        <div className="mt-5 grid grid-cols-4 gap-2">
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
            <span className="text-xs">Select Company</span>
            <select
              required
              onChange={(e) => setSelectCompany(e.target.value)}
              className="select select-bordered w-full max-w-xs"
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
          <div className="flex flex-col gap-2">
            <span className="text-xs">Report Type</span>
            <select
              required
              onChange={(e) => setSelectReportType(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option>Select Report Type</option>
              <option>Pending</option>
              <option>Received</option>
              <option>Paid by cash</option>
              <option>Paid by bank</option>
            </select>
          </div>
          {/* <div className="flex flex-col gap-2">
            <span className="text-xs">User</span>
            <input
              className=" input input-bordered w-full max-w-xs"
              defaultValue={user?.email}
              type="text"
            />
          </div> */}
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
        <DataTable
          filterReport={filterReport}
          reportType={reportType}
        ></DataTable>
      )}
    </div>
  );
};

export default MonthlyReportByBillStatus;
