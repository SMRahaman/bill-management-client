import React, { useContext } from 'react';
import useDueBillHook from '../../Hook/DueBillHook/useDueBillHook';
import useCategoryHook from '../../Hook/CategoryHook/useCategoryHook';
import useSupplierHook from '../../Hook/SupplierHook/useSupplierHook';
import userUserHook from '../../Hook/UserHook/userUserHook';
import { AuthContext } from '../../Components/AuthProvider/AuthProvider';
import useItemHook from '../../Hook/ItemHook/useItemHook';

const Dashboard = () => {
    const{user}=useContext(AuthContext);
    const [dueBillData]=useDueBillHook();
    const[ItemData]=useItemHook();
    const[catData]=useCategoryHook();
    const[supplierData]=useSupplierHook();
    const[userData]=userUserHook();
    const findUser=userData.find(users=>users.userEmail===user?.email);
    const adminFilter=userData.filter(user=>user.role==='Admin')
    const superAdminFilter=userData.filter(user=>user.role==='SuperAdmin')
    const logisticFilter=userData.filter(user=>user.role==='Logistic-User')
    const accountsFilter=userData.filter(user=>user.role==='Account-User')
    const userWiseSupplier=supplierData.filter(sup=>sup.userEmail===user?.email)
    const totalBillSubmitUserWise= dueBillData.filter(bill=>bill.userName===user?.displayName)

    return (
        <div>
       {
        findUser?.role==='Admin' &&(
            <div className='mt-20 grid grid-cols-3 gap-3'>
            <div className='bg-green-700 w-[300px] p-5 rounded text-center text-white'>
              <span>Total User</span>
              <p className='text-2xl font-bold'>{userData.length}</p>
            </div>
            <div className='bg-blue-700 w-[300px] p-5 rounded text-center text-white'>
              <span>Total Company Voucher</span>
              <p className='text-2xl font-bold'>{catData.length}</p>
            </div>
            <div className='bg-gray-700 w-[300px] p-5 rounded text-center text-white'>
              <span>Total Admin</span>
              <p className='text-2xl font-bold'>{adminFilter.length}</p>
            </div>
            <div className='bg-sky-700 w-[300px] p-5 rounded text-center text-white'>
              <span>Total Super Admin</span>
              <p className='text-2xl font-bold'>{superAdminFilter.length}</p>
            </div>
            <div className='bg-red-700 w-[300px] p-5 rounded text-center text-white'>
              <span>Total Logistic User</span>
              <p className='text-2xl font-bold'>{logisticFilter.length}</p>
            </div>
            <div className='bg-purple-700 w-[300px] p-5 rounded text-center text-white'>
              <span>Total Accounts User</span>
              <p className='text-2xl font-bold'>{accountsFilter.length}</p>
            </div>
            </div>
         )
       }
       {
        findUser?.role==='Logistic-User' &&(
            <div className='mt-20 grid grid-cols-3 gap-3'>
            <div className='bg-green-700 w-[300px] p-5 rounded text-center text-white'>
              <span>Total Item</span>
              <p className='text-2xl font-bold'>{ItemData.length}</p>
            </div>
            <div className='bg-blue-700 w-[300px] p-5 rounded text-center text-white'>
              <span>Total Supplier</span>
              <p className='text-2xl font-bold'>{userWiseSupplier.length}</p>
            </div>
            <div className='bg-gray-700 w-[300px] p-5 rounded text-center text-white'>
              <span>Total Bill Submit</span>
              <p className='text-2xl font-bold'>{totalBillSubmitUserWise.length}</p>
            </div>
            </div>
         )
       }
    
        </div>
        
    );
};

export default Dashboard;