import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";

const useItemHook = () => {
  const{user}=useContext(AuthContext);
    const {
        data: itemData = [],
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ["item"],
        queryFn: async () => {
          const res = await axios.get(`https://bill-deposite-server.vercel.app/api/item?userEmail=${user?.email}`);
          console.log(res.data);
          return res.data;
        },
      });
      return [itemData,refetch,isLoading];
    };
    
export default useItemHook;