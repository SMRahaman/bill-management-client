import React from 'react';
import { TbListDetails } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf'
// import autoTable from 'jspdf-autotable'
import useDueBillHook from '../../Hook/DueBillHook/useDueBillHook';
import autoTable from 'jspdf-autotable';
const DataTable = ({filterReport,reportType}) => {
  const doc = new jsPDF({
    orientation:"landscape"
  })

  const pdfHandler=()=>{
   autoTable(doc,{html:'#data-table',styles:{fontSize:6,halign:'center'},theme:'grid',margin:{top:20},addPageContent: function(data) {
    doc.text(`SIMEC Group ${reportType} Bill Report`, 100, 10);
  }});
  
   doc.save('data.pdf')
  }

  const totalAmount=filterReport.reduce((acc,currentValue)=>acc+currentValue.subTotal,0)
  console.log(totalAmount);

    return (
        <div>
          <div className='my-3 '>
            <button onClick={pdfHandler} className='btn btn-primary'>Export PDF</button>
          </div>
        <div>
        <table class="table border text-[10px] my-5" id='data-table' >
        <thead className="text-[10px] text-center">
          <tr>
            <th className="border border-slate-400">SL No.</th>
            <th className="border border-slate-400">Submit Date</th>
            <th className="border border-slate-400">Sup Name</th>
            <th className="border border-slate-400">Company Name</th>
            <th className="border border-slate-400">Submited Name</th>
            <th className="border border-slate-400">Voucher Num</th>
            <th className="border border-slate-400">Cre.Duration</th>
            <th className="border border-slate-400">Total</th>
            <th className="border border-slate-400">Due</th>
            <th className="border border-slate-400">Status</th>
            <th className="border border-slate-400">Action</th>
          </tr>
        </thead>
        <tbody className="text-center table-xs ">
            {filterReport?.length === 0 ? (
              <td colspan={8} className="py-12">
                Data not Found
              </td>
            ) : (
              filterReport?.map((bill, index) => (
                <tr key={bill?._id}>
                <td className="border border-slate-400">{index + 1}</td>
                <td className="border border-slate-400">
                  {bill?.billsubmiteDate}
                </td>
                <td className="border border-slate-400">
                  {bill?.supplierName}
                </td>
                <td className="border border-slate-400">
                  {bill?.coampanyVoucher}
                </td>
                <td className="border border-slate-400">{bill?.userName}</td>
                <td className="border border-slate-400">{bill?._id}</td>
                <td className="border border-slate-400">{bill?.creaditDays}</td>
                <td className="border border-slate-400">
                  {bill?.subTotal} TK
                </td>
                <td className="border border-slate-400">
                  {bill?.dueAmount ? bill?.dueAmount : bill?.subTotal} TK
                </td>
                <td className="border border-slate-400">{bill?.billStatus}</td>
                <td className="border border-slate-400">
                  <div className="flex gap-2 justify-center">
                    <Link to={`/due-bill-details/${bill?._id}`}>
                      <button className="bg-blue-900 p-2">
                        <TbListDetails className="text-white text-sm" />
                      </button>
                    </Link>
                  </div>
             
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
        <div className='text-right mt-0'>
          <span>Total:{totalAmount}</span>
        </div>
          </div>
        </div>        
      
    );
};

export default DataTable;