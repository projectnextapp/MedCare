import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

// =========================================================
// FETCH NOTIFICATIONS
// =========================================================

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/notifications");

      return response.data.notifications || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch notifications",
      );
    }
  },
);

// =========================================================
// FETCH UNREAD COUNT
// =========================================================

// export const fetchUnreadNotificationCount = createAsyncThunk(
//   "notification/fetchUnreadNotificationCount",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/notifications/unread-count");

//       return response.data.count || 0;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Unable to fetch notification count",
//       );
//     }
//   },
// );
export const fetchUnreadNotificationCount = createAsyncThunk(
  "notification/fetchUnreadNotificationCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/notifications/unread-count");

      console.log("=================================");
      console.log("UNREAD COUNT API RESPONSE");
      console.log("response.data:", response.data);
      console.log("response.data.count:", response.data?.count);
      console.log("=================================");

      return response.data?.count || 0;
    } catch (error) {
      console.log("=================================");
      console.log("UNREAD COUNT API ERROR");
      console.log("status:", error.response?.status);
      console.log("data:", error.response?.data);
      console.log("message:", error.message);
      console.log("=================================");

      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch notification count",
      );
    }
  },
);

// =========================================================
// MARK ONE AS READ
// =========================================================

export const markNotificationAsRead = createAsyncThunk(
  "notification/markNotificationAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/notifications/${notificationId}/read`);

      return response.data.notification;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to mark notification as read",
      );
    }
  },
);

// =========================================================
// MARK ALL AS READ
// =========================================================

export const markAllNotificationsAsRead = createAsyncThunk(
  "notification/markAllNotificationsAsRead",
  async (_, { rejectWithValue }) => {
    try {
      await api.patch("/notifications/read-all");

      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to mark notifications as read",
      );
    }
  },
);

// =========================================================
// INITIAL STATE
// =========================================================

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

// =========================================================
// SLICE
// =========================================================

const notificationSlice = createSlice({
  name: "notification",

  initialState,

  reducers: {
    clearNotificationError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // =====================================================
    // FETCH NOTIFICATIONS
    // =====================================================

    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;

        state.unreadCount = action.payload.filter(
          (notification) => !notification.isRead,
        ).length;
      })

      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =====================================================
    // UNREAD COUNT
    // =====================================================

    builder
      .addCase(fetchUnreadNotificationCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })

      .addCase(fetchUnreadNotificationCount.rejected, (state, action) => {
        state.error = action.payload;
      });

    // =====================================================
    // MARK ONE READ
    // =====================================================

    builder.addCase(markNotificationAsRead.fulfilled, (state, action) => {
      const updatedNotification = action.payload;

      const index = state.notifications.findIndex(
        (notification) => notification._id === updatedNotification._id,
      );

      if (index !== -1) {
        state.notifications[index] = updatedNotification;
      }

      state.unreadCount = state.notifications.filter(
        (notification) => !notification.isRead,
      ).length;
    });

    // =====================================================
    // MARK ALL READ
    // =====================================================

    builder.addCase(markAllNotificationsAsRead.fulfilled, (state) => {
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }));

      state.unreadCount = 0;
    });
  },
});

export const { clearNotificationError } = notificationSlice.actions;

export default notificationSlice.reducer;
