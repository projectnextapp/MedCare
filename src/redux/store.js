import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import doctorReducer from "./doctorSlice";

export default configureStore({

    reducer: {

        auth: authReducer,

        doctor: doctorReducer,

    },

});