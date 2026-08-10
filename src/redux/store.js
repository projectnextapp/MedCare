import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import doctorReducer from "./doctorSlice";
import appointmentReducer from "./appointmentSlice";
import consultationReducer from "./consultationSlice";

export default configureStore({
  reducer: {
    auth: authReducer,

    doctor: doctorReducer,
    appointment: appointmentReducer,
    consultation: consultationReducer,
  },
});