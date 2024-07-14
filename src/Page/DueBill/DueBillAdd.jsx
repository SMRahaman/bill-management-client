import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useCategoryHook from "../../Hook/CategoryHook/useCategoryHook";
import useItemHook from "../../Hook/ItemHook/useItemHook";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const DueBillAdd = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const individualSupplierData = useLoaderData();
  const { _id, supplierName, creaditDuration } = individualSupplierData;
  const [purchaseType, setPurchaseType] = useState("");
  const [donate, setDonate] = useState("");
  const [companyVoucher, setCompanyVoucher] = useState("");
  const [advanceAmout, setAdvanceAmount] = useState();
  const [items, setItems] = useState([
    {
      selectedItem: "",
      itemBrand: "",
      itemQuantity: "",
      itemUnit: "",
      unitPrice: "",
      totalPrice: "",
      itemSerialNumber: "",
      itemWarrantyPeriod: "",
    },
  ]);
  const [categoryData] = useCategoryHook();
  const [itemData] = useItemHook();
  let donateAmount;
  let advancePayment;
  let totalAmount;
  let creaditDays;
  let foundationMoneyR;
  let advancePaymentMoneyR;
  const handelItemAdd = () => {
    setItems([
      ...items,
      {
        selectedItem: "",
        itemBrand: "",
        itemQuantity: "",
        itemUnit: "",
        unitPrice: "",
        totalPrice: "",
        itemSerialNumber: "",
        itemWarrantyPeriod: "",
      },
    ]);
  };

  const handelItemDelete = (index) => {
    const newItem = [...items];
    newItem.splice(index, 1);
    setItems(newItem);
  };

  const handelOnChange = (e, i) => {
    let { name, value } = e.target;
    let onChangeValue = [...items];
    onChangeValue[i][name] = value;
    setItems(onChangeValue);
  };

  console.log(items);

  const subTotal = items.reduce((acc, currentVlaue) => {
    return Number(parseFloat(acc + Number(currentVlaue.totalPrice)).toFixed(2));
  }, 0);

  if (donate === "Yes") {
    donateAmount = parseFloat(subTotal * (1 / 100)).toFixed(2);
  }
  if (purchaseType === "Advanced") {
    advancePayment = parseFloat(advanceAmout).toFixed(2);
  }

  if (donate === "Yes" && purchaseType !== "Advanced") {
    totalAmount = subTotal - donateAmount;
  } else if (purchaseType === "Advanced" && donate !== "Yes") {
    totalAmount = subTotal - advancePayment;
  } else if (donate === "Yes" && purchaseType === "Advanced") {
    totalAmount = parseFloat(
      subTotal - (parseFloat(advancePayment) + parseFloat(donateAmount))
    ).toFixed(2);
  }

  console.log(typeof totalAmount, totalAmount);

  const handelBillAdd = (e) => {
    e.preventDefault();
    const form = e.target;
    const billSubmitDate = form.billsubmiteDate.value;
    const billNumber = form.billNumber.value;
    const purchaseDate = form.purchaseDate.value;
    const selectedCompanyVoucher = companyVoucher;
    const PojectOrderName = form.po.value;
    const selectedPurchaseType = purchaseType;
    const selectedDonate = donate;

    if (selectedPurchaseType === "Creadit") {
      creaditDays = form.creditDays.value;
    } else {
      creaditDays = "0 days";
    }

    if (selectedPurchaseType === "Advanced") {
      advancePaymentMoneyR = form.advanceMR.value;
    } else {
      advancePaymentMoneyR = "N/A";
    }

    if (selectedDonate === "Yes") {
      foundationMoneyR = form.foundationMoneyR.value;
    } else {
      foundationMoneyR = "N/A";
    }

    const billAndVoucher = {
      supplierId: _id,
      supplierName: supplierName,
      billsubmiteDate: billSubmitDate,
      billNumber: billNumber,
      purchaseDate: purchaseDate,
      advancePayment: Number(advancePayment),
      creaditDays: creaditDays,
      foundationMoneyR: foundationMoneyR,
      purchaseType: selectedPurchaseType,
      coampanyVoucher: selectedCompanyVoucher,
      ProjectOrderNumber: PojectOrderName,
      advancePaymentMoneyR: advancePaymentMoneyR,
      items: items,
      subTotal: subTotal,
      donataionAmount: Number(donateAmount),
      dueAmount: Number(totalAmount),
      userEmail: user?.email,
      userName: user?.displayName,
      billStatus: "Pending",
    };

    if (billAndVoucher) {
      axiosPublic.post("api/due-bill", billAndVoucher).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Congratulation",
            text: `Bill add successfully`,
            icon: "success",
          });
        }
      });
    }

    form.reset();
  };

  return (
    <div className="pt-20">
      <form onSubmit={handelBillAdd}>
        <div className="mb-8 flex justify-between">
          <span className="text-2xl font-bold ">Bill Add</span>
          <span className="text-2xl font-bold  ">
            Supplier Name: {supplierName}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-xs">Bill Submit Date</span>
            <input
              required
              type="text"
              name="billsubmiteDate"
              placeholder="Select bill submit date"
              onFocus={(e) => (e.target.type = "date")}
              className="input input-bordered w-full max-w-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs">Invoice Number</span>
            <input
              required
              type="text"
              name="billNumber"
              placeholder="Type bill number or invoice number"
              className="input input-bordered w-full max-w-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs">Purchase date</span>
            <input
              required
              type="text"
              name="purchaseDate"
              placeholder="Select purchase date"
              onFocus={(e) => (e.target.type = "date")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-xs">Compnay Voucher Name</span>
            <select
              required
              onChange={(e) => setCompanyVoucher(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option>Select Compnay Voucher</option>
              {categoryData.map((company) => (
                <option key={company._id}>{company.categoryName}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs">PO Number</span>
            <input
              required
              type="text"
              name="po"
              placeholder="Type PO number"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs">Purchase Type</span>
            <select
              required
              onChange={(e) => setPurchaseType(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option>Select Purchase type</option>
              <option>Cash</option>
              <option>Creadit</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-5 mt-5">
          {purchaseType === "Creadit" && (
            <div className="flex flex-col gap-2">
              <span className="text-xs">Creadit Duration</span>
              <input
                readOnly
                type="text"
                name="creditDays"
                value={`${creaditDuration} days`}
                placeholder="Type Creadit Days"
                className={
                  purchaseType === "Creadit"
                    ? "input input-bordered w-full block max-w-xs"
                    : "hidden"
                }
              />
            </div>
          )}
          {purchaseType === "Advanced" && (
            <div className="flex flex-row gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-xs">Advance Amount</span>
                <input
                  type="text"
                  onChange={(e) => setAdvanceAmount(e.target.value)}
                  placeholder="Type Advance Amount"
                  className="input input-bordered w-full max-w-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs">Money Receipt Number</span>
                <input
                  type="text"
                  name="advanceMR"
                  placeholder="Money Receipt Number"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
          )}
        </div>

        <h3 className="my-5 font-bold text-lg">Total Item:{items.length}</h3>
        {items.map((product, index) => (
          <div key={index} className="mt-5">
            <div className="grid grid-cols-4 gap-5 mb-3">
              <div className="flex flex-col gap-2">
                <span className="text-xs">Item Name</span>
                <select
                  required
                  name="selectedItem"
                  value={product.selectedItem}
                  onChange={(e) => handelOnChange(e, index)}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option>Select Item</option>
                  {itemData.map(
                    (item) =>
                      item.itemMode === "Active" && (
                        <option key={item._id}>{item.itemName}</option>
                      )
                  )}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs">Item Brand</span>
                <input
                  required
                  name="itemBrand"
                  value={product.itemBrand}
                  onChange={(e) => handelOnChange(e, index)}
                  type="text"
                  placeholder="Type Item Brand"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs">Item Quantity</span>
                <input
                  required
                  type="number"
                  name="itemQuantity"
                  value={product.itemQuantity}
                  onChange={(e) => handelOnChange(e, index)}
                  placeholder="Type Item Quantity"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs">Item Unit</span>
                <select
                  required
                  name="itemUnit"
                  value={product.itemUnit}
                  onChange={(e) => handelOnChange(e, index)}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option>Select Item Unit</option>
                  <option>Kg</option>
                  <option>gm</option>
                  <option>m</option>
                  <option>cm</option>
                  <option>mm</option>
                  <option>feet</option>
                  <option>inch</option>
                  <option>pcs</option>
                  <option>litter</option>
                  <option>cft</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-5 mb-5">
              <div className="flex flex-col gap-2">
                <span className="text-xs">Item Unit Price</span>
                <input
                  required
                  type="number"
                  name="unitPrice"
                  value={product.unitPrice}
                  onChange={(e) => handelOnChange(e, index)}
                  placeholder="Type Unit Price"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs">Total Price</span>
                <input
                  readOnly
                  type="number"
                  name="totalPrice"
                  onClick={(e) => handelOnChange(e, index)}
                  placeholder="Total Price"
                  className="input input-bordered w-full max-w-xs"
                  value={parseFloat(
                    product.itemQuantity * product.unitPrice
                  ).toFixed(2)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs">Item Serial Number</span>
                <input
                  required
                  type="text"
                  name="itemSerialNumber"
                  value={product.itemSerialNumber}
                  onChange={(e) => handelOnChange(e, index)}
                  placeholder="Product Serial Number"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs">Item Warranty</span>
                <select
                  required
                  name="itemWarrantyPeriod"
                  value={product.itemWarrantyPeriod}
                  onChange={(e) => handelOnChange(e, index)}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option>Select Warranty Period</option>
                  <option>3 month</option>
                  <option>6 month</option>
                  <option>1 years</option>
                  <option>2 years</option>
                  <option>3 years</option>
                  <option>5 years</option>
                  <option>6 years</option>
                  <option>7 years</option>
                  <option>9 years</option>
                  <option>10 years</option>
                  <option>No Warranty</option>
                </select>
              </div>
            </div>
            <div className="mb-5 flex gap-5 justify-end">
              {items.length > 1 && (
                <button
                  onClick={() => handelItemDelete(index)}
                  className="btn text-white btn-error"
                >
                  Delete Item
                </button>
              )}

              {index === items.length - 1 && (
                <button
                  onClick={() => handelItemAdd()}
                  className="btn text-white btn-primary"
                >
                  Add More Item
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="flex gap-5 mt-12 items-center">
          <p className="text-xs">Donate for SIMEC Foundation (1%):</p>
          <select
            required
            onChange={(e) => setDonate(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Are your sure??
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
          {donate === "Yes" && (
            <input
              required
              type="text"
              name="foundationMoneyR"
              placeholder="Type Money Receipt Number"
              className="input input-bordered w-full max-w-xs"
            />
          )}
        </div>
        <div>
          <div className="mt-5">
            <p className="text-sm text-right font-bold">
              Sub-Total:{parseFloat(subTotal).toFixed(2)} Tk
            </p>
            <div>
              {purchaseType === "Advanced" && (
                <p className="text-sm text-right font-bold">
                  Advanced Payment:
                  {advancePayment === "NaN" ? 0.0 : advancePayment} Tk
                </p>
              )}
            </div>
            <div>
              {donate === "Yes" && (
                <p className="text-sm text-right font-bold">
                  Donate Amonut:{donateAmount} Tk
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-right font-bold">
                Due Amount:{totalAmount ? totalAmount : subTotal}Tk
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center pb-5">
          <button type="submit" className="btn btn-success text-white w-1/2">
            Add Bill
          </button>
        </div>
      </form>
    </div>
  );
};

export default DueBillAdd;
