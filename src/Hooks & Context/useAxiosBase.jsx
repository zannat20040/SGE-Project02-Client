import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:5001",
  // baseURL: "https://api-finance.studyuk.today",
});

const useAxiosBase = () => {
  return axiosBase;
};

export default useAxiosBase;