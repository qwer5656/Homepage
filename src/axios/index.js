import axios from "axios";
import { useMainStore } from "@/stores/main";
let config = {
  baseURL: "http://localhost:5173",
  timeout: 10000,
  withCredentials: true,
};

const instance = axios.create(config);

let obj = {
  get(url) {
    const mainstore = useMainStore();
    mainstore.loading = true;
    return axios
      .get(url)
      .then((res) => {
        mainstore.loading = false;
        return res.data;
      })
      .catch((res) => {
        return res.data;
      });
  },
};

export default obj;
