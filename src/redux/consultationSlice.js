import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../services/api";

const initialState = {
  consultation: null,

  loading: false,

  error: null,

  success: false,
};

export const createConsultationNote = createAsyncThunk(
  "consultation/create",

  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/consultations",

        data,
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

const consultationSlice = createSlice({
  name: "consultation",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createConsultationNote.pending, (state) => {
        state.loading = true;
      })

      .addCase(createConsultationNote.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.consultation = action.payload;
      })

      .addCase(createConsultationNote.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message;
      });
  },
});

export default consultationSlice.reducer;
