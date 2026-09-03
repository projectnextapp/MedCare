import React, { useCallback, useMemo } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";

import { useFocusEffect } from "@react-navigation/native";

import { fetchMyAppointments } from "../../../redux/appointmentSlice";

import styles from "../../mainScreens/dashboardScreen/Dashboard.css";

const UpcomingAppointmentsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // =========================================================
  // APPOINTMENTS
  // =========================================================

  const {
    appointments = [],
    loading,
    error,
  } = useSelector((state) => state.appointment);

  // =========================================================
  // FETCH APPOINTMENTS
  // =========================================================

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchMyAppointments());
    }, [dispatch]),
  );

  // =========================================================
  // GET DOCTOR NAME
  // =========================================================

  const getDoctorName = useCallback((appointment) => {
    return (
      appointment?.doctor?.user?.fullname ||
      appointment?.doctor?.fullname ||
      "Doctor"
    );
  }, []);

  // =========================================================
  // FORMAT DOCTOR NAME
  // =========================================================

  const formatDoctorName = useCallback(
    (appointment) => {
      const name = getDoctorName(appointment);

      if (!name) {
        return "Doctor";
      }

      const lowerName = String(name).toLowerCase().trim();

      // Prevent:
      // Dr. Dr. John Smith
      if (lowerName.startsWith("dr.") || lowerName.startsWith("dr ")) {
        return name;
      }

      return `Dr. ${name}`;
    },
    [getDoctorName],
  );

  // =========================================================
  // GET DOCTOR SPECIALIZATION
  // =========================================================

  const getDoctorSpecialization = useCallback((appointment) => {
    return appointment?.doctor?.specialization || "Medical Doctor";
  }, []);

  // =========================================================
  // GET APPOINTMENT STATUS
  // =========================================================

  const getStatus = useCallback((appointment) => {
    return String(appointment?.status || "")
      .toLowerCase()
      .trim();
  }, []);

  // =========================================================
  // CONVERT APPOINTMENT DATE + TIME
  // =========================================================

  const getAppointmentDateTime = useCallback((appointment) => {
    if (!appointment?.appointmentDate) {
      return null;
    }

    try {
      const date = new Date(appointment.appointmentDate);

      if (isNaN(date.getTime())) {
        return null;
      }

      // -------------------------------------------------------
      // APPLY APPOINTMENT TIME
      // -------------------------------------------------------

      if (appointment?.appointmentTime) {
        const timeString = String(appointment.appointmentTime).trim();

        const timeParts = timeString.split(":");

        if (timeParts.length >= 2) {
          const hours = Number(timeParts[0]);
          const minutes = Number(timeParts[1]);
          const seconds = Number(timeParts[2] || 0);

          if (
            !isNaN(hours) &&
            !isNaN(minutes) &&
            !isNaN(seconds) &&
            hours >= 0 &&
            hours <= 23 &&
            minutes >= 0 &&
            minutes <= 59 &&
            seconds >= 0 &&
            seconds <= 59
          ) {
            date.setHours(hours, minutes, seconds, 0);
          }
        }
      }

      return date;
    } catch (err) {
      return null;
    }
  }, []);

  // =========================================================
  // UPCOMING APPOINTMENTS
  // =========================================================

  const upcomingAppointments = useMemo(() => {
    const now = new Date();

    return (
      appointments
        .map((appointment) => {
          const appointmentDate = getAppointmentDateTime(appointment);

          return {
            appointment,
            appointmentDate,
          };
        })

        // -------------------------------------------------------
        // REMOVE INVALID DATES
        // -------------------------------------------------------

        .filter(({ appointmentDate }) => {
          return appointmentDate !== null;
        })

        // -------------------------------------------------------
        // REMOVE CANCELLED / COMPLETED
        // -------------------------------------------------------

        .filter(({ appointment }) => {
          const status = getStatus(appointment);

          if (status === "cancelled") {
            return false;
          }

          if (status === "completed") {
            return false;
          }

          return true;
        })

        // -------------------------------------------------------
        // ONLY FUTURE APPOINTMENTS
        // -------------------------------------------------------

        .filter(({ appointmentDate }) => {
          return appointmentDate >= now;
        })

        // -------------------------------------------------------
        // SORT NEAREST FIRST
        // -------------------------------------------------------

        .sort((a, b) => {
          return a.appointmentDate - b.appointmentDate;
        })

        // -------------------------------------------------------
        // RETURN ORIGINAL APPOINTMENT OBJECTS
        // -------------------------------------------------------

        .map(({ appointment }) => appointment)
    );
  }, [appointments, getAppointmentDateTime, getStatus]);

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = useCallback((date) => {
    if (!date) {
      return "-";
    }

    try {
      const appointmentDate = new Date(date);

      if (isNaN(appointmentDate.getTime())) {
        return String(date);
      }

      return appointmentDate.toLocaleDateString("en-NG", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (err) {
      return String(date);
    }
  }, []);

  // =========================================================
  // FORMAT TIME
  // =========================================================

  const formatTime = useCallback((time) => {
    if (!time) {
      return "Time not specified";
    }

    return String(time);
  }, []);

  // =========================================================
  // GET CONSULTATION TYPE
  // =========================================================

  const getConsultationType = useCallback((appointment) => {
    return appointment?.consultationType || "Consultation";
  }, []);

  // =========================================================
  // CONSULTATION ICON
  // =========================================================

  const getConsultationIcon = useCallback((appointment) => {
    const type = String(appointment?.consultationType || "").toLowerCase();

    if (type === "online" || type === "virtual" || type === "video") {
      return "video-outline";
    }

    return "hospital-building";
  }, []);

  // =========================================================
  // VIEW APPOINTMENT
  // =========================================================

  const handleViewAppointment = useCallback(
    (appointment) => {
      if (!appointment?._id) {
        return;
      }

      navigation.navigate("AppointmentDetailsScreen", {
        appointmentId: appointment._id,
      });
    },
    [navigation],
  );

  // =========================================================
  // REFRESH
  // =========================================================

  const handleRefresh = useCallback(() => {
    dispatch(fetchMyAppointments());
  }, [dispatch]);

  // =========================================================
  // LOADING
  // =========================================================

  const showLoading = loading && appointments.length === 0;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom: 30,
          },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            colors={["#4880D8"]}
            tintColor="#4880D8"
          />
        }
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: "#F3F6FA",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#1F2937"
            />
          </TouchableOpacity>

          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: "#1F2937",
              }}
            >
              Upcoming Appointments
            </Text>

            <Text
              style={{
                marginTop: 3,
                fontSize: 13,
                color: "#6B7280",
              }}
            >
              Your scheduled appointments
            </Text>
          </View>
        </View>

        {/* =====================================================
            APPOINTMENT COUNT
        ===================================================== */}

        {!showLoading && !error && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <MaterialCommunityIcons
              name="calendar-clock"
              size={20}
              color="#4880D8"
            />

            <Text
              style={{
                marginLeft: 8,
                fontSize: 14,
                fontWeight: "600",
                color: "#374151",
              }}
            >
              {upcomingAppointments.length} upcoming{" "}
              {upcomingAppointments.length === 1
                ? "appointment"
                : "appointments"}
            </Text>
          </View>
        )}

        {/* =====================================================
            LOADING
        ===================================================== */}

        {showLoading && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 60,
            }}
          >
            <ActivityIndicator size="large" color="#4880D8" />

            <Text
              style={{
                marginTop: 15,
                fontSize: 14,
                color: "#6B7280",
              }}
            >
              Loading your appointments...
            </Text>
          </View>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && !loading && (
          <View
            style={{
              backgroundColor: "#FEF2F2",
              borderRadius: 12,
              padding: 20,
              marginBottom: 15,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={40}
              color="#DC2626"
            />

            <Text
              style={{
                marginTop: 10,
                fontSize: 15,
                fontWeight: "600",
                color: "#B91C1C",
                textAlign: "center",
              }}
            >
              Unable to load your appointments.
            </Text>

            <Text
              style={{
                marginTop: 5,
                fontSize: 13,
                color: "#7F1D1D",
                textAlign: "center",
              }}
            >
              Please check your connection and try again.
            </Text>

            <TouchableOpacity
              onPress={handleRefresh}
              style={{
                marginTop: 15,
                backgroundColor: "#4880D8",
                paddingHorizontal: 22,
                paddingVertical: 10,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* =====================================================
            NO UPCOMING APPOINTMENTS
        ===================================================== */}

        {!showLoading && !error && upcomingAppointments.length === 0 && (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              paddingHorizontal: 25,
              paddingVertical: 45,
              alignItems: "center",
              justifyContent: "center",
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.08,
              shadowRadius: 3,
            }}
          >
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: "#EEF5FF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="calendar-blank"
                size={36}
                color="#4880D8"
              />
            </View>

            <Text
              style={{
                marginTop: 18,
                fontSize: 18,
                fontWeight: "700",
                color: "#1F2937",
                textAlign: "center",
              }}
            >
              No Upcoming Appointments
            </Text>

            <Text
              style={{
                marginTop: 8,
                fontSize: 14,
                color: "#6B7280",
                textAlign: "center",
                lineHeight: 21,
              }}
            >
              You currently do not have any upcoming appointments. Book an
              appointment with a doctor to get started.
            </Text>

            <TouchableOpacity
              style={{
                marginTop: 22,
                backgroundColor: "#4880D8",
                paddingHorizontal: 25,
                paddingVertical: 12,
                borderRadius: 9,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("DoctorListScreen")}
            >
              <MaterialCommunityIcons
                name="calendar-plus"
                size={20}
                color="#fff"
              />

              <Text
                style={{
                  marginLeft: 8,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                Book Appointment
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* =====================================================
            UPCOMING APPOINTMENTS LIST
        ===================================================== */}

        {!showLoading &&
          !error &&
          upcomingAppointments.map((appointment, index) => (
            <View
              key={appointment?._id || index}
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 18,
                marginBottom: 15,
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.08,
                shadowRadius: 3,
              }}
            >
              {/* =================================================
                  APPOINTMENT NUMBER / UPCOMING
              ================================================= */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    size={19}
                    color="#4880D8"
                  />

                  <Text
                    style={{
                      marginLeft: 7,
                      fontSize: 13,
                      color: "#4880D8",
                      fontWeight: "700",
                    }}
                  >
                    Upcoming Appointment
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: "#ECFDF5",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#059669",
                      fontSize: 11,
                      fontWeight: "700",
                    }}
                  >
                    {appointment?.status || "Scheduled"}
                  </Text>
                </View>
              </View>

              {/* =================================================
                  DOCTOR
              ================================================= */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 28,
                    backgroundColor: "#EEF5FF",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="doctor"
                    size={30}
                    color="#4880D8"
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    marginLeft: 13,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "700",
                      color: "#1F2937",
                    }}
                  >
                    {formatDoctorName(appointment)}
                  </Text>

                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 13,
                      color: "#6B7280",
                    }}
                  >
                    {getDoctorSpecialization(appointment)}
                  </Text>
                </View>
              </View>

              {/* =================================================
                  DIVIDER
              ================================================= */}

              <View
                style={{
                  height: 1,
                  backgroundColor: "#E5E7EB",
                  marginVertical: 15,
                }}
              />

              {/* =================================================
                  DATE
              ================================================= */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 11,
                }}
              >
                <MaterialCommunityIcons
                  name="calendar"
                  size={20}
                  color="#4880D8"
                />

                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: "#9CA3AF",
                    }}
                  >
                    Date
                  </Text>

                  <Text
                    style={{
                      marginTop: 2,
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    {formatDate(appointment.appointmentDate)}
                  </Text>
                </View>
              </View>

              {/* =================================================
                  TIME
              ================================================= */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 11,
                }}
              >
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={20}
                  color="#4880D8"
                />

                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: "#9CA3AF",
                    }}
                  >
                    Time
                  </Text>

                  <Text
                    style={{
                      marginTop: 2,
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    {formatTime(appointment.appointmentTime)}
                  </Text>
                </View>
              </View>

              {/* =================================================
                  CONSULTATION TYPE
              ================================================= */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <MaterialCommunityIcons
                  name={getConsultationIcon(appointment)}
                  size={20}
                  color="#4880D8"
                />

                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: "#9CA3AF",
                    }}
                  >
                    Consultation Type
                  </Text>

                  <Text
                    style={{
                      marginTop: 2,
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    {getConsultationType(appointment)}
                  </Text>
                </View>
              </View>

              {/* =================================================
                  VIEW APPOINTMENT
              ================================================= */}

              <TouchableOpacity
                style={{
                  backgroundColor: "#4880D8",
                  borderRadius: 9,
                  paddingVertical: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => handleViewAppointment(appointment)}
              >
                <MaterialCommunityIcons
                  name="calendar-check"
                  size={20}
                  color="#fff"
                />

                <Text
                  style={{
                    marginLeft: 8,
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  View Appointment
                </Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpcomingAppointmentsScreen;
