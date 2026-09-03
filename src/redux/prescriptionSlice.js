
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../services/api";

// // ==========================================
// // INITIAL STATE
// // ==========================================

// const initialState = {
//   prescriptions: [],
//   prescription: null,

//   loading: false,
//   error: null,
//   success: false,
// };

// // ==========================================
// // CREATE PRESCRIPTION
// // ==========================================

// export const createPrescription = createAsyncThunk(
//   "prescription/createPrescription",
//   async (prescriptionData, { rejectWithValue }) => {
//     try {
//       const response = await api.post(
//         "/prescriptions",
//         prescriptionData,
//       );

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

// // ==========================================
// // GET SINGLE PRESCRIPTION
// // ==========================================

// export const fetchPrescription = createAsyncThunk(
//   "prescription/fetchPrescription",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await api.get(
//         `/prescriptions/${id}`,
//       );

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

// // ==========================================
// // SLICE
// // ==========================================

// const prescriptionSlice = createSlice({
//   name: "prescription",

//   initialState,

//   reducers: {
//     clearPrescriptionError(state) {
//       state.error = null;
//     },

//     clearPrescriptionSuccess(state) {
//       state.success = false;
//     },

//     clearSelectedPrescription(state) {
//       state.prescription = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder

//       // =====================================
//       // CREATE PRESCRIPTION
//       // =====================================

//       .addCase(createPrescription.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })

    
//       .addCase(createPrescription.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;

//         state.prescription = action.payload;

//         state.prescriptions.unshift(action.payload);
//       })

//       .addCase(createPrescription.rejected, (state, action) => {
//         state.loading = false;

//         state.error =
//           action.payload?.message ||
//           "Failed to create prescription.";
//       })

//       // =====================================
//       // FETCH PRESCRIPTION
//       // =====================================

//       .addCase(fetchPrescription.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(fetchPrescription.fulfilled, (state, action) => {
//         state.loading = false;

//         state.prescription = action.payload;
//       })

//       .addCase(fetchPrescription.rejected, (state, action) => {
//         state.loading = false;

//         state.error =
//           action.payload?.message ||
//           "Failed to fetch prescription.";
//       });
//   },
// });

// export const {
//   clearPrescriptionError,
//   clearPrescriptionSuccess,
//   clearSelectedPrescription,
// } = prescriptionSlice.actions;

// export default prescriptionSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// ==========================================
// INITIAL STATE
// ==========================================

const initialState = {
  prescriptions: [],
  prescription: null,

  loading: false,
  error: null,
  success: false,
};

// ==========================================
// CREATE PRESCRIPTION
// ==========================================

export const createPrescription = createAsyncThunk(
  "prescription/createPrescription",
  async (prescriptionData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/prescriptions",
        prescriptionData,
      );

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
// GET SINGLE PRESCRIPTION
// ==========================================

export const fetchPrescription = createAsyncThunk(
  "prescription/fetchPrescription",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/prescriptions/${id}`,
      );

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
// GET MY PRESCRIPTIONS
// ==========================================

export const fetchMyPrescriptions = createAsyncThunk(
  "prescription/fetchMyPrescriptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/prescriptions/patient/my-prescriptions");

      console.log(
        "My prescriptions response:",
        response.data,
      );

      const data = response.data?.data;

      /*
       * Handle:
       *
       * data = [...]
       *
       * OR
       *
       * data = {
       *   prescriptions: [...]
       * }
       */

      if (Array.isArray(data)) {
        return data;
      }

      return data?.prescriptions || [];
    } catch (error) {
      console.log(
        "My prescriptions error:",
        error.response?.data || error.message,
      );

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

const prescriptionSlice = createSlice({
  name: "prescription",

  initialState,

  reducers: {
    clearPrescriptionError(state) {
      state.error = null;
    },

    clearPrescriptionSuccess(state) {
      state.success = false;
    },

    clearSelectedPrescription(state) {
      state.prescription = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================================
      // CREATE PRESCRIPTION
      // =====================================

      .addCase(createPrescription.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createPrescription.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.prescription = action.payload;

        state.prescriptions.unshift(action.payload);
      })

      .addCase(createPrescription.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message ||
          "Failed to create prescription.";
      })

      // =====================================
      // FETCH SINGLE PRESCRIPTION
      // =====================================

      .addCase(fetchPrescription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPrescription.fulfilled, (state, action) => {
        state.loading = false;

        state.prescription = action.payload;
      })

      .addCase(fetchPrescription.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message ||
          "Failed to fetch prescription.";
      })

      // =====================================
      // FETCH MY PRESCRIPTIONS
      // =====================================

      .addCase(fetchMyPrescriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMyPrescriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.prescriptions = action.payload;
      })

      .addCase(fetchMyPrescriptions.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message ||
          "Failed to load your prescriptions.";
      });
  },
});

export const {
  clearPrescriptionError,
  clearPrescriptionSuccess,
  clearSelectedPrescription,
} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;

