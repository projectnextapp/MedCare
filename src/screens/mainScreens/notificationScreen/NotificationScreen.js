import React, { useCallback } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";

import { useFocusEffect } from "@react-navigation/native";

import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../../redux/notificationSlice";

import styles from "./NotificationScreen.css";

const NotificationScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // =========================================================
  // NOTIFICATION STATE
  // =========================================================

  const {
    notifications = [],
    unreadCount = 0,
    loading,
    error,
  } = useSelector((state) => state.notification);

  // =========================================================
  // FETCH NOTIFICATIONS
  // =========================================================

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchNotifications());
    }, [dispatch]),
  );

  // =========================================================
  // MARK ONE NOTIFICATION AS READ
  // =========================================================

  const handleNotificationPress = (notification) => {
    if (!notification?._id) {
      return;
    }

    // Mark as read if currently unread.
    if (!notification.isRead) {
      dispatch(markNotificationAsRead(notification._id));
    }

    // =======================================================
    // OPTIONAL NAVIGATION
    // =======================================================
    //
    // This supports notifications that contain navigation
    // information from the backend.
    //
    // Example:
    //
    // {
    //   screen: "AppointmentDetailsScreen",
    //   appointmentId: "123"
    // }
    //
    // If your notification model uses different field names,
    // we can adjust this later.
    // =======================================================

    if (notification.screen) {
      if (notification.params) {
        navigation.navigate(notification.screen, notification.params);
      } else {
        navigation.navigate(notification.screen);
      }

      return;
    }

    // =======================================================
    // FALLBACK NAVIGATION
    // =======================================================

    // If notification is related to an appointment.
    if (notification.appointmentId) {
      navigation.navigate("AppointmentDetailsScreen", {
        appointmentId: notification.appointmentId,
      });

      return;
    }

    // If notification has a related resource.
    if (notification.type === "appointment") {
      navigation.navigate("UpcomingAppointmentsScreen");
    }
  };

  // =========================================================
  // MARK ALL AS READ
  // =========================================================

  const handleMarkAllAsRead = () => {
    if (unreadCount === 0) {
      return;
    }

    dispatch(markAllNotificationsAsRead());
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    try {
      const notificationDate = new Date(date);

      if (isNaN(notificationDate.getTime())) {
        return "";
      }

      return notificationDate.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return "";
    }
  };

  // =========================================================
  // FORMAT TIME
  // =========================================================

  const formatTime = (date) => {
    if (!date) {
      return "";
    }

    try {
      const notificationDate = new Date(date);

      if (isNaN(notificationDate.getTime())) {
        return "";
      }

      return notificationDate.toLocaleTimeString("en-NG", {
        hour: "numeric",
        minute: "2-digit",
      });
    } catch (error) {
      return "";
    }
  };

  // =========================================================
  // NOTIFICATION ICON
  // =========================================================

  const getNotificationIcon = (notification) => {
    const type = String(notification?.type || "").toLowerCase();

    switch (type) {
      case "appointment":
      case "appointment_booked":
      case "appointment_confirmed":
        return "calendar-check";

      case "appointment_cancelled":
        return "calendar-remove";

      case "prescription":
        return "prescription";

      case "medical_record":
        return "file-document-outline";

      case "message":
      case "chat":
        return "message-text-outline";

      case "payment":
        return "cash-check";

      case "reminder":
        return "bell-ring-outline";

      case "emergency":
        return "alert-circle-outline";

      default:
        return "bell-outline";
    }
  };

  // =========================================================
  // RENDER NOTIFICATION
  // =========================================================

  const renderNotification = ({ item }) => {
    const isUnread = !item.isRead;

    return (
      <TouchableOpacity
        style={[
          styles.notificationCard,
          isUnread && styles.unreadNotificationCard,
        ]}
        activeOpacity={0.7}
        onPress={() => handleNotificationPress(item)}
      >
        {/* =================================================
            ICON
        ================================================= */}

        <View
          style={[
            styles.notificationIconContainer,
            isUnread && styles.unreadNotificationIconContainer,
          ]}
        >
          <MaterialCommunityIcons
            name={getNotificationIcon(item)}
            size={25}
            color="#4880D8"
          />
        </View>

        {/* =================================================
            CONTENT
        ================================================= */}

        <View style={styles.notificationContent}>
          <View style={styles.notificationTitleRow}>
            <Text
              style={[
                styles.notificationTitle,
                isUnread && styles.unreadNotificationTitle,
              ]}
              numberOfLines={2}
            >
              {item.title || "Notification"}
            </Text>

            {isUnread && <View style={styles.unreadDot} />}
          </View>

          <Text style={styles.notificationMessage}>
            {item.message || "You have a new notification."}
          </Text>

          {/* =================================================
              DATE / TIME
          ================================================= */}

          {item.createdAt && (
            <View style={styles.notificationTimeContainer}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={14}
                color="#9CA3AF"
              />

              <Text style={styles.notificationTime}>
                {formatDate(item.createdAt)} • {formatTime(item.createdAt)}
              </Text>
            </View>
          )}
        </View>

        {/* =================================================
            CHEVRON
        ================================================= */}

        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color="#9CA3AF"
        />
      </TouchableOpacity>
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading && notifications.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={25}
              color="#1F2937"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Notifications</Text>

          <View style={styles.headerRightPlaceholder} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4880D8" />

          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <SafeAreaView style={styles.container}>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <View style={styles.header}>
        {/* BACK BUTTON */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={25} color="#1F2937" />
        </TouchableOpacity>

        {/* TITLE */}

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Notifications</Text>

          {unreadCount > 0 && (
            <View style={styles.headerUnreadBadge}>
              <Text style={styles.headerUnreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>

        {/* MARK ALL */}

        <TouchableOpacity
          style={styles.markAllButton}
          onPress={handleMarkAllAsRead}
          disabled={unreadCount === 0}
        >
          <Text
            style={[
              styles.markAllText,
              unreadCount === 0 && styles.markAllTextDisabled,
            ]}
          >
            Read all
          </Text>
        </TouchableOpacity>
      </View>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={20}
            color="#DC2626"
          />

          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* =====================================================
          NOTIFICATIONS LIST
      ===================================================== */}

      <FlatList
        data={notifications}
        keyExtractor={(item, index) => item?._id || String(index)}
        renderItem={renderNotification}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          notifications.length === 0
            ? styles.emptyListContainer
            : styles.listContainer
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <MaterialCommunityIcons
                name="bell-off-outline"
                size={50}
                color="#4880D8"
              />
            </View>

            <Text style={styles.emptyTitle}>No Notifications</Text>

            <Text style={styles.emptyText}>
              You don't have any notifications yet. We'll notify you when
              something important happens.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
