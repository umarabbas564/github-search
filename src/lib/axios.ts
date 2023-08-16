import Axios from "axios";
import { API_BASE_URL, API_TIMEOUT } from "../config";
console.log("baseurl", API_BASE_URL);
const axios = Axios.create({
  timeout: API_TIMEOUT,
  baseURL: API_BASE_URL,
});

export default axios;
