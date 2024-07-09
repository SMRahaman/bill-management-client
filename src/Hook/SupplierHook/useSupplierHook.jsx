import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";

const useSupplierHook = () => {
  const {user}=useContext(AuthContext)
  const {
    data: supplierData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["supplierInfo"],
    queryFn: async () => {
      const res = await axios.get("https://bill-deposite-server.vercel.app/api/supplierInfo");
      console.log(res.data);
      return res.data;
      
    },
  });
  return [supplierData, refetch, isLoading];
};

export default useSupplierHook;
