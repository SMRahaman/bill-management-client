import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import useAxiosPublic from "../useAxiosPublic";

const useCategoryHook = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: catData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosPublic.get("api/category");
      return res.data;
    },
  });
  console.log(catData);
  return [catData, refetch, isLoading];
};

export default useCategoryHook;
