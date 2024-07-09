import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const userUserHook = () => {
    const {
        data: userData = [],
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
          const res = await axios.get("https://bill-deposite-server.vercel.app/api/user");
          return res.data;
        },
      });
    return[userData,refetch,isLoading]
};

export default userUserHook;