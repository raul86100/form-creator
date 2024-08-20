import axios from "axios";
import { apiConstant } from "../constant/apiConatant";

export const fetchAllFrom = async () => {
  const data = await axios.get(apiConstant.getAllForm);
  return data?.data?.data;
};

