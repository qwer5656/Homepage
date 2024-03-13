import axios from "axios";
import { useCounterStore } from "@/stores/counter";
let config = {
  baseURL: "http://localhost:5173",
  timeout: 10000,
  withCredentials: true,
};

const instance = axios.create(config);

let obj = {
  get(url) {
    const counter = useCounterStore();
    counter.loading = true;
    return axios
      .get(url)
      .then((res) => {
        counter.loading = false;
        return res.data;
      })
      .catch((res) => {
        return res.data;
      });
  },
};

export default obj;
