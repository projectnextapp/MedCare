import axios from "axios";

const api = axios.create({

    baseURL:"http://10.107.48.151:5000/api/v1",
    // baseURL:"http:///10.107.48.151:5000/api",


    timeout:10000,

    headers:{

        "Content-Type":"application/json"

    }

});

export default api;