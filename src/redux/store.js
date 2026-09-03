import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import doctorReducer from "./doctorSlice";
import appointmentReducer from "./appointmentSlice";
import consultationReducer from "./consultationSlice";
import prescriptionReducer from "./prescriptionSlice";
import notificationReducer from "./notificationSlice";

export default configureStore({
  reducer: {
    auth: authReducer,

    doctor: doctorReducer,
    appointment: appointmentReducer,
    consultation: consultationReducer,
    prescription: prescriptionReducer,
    notification: notificationReducer,
  },
});