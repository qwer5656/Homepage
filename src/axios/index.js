import axios from "axios";
import { useMainStore } from "@/stores/main";
let config = {
  //baseURL: "https://efaner.japaneast.cloudapp.azure.com:5001/api/",
  baseURL: "https://localhost:7120/api/",
  timeout: 10000,
  withCredentials: true,
};

const axiosobj = axios.create(config);

let obj = {
  get(url, token="",enabled = false) {
    const mainstore = useMainStore();
    if (enabled == true) {
      mainstore.loading = true;
    }
    axiosobj.defaults.headers.common['Authorization'] = `User ${token}`;
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
  getExcel(url, token="",enabled = false){
    const mainstore = useMainStore();
    if (enabled == true) {
      mainstore.loading = true;
    }
    axiosobj.defaults.headers.common['Authorization'] = `User ${token}`;
    return axiosobj
      .get(url,{
        responseType: 'blob'
      })
      .then((res) => {
        if (enabled == true) {
          mainstore.loading = false;
        }
        return res;
      })
      .catch((res) => {
        if (enabled == true) {
          mainstore.loading = false;
        }
        return res;
      });
  }
};

export default obj;
