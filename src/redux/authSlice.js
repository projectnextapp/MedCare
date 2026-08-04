import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  user: null,

  accessToken: null,

  refreshToken: null,

  isAuthenticated: false,

  isInitialized: false,

  loading: false,

  success: false,

  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",

  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

///verifyOTP
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",

  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/auth/verify-otp",

        data,
      );
      // console.log("FULL RESPONSE:", response);
      //       console.log("RESPONSE.DATA:", response.data);
      const auth = response.data.data;

      //             console.log("AsyncStorage:", AsyncStorage);
      // console.log("multiSet:", AsyncStorage.multiSet);
      // console.log("setItem:", AsyncStorage.setItem);
      // await AsyncStorage.multiSet([

      //     ["ACCESS_TOKEN", auth.accessToken],

      //     ["REFRESH_TOKEN", auth.refreshToken],

      //     ["USER", JSON.stringify(auth.user)]

      // ]);
      await AsyncStorage.setItem("ACCESS_TOKEN", auth.accessToken);

      await AsyncStorage.setItem("REFRESH_TOKEN", auth.refreshToken);

      await AsyncStorage.setItem("USER", JSON.stringify(auth.user));

      return auth;
    } catch (error) {
      //           console.log("ERROR:", error);
      //   console.log("ERROR RESPONSE:", error.response?.data);

      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);

// resend OTP
export const resendOTP = createAsyncThunk(
  "auth/resendOTP",

  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/resend-otp", {
        email,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

//LOGIN
// // LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);

      // Handles both response formats: response.data.data OR response.data
      const auth = response.data?.data || response.data;

      if (!auth?.accessToken) {
        return rejectWithValue({
          message: "Invalid response format from server.",
        });
      }

      await AsyncStorage.setItem("ACCESS_TOKEN", auth.accessToken);
      await AsyncStorage.setItem("REFRESH_TOKEN", auth.refreshToken);
      await AsyncStorage.setItem("USER", JSON.stringify(auth.user));

      return auth;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || "Login failed. Please try again.",
        },
      );
    }
  },
);

// Redux manage the authentication state
export const loadStoredUser = createAsyncThunk(
  "auth/loadStoredUser",

  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");

      const refreshToken = await AsyncStorage.getItem("REFRESH_TOKEN");

      const user = await AsyncStorage.getItem("USER");

      if (!accessToken || !user) {
        return null;
      }

      return {
        accessToken,

        refreshToken,

        user: JSON.parse(user),
      };
    } catch (error) {
      return rejectWithValue({
        message: error.message,
      });
    }
  },
);

//Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",

  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/auth/forgot-password",

        email,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// reset password

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",

  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/auth/reset-password",

        data,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

//logout

export const logoutUser = createAsyncThunk(
  "auth/logout",

  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.multiRemove(["ACCESS_TOKEN", "REFRESH_TOKEN", "USER"]);

      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// slice
const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearError(state) {
      state.error = null;
    },

    clearSuccess(state) {
      state.success = false;
    },

    clearAuth(state) {
      state.user = null;

      state.accessToken = null;

      state.refreshToken = null;

      state.isAuthenticated = false;

      state.success = false;

      state.error = null;
    },

    setCredentials(state, action) {
      state.user = action.payload.user;

      state.accessToken = action.payload.accessToken;

      state.refreshToken = action.payload.refreshToken;

      state.isAuthenticated = true;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN

      // ===========================================
      // LOGIN
      // ===========================================

      .addCase(loginUser.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.success = false;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.user = action.payload.user;

        state.accessToken = action.payload.accessToken;

        state.refreshToken = action.payload.refreshToken;

        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.success = false;

        state.error = action.payload?.message;
      })

      // loading stord users
      // ===========================================
      // LOAD STORED USER
      // ===========================================

      .addCase(loadStoredUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadStoredUser.fulfilled, (state, action) => {
        state.loading = false;

        state.isInitialized = true;

        if (action.payload) {
          state.user = action.payload.user;

          state.accessToken = action.payload.accessToken;

          state.refreshToken = action.payload.refreshToken;

          state.isAuthenticated = true;
        }
      })

      .addCase(loadStoredUser.rejected, (state, action) => {
        state.loading = false;

        state.isInitialized = true;

        state.error = action.payload?.message;
      })

      // REGISTER

      // ===========================================
      // REGISTER
      // ===========================================

      .addCase(registerUser.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;

        state.success = true;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;

        state.success = false;

        state.error = action.payload?.message;
      })

      // VERIFY OTP

      // ===========================================
      // VERIFY OTP
      // ===========================================

      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.user = action.payload.user;

        state.accessToken = action.payload.accessToken;

        state.refreshToken = action.payload.refreshToken;

        state.isAuthenticated = true;
      })

      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;

        state.success = false;

        state.error = action.payload?.message;
      })

      // ===========================================
      // FORGOT PASSWORD
      // ===========================================

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;

        state.success = true;
      })

      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;

        state.success = false;

        state.error = action.payload?.message;
      })

      // ===========================================
      // RESEND OTP
      // ===========================================

      .addCase(resendOTP.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(resendOTP.fulfilled, (state) => {
        state.loading = false;

        state.success = true;
      })

      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;

        state.success = false;

        state.error = action.payload?.message;
      })

      // ===========================================
      // RESET PASSWORD
      // ===========================================

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;

        state.success = true;
      })

      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;

        state.success = false;

        state.error = action.payload?.message;
      })

      // LOGOUT

      // ===========================================
      // LOGOUT
      // ===========================================

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;

        state.accessToken = null;

        state.refreshToken = null;

        state.loading = false;

        state.success = false;

        state.error = null;

        state.isAuthenticated = false;
      });
  },
});

export const {
  clearError,

  clearSuccess,

  clearAuth,

  setCredentials,
} = authSlice.actions;

export default authSlice.reducer;
