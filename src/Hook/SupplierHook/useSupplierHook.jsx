import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import useAxiosPublic from "../useAxiosPublic";

const useSupplierHook = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const {
    data: supplierData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["supplierInfo"],
    queryFn: async () => {
      const res = await axiosPublic.get("api/supplierInfo");
      console.log(res.data);
      return res.data;
    },
  });
  return [supplierData, refetch, isLoading];
};

export default useSupplierHook;
