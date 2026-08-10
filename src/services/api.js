// import axios from "axios";

// const api = axios.create({

//   baseURL: "http://10.227.128.151:5000/api/v1",

//   timeout: 10000,

//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;import axios from "axios";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://10.238.9.151:5000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("ACCESS_TOKEN");

    console.log("Sending Token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;