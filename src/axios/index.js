import axios from "axios";
import { useMainStore } from "@/stores/main";
let config = {
  baseURL: "http://localhost:5173",
  timeout: 10000,
  withCredentials: true,
};

const axiosobj = axios.create(config);

let obj = {
  get(url, enabled = false) {
    const mainstore = useMainStore();
    if (enabled == true) {
      mainstore.loading = true;
    }
    return axiosobj
      .get(url)
      .then((res) => {
        if (enabled == true) {
          mainstore.loading = false;
        }
        return res.data;
      })
      .catch((res) => {
        if (enabled == true) {
          mainstore.loading = false;
        }
        return res.code;
      });
  },
  post(url, data, enabled = false) {
    const mainstore = useMainStore();
    if (enabled == true) {
      mainstore.loading = true;
    }
    return axiosobj
      .post(url, data)
      .then((res) => {
        if (enabled == true) {
          mainstore.loading = false;
        }
        return res.data;
      })
      .catch((res) => {
        if (enabled == true) {
          mainstore.loading = false;
        }
    
        return res.code;
      });
  },
  put(url, data, enabled = false) {
    const mainstore = useMainStore();
    if (enabled == true) {
      mainstore.loading = true;
    }
    return axiosobj
      .put(url, data)
      .then((res) => {
        if (enabled == true) {
          mainstore.loading = false;
        }
        return res.data;
      })
      .catch((res) => {
        if (enabled == true) {
          mainstore.loading = false;
        }
        return res.code;
      });
  },
  delete(url, data, enabled = false) {
    const mainstore = useMainStore();
    if (enabled == true) {
      mainstore.loading = true;
    }
    return axiosobj
      .delete(url, data)
      .then((res) => {
        if (enabled == true) {
          mainstore.loading = false;
        }
        return res.data;
      })
      .catch((res) => {
        if (enabled == true) {
          mainstore.loading = false;
        }
        return res.code;
      });
  },
};

export default obj;
