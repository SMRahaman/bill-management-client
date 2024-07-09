import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";

const useCategoryHook = () => {
  const {
    data: catData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get('https://bill-deposite-server.vercel.app/api/category');
      return res.data;
      
    },
    
  });
  console.log(catData);
  return [catData,refetch,isLoading];
};

export default useCategoryHook;
