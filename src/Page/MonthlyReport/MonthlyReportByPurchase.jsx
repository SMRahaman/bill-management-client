import React, { useContext, useEffect, useState } from "react";
import useDueBillHook from "../../Hook/DueBillHook/useDueBillHook";;
import axios from "axios";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import DataTable from "../DataTable/DataTable";
const MonthlyReportByPurchase = () => {
    const { user } = useContext(AuthContext);
  const [selectStartDate, setSeletStartDate] = useState("");
  const [selectEndDate, setSelectEndDate] = useState("");
  const [reportType, setSelectReportType] = useState("");
  const [filterReport, setFilterReport] = useState([]);
  const [ ,refetch]=useDueBillHook();
  const searcBill = (e) => {
    e.preventDefault();
    console.log(selectStartDate, selectEndDate, reportType);
    axios
      .get(
        `https://bill-deposite-server.vercel.app/api/monthly-report-purchase?fromDate=${selectStartDate}&toDate=${selectEndDate}&report=${reportType}`
      )
      .then((res) => {
        console.log(res.data);
        if(res.data.length==0){
          alert('No Received Bill Found')
        }
        else{
          setFilterReport(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

 
  return (
    <div className="mt-20">
      <h3 className="font-bold text-2xl">Purchase Wise Report</h3>
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
            <span className="text-xs">Report Type</span>
            <select
              required
              onChange={(e) => setSelectReportType(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option>Select Report Type</option>
              <option>Cash</option>
              <option>Creadit</option>
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

export default MonthlyReportByPurchase;