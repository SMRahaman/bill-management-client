import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useAxiosPublic from "../useAxiosPublic";

const useDueBillHook = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: dueBillData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["dueBill"],
    queryFn: async () => {
      const res = await axiosPublic.get("api/due-bill");
      return res.data;
    },
  });
  return [dueBillData, refetch, isLoading];
};

export default useDueBillHook;
