import axios from "axios";
import { useMainStore } from "@/stores/main";
let config = {
  baseURL: "http://localhost:5173",
  timeout: 10000,
  withCredentials: true,
};

const instance = axios.create(config);

let obj = {
  get(url, enabled = false) {
    const mainstore = useMainStore();
    if (enabled == true) {
      mainstore.loading = true;
    }
    return axios
      .get(url)
      .then((res) => {
        if (enabled == true) {
          mainstore.loading = false;
        }
        return res.data;
      })
      .catch((res) => {
        return res.data;
      });
  },
  post(url,data, enabled = false) {
    const mainstore = useMainStore();
    if (enabled == true) {
      mainstore.loading = true;
    }
    return axios
      .post(url, data)
      .then((res) => {
        if (enabled == true) {
          mainstore.loading = false;
        }
        return res.data;
      })
      .catch((res) => {
        return res.data;
      });
  },
  put(url,data, enabled = false) {
    const mainstore = useMainStore();
    if (enabled == true) {
      mainstore.loading = true;
    }
    return axios
      .put(url, data)
      .then((res) => {
        if (enabled == true) {
          mainstore.loading = false;
        }
        return res.data;
      })
      .catch((res) => {
        return res.data;
      });
  },
  delete(url,data, enabled = false) {
    const mainstore = useMainStore();
    if (enabled == true) {
      mainstore.loading = true;
    }
    return axios
      .delete(url, data)
      .then((res) => {
        if (enabled == true) {
          mainstore.loading = false;
        }
        return res.data;
      })
      .catch((res) => {
        return res.data;
      });
  }
};

export default obj;
