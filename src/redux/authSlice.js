import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";


const initialState = {

    user: null,

    accessToken: null,

    refreshToken: null,

    loading: false,

    error: null,

    success: false,

    isAuthenticated: false,

};

export const registerUser = createAsyncThunk(

    "auth/register",

    async (userData, { rejectWithValue }) => {

        try {

            const response = await api.post(
                "/auth/register",
                userData
            );

            return response.data;

        } catch (error) {

            return rejectWithValue(
                error.response.data
            );

        }

    }

);


///verifyOTP
export const verifyOTP = createAsyncThunk(

    "auth/verifyOTP",

    async (data, { rejectWithValue }) => {

        try {

            const response = await api.post(

                "/auth/verify-otp",

                data

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
            await AsyncStorage.setItem(
    "ACCESS_TOKEN",
    auth.accessToken
);

await AsyncStorage.setItem(
    "REFRESH_TOKEN",
    auth.refreshToken
);

await AsyncStorage.setItem(
    "USER",
    JSON.stringify(auth.user)
);

            return auth;

        }

        catch (error) {
    //           console.log("ERROR:", error);
    //   console.log("ERROR RESPONSE:", error.response?.data);

            return rejectWithValue(
error.response?.data || {
          message: error.message,
        }

            );

        }

    }

);

// resend OTP
export const resendOTP = createAsyncThunk(
  "auth/resendOTP",

  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/auth/resend-otp",
        {
          email,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data
      );
    }
  }
);

//LOGIN
export const loginUser = createAsyncThunk(

    "auth/login",

    async (credentials, { rejectWithValue }) => {

        try {

            const response = await api.post(

                "/auth/login",

                credentials

            );

            const auth = response.data.data;

            // await AsyncStorage.multiSet([

            //     ["ACCESS_TOKEN", auth.accessToken],

            //     ["REFRESH_TOKEN", auth.refreshToken],

            //     ["USER", JSON.stringify(auth.user)]

            // ]);
             await AsyncStorage.setItem(
    "ACCESS_TOKEN",
    auth.accessToken
);

await AsyncStorage.setItem(
    "REFRESH_TOKEN",
    auth.refreshToken
);

await AsyncStorage.setItem(
    "USER",
    JSON.stringify(auth.user)
);

            return auth;

        }

        catch (error) {

            return rejectWithValue(

                error.response.data

            );

        }

    }

);

//Forgot Password
export const forgotPassword = createAsyncThunk(

    "auth/forgotPassword",

    async (email, { rejectWithValue }) => {

        try {

            const response = await api.post(

                "/auth/forgot-password",

                email

            );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(

                error.response.data

            );

        }

    }

);

// reset password

export const resetPassword = createAsyncThunk(

    "auth/resetPassword",

    async (data, { rejectWithValue }) => {

        try {

            const response = await api.post(

                "/auth/reset-password",

                data

            );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(

                error.response.data

            );

        }

    }

);

//logout

export const logoutUser = createAsyncThunk(

    "auth/logout",

    async (_, { rejectWithValue }) => {

        try {

            await AsyncStorage.multiRemove([

                "ACCESS_TOKEN",

                "REFRESH_TOKEN",

                "USER"

            ]);

            return true;

        }

        catch (error) {

            return rejectWithValue(error);

        }

    }

);

// slice
const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        clearError(state) {

            state.error = null;

        }

    },

    extraReducers: (builder) => {

        builder

        // LOGIN

        .addCase(loginUser.pending, (state) => {

            state.loading = true;

            state.error = null;

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

            state.error = action.payload?.message;

        })

        // REGISTER

        .addCase(registerUser.pending, (state) => {

            state.loading = true;

        })

        .addCase(registerUser.fulfilled, (state) => {

            state.loading = false;

            state.success = true;

        })

        .addCase(registerUser.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload?.message;

        })

        // VERIFY OTP

        .addCase(verifyOTP.pending, (state) => {

            state.loading = true;

        })

        .addCase(verifyOTP.fulfilled, (state, action) => {

            state.loading = false;

            state.user = action.payload.user;

            state.accessToken = action.payload.accessToken;

            state.refreshToken = action.payload.refreshToken;

            state.isAuthenticated = true;

        })

        .addCase(verifyOTP.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload?.message;

        })

        // LOGOUT

        .addCase(logoutUser.fulfilled, (state) => {

            state.user = null;

            state.accessToken = null;

            state.refreshToken = null;

            state.isAuthenticated = false;

        });

    }

});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;