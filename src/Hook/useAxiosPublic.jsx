import axios from "axios";
export const axiosPublic = axios.create({
  baseURL: "https://bill-manage-server.vercel.app/",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
