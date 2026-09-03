import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchDoctorById,
  updateDoctorProfile,
  updateDoctorAvailability,
} from "../../../redux/doctorSlice";

import styles from "./DoctorAvailabilityScreen.css";

// =========================================================
// DAYS OF THE WEEK
// =========================================================

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// =========================================================
// TIME OPTIONS
// 30-MINUTE INTERVALS
// =========================================================

const TIME_OPTIONS = [];

for (let hour = 0; hour < 24; hour++) {
  for (let minute = 0; minute < 60; minute += 30) {
    const value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0",
    )}`;

    const displayDate = new Date();

    displayDate.setHours(hour);
    displayDate.setMinutes(minute);
    displayDate.setSeconds(0);
    displayDate.setMilliseconds(0);

    const label = displayDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    TIME_OPTIONS.push({
      value,
      label,
    });
  }
}

// =========================================================
// CREATE DEFAULT WEEK
// =========================================================

const createDefaultAvailability = () => {
  return DAYS_OF_WEEK.map((day) => ({
    day,
    enabled: false,
    startTime: "09:00",
    endTime: "17:00",
  }));
};

// =========================================================
// NORMALISE EXISTING DOCTOR AVAILABILITY
// =========================================================

const normaliseAvailability = (availability) => {
  const existingAvailability = Array.isArray(availability) ? availability : [];

  return DAYS_OF_WEEK.map((day) => {
    const existingDay = existingAvailability.find(
      (item) =>
        String(item?.day || "")
          .toLowerCase()
          .trim() === day.toLowerCase(),
    );

    if (existingDay) {
      return {
        day,
        enabled: existingDay.enabled === true,
        startTime: existingDay.startTime || "09:00",
        endTime: existingDay.endTime || "17:00",
      };
    }

    return {
      day,
      enabled: false,
      startTime: "09:00",
      endTime: "17:00",
    };
  });
};

// =========================================================
// FORMAT TIME
// =========================================================

const formatTime = (time) => {
  if (!time) {
    return "";
  }

  const value = String(time).trim();

  const match = value.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);

  if (!match) {
    return value;
  }

  let hour = parseInt(match[1], 10);
  const minute = match[2];
  const period = match[3]?.toUpperCase();

  if (period) {
    if (period === "AM" && hour === 12) {
      hour = 0;
    }

    if (period === "PM" && hour !== 12) {
      hour += 12;
    }
  }

  const date = new Date();

  date.setHours(hour);
  date.setMinutes(parseInt(minute, 10));
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

// =========================================================
// CONVERT TIME TO MINUTES
// =========================================================

const timeToMinutes = (time) => {
  if (!time) {
    return null;
  }

  const value = String(time).trim();

  const match = value.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);

  if (!match) {
    return null;
  }

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = match[3]?.toUpperCase();

  if (minute > 59) {
    return null;
  }

  if (period) {
    if (hour < 1 || hour > 12) {
      return null;
    }

    if (period === "AM") {
      if (hour === 12) {
        hour = 0;
      }
    } else if (period === "PM") {
      if (hour !== 12) {
        hour += 12;
      }
    }
  } else {
    if (hour > 23) {
      return null;
    }
  }

  return hour * 60 + minute;
};

// =========================================================
// SCREEN
// =========================================================

const DoctorAvailabilityScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { doctorId } = route.params;

  const { doctor, loading, error } = useSelector((state) => state.doctor);

  const [availability, setAvailability] = useState(createDefaultAvailability());

  const [saving, setSaving] = useState(false);

  // Used to show which time picker is open
  const [openTimePicker, setOpenTimePicker] = useState(null);

  // =======================================================
  // FETCH DOCTOR
  // =======================================================

  useEffect(() => {
    dispatch(fetchDoctorById(doctorId));
  }, [dispatch, doctorId]);

  // =======================================================
  // LOAD DOCTOR AVAILABILITY
  // =======================================================

  useEffect(() => {
    if (doctor) {
      setAvailability(normaliseAvailability(doctor.availability));
    }
  }, [doctor]);

  // =======================================================
  // TOGGLE DAY
  // =======================================================

  const toggleDay = (index) => {
    setAvailability((current) =>
      current.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        return {
          ...item,
          enabled: !item.enabled,
        };
      }),
    );
  };

  // =======================================================
  // CHANGE TIME
  // =======================================================

  const changeTime = (index, field, value) => {
    setAvailability((current) =>
      current.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        return {
          ...item,
          [field]: value,
        };
      }),
    );

    setOpenTimePicker(null);
  };

  // =======================================================
  // VALIDATE AVAILABILITY
  // =======================================================

  const validateAvailability = () => {
    const enabledDays = availability.filter((item) => item.enabled);

    for (const schedule of enabledDays) {
      if (!schedule.startTime || !schedule.endTime) {
        Alert.alert(
          "Incomplete Schedule",
          `Please select both start and end time for ${schedule.day}.`,
        );

        return false;
      }

      const startMinutes = timeToMinutes(schedule.startTime);

      const endMinutes = timeToMinutes(schedule.endTime);

      if (startMinutes === null || endMinutes === null) {
        Alert.alert(
          "Invalid Time",
          `Please select valid times for ${schedule.day}.`,
        );

        return false;
      }

      if (startMinutes >= endMinutes) {
        Alert.alert(
          "Invalid Time Range",
          `The start time must be earlier than the end time for ${schedule.day}.`,
        );

        return false;
      }
    }

    return true;
  };

  // =======================================================
  // SAVE AVAILABILITY
  // =======================================================

  const handleSaveAvailability = async () => {
    if (!validateAvailability()) {
      return;
    }

    try {
      setSaving(true);

      // const result = await dispatch(
      //   updateDoctorProfile({
      //     id: doctorId,
      //     data: {
      //       availability,
      //     },
      //   }),
      // );

      const result = await dispatch(
        updateDoctorAvailability({
          id: doctorId,
          availability,
        }),
      ).unwrap();

      if (updateDoctorProfile.rejected.match(result)) {
        const message =
          result.payload?.message ||
          result.payload ||
          "Unable to save availability.";

        Alert.alert("Save Failed", String(message));

        return;
      }

      Alert.alert(
        "Availability Saved",
        "Your weekly availability has been updated successfully.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        "Save Failed",
        error.message || "Unable to save availability.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading && !doctor) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4880D8" />

        <Text style={styles.loadingText}>Loading your availability...</Text>
      </SafeAreaView>
    );
  }

  // =======================================================
  // ERROR
  // =======================================================

  if (error && !doctor) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="calendar-alert"
            size={65}
            color="#EF4444"
          />

          <Text style={styles.errorTitle}>Unable to Load Availability</Text>

          <Text style={styles.errorText}>{error}</Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => dispatch(fetchDoctorById(doctorId))}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // =======================================================
  // SCREEN
  // =======================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={30}
              color="#4880D8"
            />
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>My Availability</Text>

            <Text style={styles.subtitle}>
              Set the days and times patients can book appointments with you.
            </Text>
          </View>
        </View>

        {/* =================================================
            INFORMATION CARD
        ================================================= */}

        <View style={styles.infoCard}>
          <MaterialCommunityIcons
            name="information-outline"
            size={22}
            color="#4880D8"
          />

          <Text style={styles.infoText}>
            Patients will only be able to book appointments during the days and
            times you make available here.
          </Text>
        </View>

        {/* =================================================
            DAYS
        ================================================= */}

        {availability.map((schedule, index) => (
          <View
            key={schedule.day}
            style={[styles.dayCard, schedule.enabled && styles.dayCardEnabled]}
          >
            {/* DAY HEADER */}

            <View style={styles.dayHeader}>
              <View>
                <Text style={styles.dayName}>{schedule.day}</Text>

                <Text
                  style={
                    schedule.enabled
                      ? styles.availableText
                      : styles.unavailableText
                  }
                >
                  {schedule.enabled
                    ? "Available for appointments"
                    : "Not available"}
                </Text>
              </View>

              {/* TOGGLE */}

              <TouchableOpacity
                style={[styles.toggle, schedule.enabled && styles.toggleActive]}
                onPress={() => toggleDay(index)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.toggleCircle,
                    schedule.enabled && styles.toggleCircleActive,
                  ]}
                />
              </TouchableOpacity>
            </View>

            {/* TIME SETTINGS */}

            {schedule.enabled && (
              <View style={styles.timeSection}>
                {/* START TIME */}

                <View style={styles.timeColumn}>
                  <Text style={styles.timeLabel}>Start Time</Text>

                  <TouchableOpacity
                    style={styles.timeButton}
                    onPress={() =>
                      setOpenTimePicker(
                        openTimePicker === `${index}-start`
                          ? null
                          : `${index}-start`,
                      )
                    }
                  >
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={20}
                      color="#4880D8"
                    />

                    <Text style={styles.timeButtonText}>
                      {formatTime(schedule.startTime)}
                    </Text>

                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={20}
                      color="#6B7280"
                    />
                  </TouchableOpacity>

                  {openTimePicker === `${index}-start` && (
                    <View style={styles.timeOptionsContainer}>
                      <ScrollView
                        nestedScrollEnabled
                        style={styles.timeOptions}
                      >
                        {TIME_OPTIONS.map((option) => (
                          <TouchableOpacity
                            key={option.value}
                            style={[
                              styles.timeOption,
                              schedule.startTime === option.value &&
                                styles.timeOptionSelected,
                            ]}
                            onPress={() =>
                              changeTime(index, "startTime", option.value)
                            }
                          >
                            <Text
                              style={[
                                styles.timeOptionText,
                                schedule.startTime === option.value &&
                                  styles.timeOptionTextSelected,
                              ]}
                            >
                              {option.label}
                            </Text>

                            {schedule.startTime === option.value && (
                              <MaterialCommunityIcons
                                name="check"
                                size={19}
                                color="#4880D8"
                              />
                            )}
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>

                {/* END TIME */}

                <View style={styles.timeColumn}>
                  <Text style={styles.timeLabel}>End Time</Text>

                  <TouchableOpacity
                    style={styles.timeButton}
                    onPress={() =>
                      setOpenTimePicker(
                        openTimePicker === `${index}-end`
                          ? null
                          : `${index}-end`,
                      )
                    }
                  >
                    <MaterialCommunityIcons
                      name="clock-check-outline"
                      size={20}
                      color="#4880D8"
                    />

                    <Text style={styles.timeButtonText}>
                      {formatTime(schedule.endTime)}
                    </Text>

                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={20}
                      color="#6B7280"
                    />
                  </TouchableOpacity>

                  {openTimePicker === `${index}-end` && (
                    <View style={styles.timeOptionsContainer}>
                      <ScrollView
                        nestedScrollEnabled
                        style={styles.timeOptions}
                      >
                        {TIME_OPTIONS.map((option) => (
                          <TouchableOpacity
                            key={option.value}
                            style={[
                              styles.timeOption,
                              schedule.endTime === option.value &&
                                styles.timeOptionSelected,
                            ]}
                            onPress={() =>
                              changeTime(index, "endTime", option.value)
                            }
                          >
                            <Text
                              style={[
                                styles.timeOptionText,
                                schedule.endTime === option.value &&
                                  styles.timeOptionTextSelected,
                              ]}
                            >
                              {option.label}
                            </Text>

                            {schedule.endTime === option.value && (
                              <MaterialCommunityIcons
                                name="check"
                                size={19}
                                color="#4880D8"
                              />
                            )}
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        ))}

        {/* =================================================
            SAVE BUTTON
        ================================================= */}

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSaveAvailability}
          disabled={saving}
          activeOpacity={0.8}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <MaterialCommunityIcons
                name="content-save-outline"
                size={21}
                color="#FFFFFF"
              />

              <Text style={styles.saveButtonText}>Save Availability</Text>
            </>
          )}
        </TouchableOpacity>

        {/* =================================================
            CANCEL
        ================================================= */}

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={saving}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorAvailabilityScreen;
