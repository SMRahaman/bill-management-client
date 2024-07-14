import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import useAxiosPublic from "../useAxiosPublic";

const useItemHook = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const {
    data: itemData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["item"],
    queryFn: async () => {
      const res = await axiosPublic.get(`api/item?userEmail=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return [itemData, refetch, isLoading];
};

export default useItemHook;
