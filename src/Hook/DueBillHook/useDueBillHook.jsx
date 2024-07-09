import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useDueBillHook = () => {
    const {
        data: dueBillData = [],
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ["dueBill"],
        queryFn: async () => {
          const res = await axios.get(
            "https://bill-deposite-server.vercel.app/api/due-bill"
          );
          return res.data;
        },
      });
      return[dueBillData,refetch,isLoading]
};

export default useDueBillHook;