

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

const initialState = {
  doctors: [],
  doctor: null,
  loading: false,
  error: null,
  success: false,
};

// ==========================================
// THUNKS
// ==========================================

export const fetchDoctors = createAsyncThunk(
  "doctor/fetchDoctors",
  async (_, { rejectWithValue }) => {
    try {
      
      const response = await api.get("/doctors");
      return response.data.data.doctors;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const fetchDoctorById = createAsyncThunk(
  "doctor/fetchDoctorById",
  async (id, { rejectWithValue }) => {
    try {

      const response = await api.get(`/doctors/${id}`);
      console.log("Doctor API Response:", response.data);
      // return response.data.data;
      return response.data.data.doctor;

    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

// Alias so both import { fetchDoctor } and { fetchDoctorById } work
export const fetchDoctor = fetchDoctorById;

export const createDoctor = createAsyncThunk(
  "doctor/createDoctor",
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await api.post("/doctors", doctorData);
      return response.data.data.doctor;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);



export const updateDoctorProfile = createAsyncThunk(
  "doctor/updateDoctorProfile",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("Updating Doctor:", id);
      console.log("Payload:", data);

      const response = await api.put(`/doctors/${id}`, data);

      console.log("UPDATE RESPONSE:", response.data);

      return response.data.data.doctor;
    } catch (error) {
      console.log("UPDATE ERROR:", error.response?.data);
      console.log("STATUS:", error.response?.status);
      console.log("MESSAGE:", error.message);

      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);

export const updateDoctorStatus = createAsyncThunk(
  "doctor/updateDoctorStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/doctors/status/${id}`, { status });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const deleteDoctor = createAsyncThunk(
  "doctor/deleteDoctor",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/doctors/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const searchDoctors = createAsyncThunk(
  "doctor/searchDoctors",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await api.get(`/doctors/search?keyword=${keyword}`);
      return response.data.data.doctors;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const updateDoctorAvailability = createAsyncThunk(
  "doctor/updateDoctorAvailability",
  async ({ id, availability }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/doctors/${id}/availability`, {
        availability,
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
// SLICE
// ==========================================

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    clearDoctorError(state) {
      state.error = null;
    },
    clearSelectedDoctor(state) {
      state.doctor = null;
    },
    clearDoctorSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH DOCTORS
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // FETCH SINGLE DOCTOR
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        console.log("Redux Payload:", action.payload);
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // CREATE DOCTOR
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctors.unshift(action.payload);
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // UPDATE DOCTOR PROFILE
      .addCase(updateDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctor = action.payload;
        state.doctors = state.doctors.map((doctor) =>
          doctor._id === action.payload._id ? action.payload : doctor,
        );
      })
      .addCase(updateDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // UPDATE STATUS
      .addCase(updateDoctorStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateDoctorStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctor = action.payload;
        state.doctors = state.doctors.map((doctor) =>
          doctor._id === action.payload._id ? action.payload : doctor,
        );
      })
      .addCase(updateDoctorStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(updateDoctorAvailability.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateDoctorAvailability.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.selectedDoctor = action.payload;
      })

      .addCase(updateDoctorAvailability.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message;
      })

      // DELETE DOCTOR
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctors = state.doctors.filter(
          (doctor) => doctor._id !== action.payload,
        );
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // SEARCH DOCTORS
      .addCase(searchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(searchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { clearDoctorError, clearSelectedDoctor, clearDoctorSuccess } =
  doctorSlice.actions;

export default doctorSlice.reducer;