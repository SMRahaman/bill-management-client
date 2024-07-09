import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdProductionQuantityLimits, MdPaid } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { GiShop } from "react-icons/gi";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
const SideMenubar = ({ userRole }) => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="flex h-screen flex-col justify-between w-[240px] overflow-y-auto bg-[#301934] fixed">
        <div className=" py-4 px-4 mt-12">
          <ul className="mt-6 space-y-1">
            <li>
              <Link
                to="/"
                className="block rounded-lg hover:bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500"
              >
                Home
              </Link>
            </li>

            {userRole?.role === "Logistic-User" && (
              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <span className="text-sm font-medium">
                      Logistic Section
                    </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        to="/add-item"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Items Add
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="add-supplier"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Supplier & Bill Add
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            )}
            {userRole?.role === "Account-User" && (
              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <span className="text-sm font-medium">
                      {" "}
                      Accounts Section{" "}
                    </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        to="/due-bill-receive"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Receive Bill
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/bill-received"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Received Bill
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            )}
            {userRole?.role === "SuperAdmin" && (
              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <span className="text-sm font-medium">
                      {" "}
                      Accounts Section{" "}
                    </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        to="/due-bill-pay"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Pay Bill
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/due-bill-paid"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Paid Bill
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            )}
            {userRole?.role === "Admin" && (
              <ul>
                <li>
                  <Link
                    to="/add-category"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Company Voucher Add
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    User Management
                  </Link>
                </li>
              </ul>
            )}

            {userRole?.role === "Logistic-User" && (
              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <span className="text-sm font-medium"> Report </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>
                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        to="/monthly-purchase-report"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Purchase Report
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/monthly-billStatus-report"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Bill Status Report
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/company-wise-report"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Company Wise Report
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/supplier-wise-report"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Supplier Wise Report
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            )}
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a href="#" className="flex items-center gap-2 text-white p-4">
            <img
              alt=""
              src={user?.photoURL}
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">
                  {user?.displayName}
                </strong>

                <div className="flex flex-col">
                  <span> {user?.email} </span>
                  <span className="text-green-700 text-xs">
                    {userRole?.role}
                  </span>
                </div>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideMenubar;
