import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosPublic from "../useAxiosPublic";

const userUserHook = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: userData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get("api/user");
      return res.data;
    },
  });
  return [userData, refetch, isLoading];
};

export default userUserHook;
