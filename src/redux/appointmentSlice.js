import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

const initialState = {
  appointments: [],
  appointment: null,

  loading: false,
  error: null,
  success: false,
};

// ==========================================
// CREATE APPOINTMENT
// ==========================================

export const createAppointment = createAsyncThunk(
  "appointment/createAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await api.post("/appointments", appointmentData);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);

// ==========================================
// GET ALL APPOINTMENTS (ADMIN)
// ==========================================

export const fetchAppointments = createAsyncThunk(
  "appointment/fetchAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/appointments");

      return response.data.data.appointments;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);

// ==========================================
// GET SINGLE APPOINTMENT
// ==========================================

export const fetchAppointment = createAsyncThunk(
  "appointment/fetchAppointment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/appointments/${id}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);

// Export alias so existing screens calling fetchAppointmentById don't break
export const fetchAppointmentById = fetchAppointment;

// ==========================================
// PATIENT APPOINTMENTS
// ==========================================

// export const fetchMyAppointments = createAsyncThunk(
//   "appointment/fetchMyAppointments",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/appointments/patient/me");

//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || {
//           message: error.message,
//         },
//       );
//     }
//   },
// );

// ==========================================
// DOCTOR APPOINTMENTS
// ==========================================

// export const fetchDoctorAppointments = createAsyncThunk(
//   "appointment/fetchDoctorAppointments",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/appointments/doctor/me");

//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || {
//           message: error.message,
//         },
//       );
//     }
//   },
// );

// ==========================================
// PATIENT APPOINTMENTS
// ==========================================

export const fetchMyAppointments = createAsyncThunk(
  "appointment/fetchMyAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/appointments/patient/me");
      // Extract appointments array whether wrapped in { appointments: [...] } or direct array [...]
      const data = response.data.data;
      return Array.isArray(data) ? data : data?.appointments || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);

// ==========================================
// DOCTOR APPOINTMENTS
// ==========================================

export const fetchDoctorAppointments = createAsyncThunk(
  "appointment/fetchDoctorAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/appointments/doctor/me");

      // Extract appointments array whether wrapped in { appointments: [...] } or direct array [...]
      const data = response.data.data;
      return Array.isArray(data) ? data : data?.appointments || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);
// ==========================================
// UPDATE APPOINTMENT
// ==========================================

export const updateAppointment = createAsyncThunk(
  "appointment/updateAppointment",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/appointments/${id}`, data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);

// ==========================================
// UPDATE STATUS
// ==========================================

export const updateAppointmentStatus = createAsyncThunk(
  "appointment/updateAppointmentStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/appointments/${id}/status`, {
        status,
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);

// ==========================================
// DELETE APPOINTMENT
// ==========================================

export const deleteAppointment = createAsyncThunk(
  "appointment/deleteAppointment",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/appointments/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);

// ==========================================
// RESCHEDULE APPOINTMENT
// ==========================================

// export const rescheduleAppointment = createAsyncThunk(
//   "appointment/rescheduleAppointment",
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await api.put(`/appointments/${id}`, data);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || {
//           message: error.message,
//         },
//       );
//     }
//   },
// );
export const rescheduleAppointment = createAsyncThunk(
  "appointment/rescheduleAppointment",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/appointments/${id}/reschedule`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);

// ==========================================
// SLICE
// ==========================================

const appointmentSlice = createSlice({
  name: "appointment",

  initialState,

  reducers: {
    clearAppointmentError(state) {
      state.error = null;
    },

    clearSelectedAppointment(state) {
      state.appointment = null;
    },

    clearAppointmentSuccess(state) {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================================
      // CREATE
      // =====================================

      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.appointments.unshift(action.payload);
      })

      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message;
      })

      // =====================================
      // FETCH ALL
      // =====================================

      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;

        state.appointments = action.payload;
      })

      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message;
      })

      // =====================================
      // FETCH ONE
      // =====================================

      .addCase(fetchAppointment.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAppointment.fulfilled, (state, action) => {
        state.loading = false;

        state.appointment = action.payload;
      })

      .addCase(fetchAppointment.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message;
      })

      // =====================================
      // PATIENT
      // =====================================

      // .addCase(fetchMyAppointments.fulfilled, (state, action) => {
      //   state.loading = false;

      //   state.appointments = action.payload;
      // })

      // =====================================
      // PATIENT
      // =====================================

      .addCase(fetchMyAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchMyAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // =====================================
      // DOCTOR
      // =====================================

      // .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
      //   state.loading = false;

      //   state.appointments = action.payload;
      // })

      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // =====================================
      // UPDATE
      // =====================================

      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.appointment = action.payload;

        state.appointments = state.appointments.map((appointment) =>
          appointment._id === action.payload._id ? action.payload : appointment,
        );
      })

      // =====================================
      // STATUS
      // =====================================

      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.appointment = action.payload;

        state.appointments = state.appointments.map((appointment) =>
          appointment._id === action.payload._id ? action.payload : appointment,
        );
      })

      // =====================================
      // RESCHEDULE
      // =====================================

      .addCase(rescheduleAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointment = action.payload;

        state.appointments = state.appointments.map((appointment) =>
          appointment._id === action.payload._id ? action.payload : appointment,
        );
      })

      // =====================================
      // DELETE
      // =====================================

      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.appointments = state.appointments.filter(
          (appointment) => appointment._id !== action.payload,
        );
      });
  },
});

export const {
  clearAppointmentError,
  clearSelectedAppointment,
  clearAppointmentSuccess,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
