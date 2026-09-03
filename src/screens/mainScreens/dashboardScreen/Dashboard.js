import React, { useCallback, useMemo } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";

import { useFocusEffect } from "@react-navigation/native";

import { fetchMyAppointments } from "../../../redux/appointmentSlice";
import { fetchUnreadNotificationCount } from "../../../redux/notificationSlice";

import styles from "./Dashboard.css";

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();

  // =========================================================
  // AUTH
  // =========================================================

  const { user } = useSelector((state) => state.auth);

  // =========================================================
  // APPOINTMENTS
  // =========================================================

  const {
    appointments = [],
    loading,
    error,
  } = useSelector((state) => state.appointment);

  // =========================================================
  // NOTIFICATION
  //

  // const { unreadCount } = useSelector((state) => state.notification);
  const { notifications = [], unreadCount = 0 } = useSelector(
    (state) => state.notification,
  );

  // console.log("=================================");
  // console.log("NOTIFICATION DEBUG");
  // console.log("unreadCount:", unreadCount);
  // console.log("=================================");

  // =========================================================
  // PATIENT NAME
  // =========================================================

  const patientName = user?.fullname || "Patient";

  // =========================================================
  // FETCH PATIENT APPOINTMENTS
  // =========================================================

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchMyAppointments());
      dispatch(fetchUnreadNotificationCount());
    }, [dispatch]),
  );

  // =========================================================
  // GET DOCTOR NAME
  // =========================================================

  const getDoctorName = useCallback((appointment) => {
    const doctorName =
      appointment?.doctor?.user?.fullname ||
      appointment?.doctor?.fullname ||
      "Doctor";

    return doctorName;
  }, []);

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
  // CONVERT APPOINTMENT DATE + TIME TO JAVASCRIPT DATE
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

      // If appointment time exists, apply it.
      if (appointment?.appointmentTime) {
        const timeString = String(appointment.appointmentTime).trim();

        const timeParts = timeString.split(":");

        if (timeParts.length >= 2) {
          const hours = Number(timeParts[0]);
          const minutes = Number(timeParts[1]);
          const seconds = Number(timeParts[2] || 0);

          // Only apply the time when it is valid.
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

    return appointments
      .map((appointment) => {
        const appointmentDate = getAppointmentDateTime(appointment);

        return {
          appointment,
          appointmentDate,
        };
      })
      .filter(({ appointment, appointmentDate }) => {
        // Invalid date
        if (!appointmentDate) {
          return false;
        }

        const status = getStatus(appointment);

        // Do not show cancelled appointments.
        if (status === "cancelled") {
          return false;
        }

        // Do not show completed appointments.
        if (status === "completed") {
          return false;
        }

        // Appointment must still be in the future.
        return appointmentDate >= now;
      })
      .sort((a, b) => {
        return a.appointmentDate - b.appointmentDate;
      })
      .map(({ appointment }) => appointment);
  }, [appointments, getAppointmentDateTime, getStatus]);

  // =========================================================
  // NEXT UPCOMING APPOINTMENT
  // =========================================================

  const upcomingAppointment = upcomingAppointments[0] || null;

  // =========================================================
  // COMPLETED APPOINTMENTS
  // =========================================================

  const completedAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return getStatus(appointment) === "completed";
    });
  }, [appointments, getStatus]);

  // =========================================================
  // TOTAL APPOINTMENTS
  // =========================================================

  const totalAppointments = appointments.length;

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
  // FORMAT DOCTOR NAME
  // =========================================================

  const formatDoctorName = useCallback(
    (appointment) => {
      const name = getDoctorName(appointment);

      if (!name) {
        return "Doctor";
      }

      // Prevent:
      // Dr. Dr. John Smith
      //
      // If backend already returns "Dr. John Smith",
      // don't add another "Dr."

      const lowerName = name.toLowerCase();

      if (lowerName.startsWith("dr.") || lowerName.startsWith("dr ")) {
        return name;
      }

      return `Dr. ${name}`;
    },
    [getDoctorName],
  );

  // =========================================================
  // VIEW APPOINTMENT
  // =========================================================

  const handleViewAppointment = () => {
    if (!upcomingAppointment?._id) {
      return;
    }

    navigation.navigate("AppointmentDetailsScreen", {
      appointmentId: upcomingAppointment._id,
    });
  };

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
        contentContainerStyle={styles.contentContainer}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {user?.profileImage ? (
              <Image
                source={{ uri: user.profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profilePlaceholder}>
                <MaterialCommunityIcons name="account" size={30} color="#fff" />
              </View>
            )}

            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome back</Text>

              <Text style={styles.patientName}>{patientName}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate("Notifications")}
          >
            <MaterialCommunityIcons
              name="bell-outline"
              size={27}
              color="#1F2937"
            />

            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* =====================================================
            UPCOMING APPOINTMENT HEADER
        ===================================================== */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Appointment</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("UpcomingAppointmentsScreen")}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* =====================================================
            UPCOMING APPOINTMENT CARD
        ===================================================== */}

        <View style={styles.appointmentCard}>
          {/* ===================================================
              LOADING
          =================================================== */}

          {showLoading ? (
            <View style={styles.appointmentEmptyIcon}>
              <ActivityIndicator size="large" color="#4880D8" />

              <Text style={styles.appointmentEmptyText}>
                Loading your appointments...
              </Text>
            </View>
          ) : upcomingAppointment ? (
            <>
              {/* ===============================================
                  DOCTOR INFORMATION
              =============================================== */}

              <View style={styles.appointmentTop}>
                <View style={styles.doctorIcon}>
                  <MaterialCommunityIcons
                    name="doctor"
                    size={30}
                    color="#4880D8"
                  />
                </View>

                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>
                    {formatDoctorName(upcomingAppointment)}
                  </Text>

                  <Text style={styles.doctorSpecialization}>
                    {getDoctorSpecialization(upcomingAppointment)}
                  </Text>
                </View>
              </View>

              <View style={styles.appointmentDivider} />

              {/* ===============================================
                  DATE
              =============================================== */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="calendar"
                  size={20}
                  color="#4880D8"
                />

                <Text
                  style={{
                    marginLeft: 10,
                    color: "#374151",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {formatDate(upcomingAppointment.appointmentDate)}
                </Text>
              </View>

              {/* ===============================================
                  TIME
              =============================================== */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={20}
                  color="#4880D8"
                />

                <Text
                  style={{
                    marginLeft: 10,
                    color: "#374151",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {upcomingAppointment.appointmentTime || "Time not specified"}
                </Text>
              </View>

              {/* ===============================================
                  CONSULTATION TYPE
              =============================================== */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <MaterialCommunityIcons
                  name={
                    String(
                      upcomingAppointment.consultationType || "",
                    ).toLowerCase() === "online"
                      ? "video-outline"
                      : "hospital-building"
                  }
                  size={20}
                  color="#4880D8"
                />

                <Text
                  style={{
                    marginLeft: 10,
                    color: "#374151",
                    fontSize: 14,
                  }}
                >
                  {upcomingAppointment.consultationType || "Consultation"}
                </Text>
              </View>

              {/* ===============================================
                  VIEW APPOINTMENT BUTTON
              =============================================== */}

              <TouchableOpacity
                style={styles.bookAppointmentButton}
                onPress={handleViewAppointment}
              >
                <MaterialCommunityIcons
                  name="calendar-check"
                  size={20}
                  color="#fff"
                />

                <Text style={styles.bookAppointmentText}>View Appointment</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* ===============================================
                  NO UPCOMING APPOINTMENT
              =============================================== */}

              <View style={styles.appointmentTop}>
                <View style={styles.doctorIcon}>
                  <MaterialCommunityIcons
                    name="doctor"
                    size={30}
                    color="#4880D8"
                  />
                </View>

                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>No upcoming appointment</Text>

                  <Text style={styles.doctorSpecialization}>
                    Book an appointment with a doctor
                  </Text>
                </View>
              </View>

              <View style={styles.appointmentDivider} />

              <View style={styles.appointmentEmptyIcon}>
                <MaterialCommunityIcons
                  name="calendar-plus"
                  size={28}
                  color="#4880D8"
                />

                <Text style={styles.appointmentEmptyText}>
                  Your upcoming appointment will appear here.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.bookAppointmentButton}
                onPress={() => navigation.navigate("DoctorListScreen")}
              >
                <MaterialCommunityIcons
                  name="calendar-plus"
                  size={20}
                  color="#fff"
                />

                <Text style={styles.bookAppointmentText}>Book Appointment</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* =====================================================
            ERROR MESSAGE
        ===================================================== */}

        {error && !loading && (
          <View
            style={{
              marginTop: 10,
              marginBottom: 5,
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                color: "#DC2626",
                fontSize: 13,
              }}
            >
              Unable to load your appointments.
            </Text>
          </View>
        )}

        {/* =====================================================
            APPOINTMENT STATISTICS
        ===================================================== */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Appointments Stat</Text>
        </View>

        <View style={styles.summaryContainer}>
          {/* ===================================================
              UPCOMING
          =================================================== */}

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={25}
                color="#4880D8"
              />
            </View>

            <Text style={styles.summaryNumber}>
              {upcomingAppointments.length}
            </Text>

            <Text style={styles.summaryLabel}>Upcoming</Text>
          </View>

          {/* ===================================================
              COMPLETED
          =================================================== */}

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <MaterialCommunityIcons
                name="calendar-check"
                size={25}
                color="#10B981"
              />
            </View>

            <Text style={styles.summaryNumber}>
              {completedAppointments.length}
            </Text>

            <Text style={styles.summaryLabel}>Completed</Text>
          </View>

          {/* ===================================================
              TOTAL
          =================================================== */}

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <MaterialCommunityIcons
                name="calendar-multiple"
                size={25}
                color="#8B5CF6"
              />
            </View>

            <Text style={styles.summaryNumber}>{totalAppointments}</Text>

            <Text style={styles.summaryLabel}>Total</Text>
          </View>
        </View>

        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <View style={styles.quickActionsContainer}>
          {/* ===================================================
              BOOK APPOINTMENT
          =================================================== */}

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate("DoctorListScreen")}
          >
            <View style={styles.quickActionIcon}>
              <MaterialCommunityIcons
                name="calendar-plus"
                size={28}
                color="#4880D8"
              />
            </View>

            <Text style={styles.quickActionText}>Book Appointment</Text>
          </TouchableOpacity>

          {/* ===================================================
              MY APPOINTMENTS
          =================================================== */}

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate("MyAppointmentsScreen")}
          >
            <View style={styles.quickActionIcon}>
              <MaterialCommunityIcons
                name="calendar-check"
                size={28}
                color="#4880D8"
              />
            </View>

            <Text style={styles.quickActionText}>My Appointment</Text>
          </TouchableOpacity>

          {/* ===================================================
              PRESCRIPTIONS
          =================================================== */}

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate("PatientPrescriptions")}
          >
            <View style={styles.quickActionIcon}>
              <MaterialCommunityIcons
                name="prescription"
                size={28}
                color="#4880D8"
              />
            </View>

            <Text style={styles.quickActionText}>Prescriptions</Text>
          </TouchableOpacity>

          {/* ===================================================
              MEDICAL RECORDS
          =================================================== */}

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() =>
              navigation.navigate("PatientMedicalRecord", {
                patientId: user?._id,
              })
            }
          >
            <View style={styles.quickActionIcon}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={28}
                color="#4880D8"
              />
            </View>

            <Text style={styles.quickActionText}>Medical Records</Text>
          </TouchableOpacity>
        </View>

        {/* =====================================================
            HEALTH TIP
        ===================================================== */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Health Tip</Text>
        </View>

        <View style={styles.healthTipCard}>
          <View style={styles.healthTipIcon}>
            <MaterialCommunityIcons name="heart-pulse" size={30} color="#fff" />
          </View>

          <View style={styles.healthTipContent}>
            <Text style={styles.healthTipTitle}>Take care of your health</Text>

            <Text style={styles.healthTipText}>
              Drink enough water, eat a balanced diet, get enough rest, and
              attend your scheduled medical appointments.
            </Text>
          </View>
        </View>

        {/* =====================================================
            EMERGENCY
        ===================================================== */}

        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => {
            // Add emergency call/navigation here later.
          }}
        >
          <View style={styles.emergencyIcon}>
            <MaterialCommunityIcons name="phone-alert" size={28} color="#fff" />
          </View>

          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyTitle}>Emergency</Text>

            <Text style={styles.emergencyText}>
              Need urgent medical assistance?
            </Text>
          </View>

          <MaterialCommunityIcons name="chevron-right" size={28} color="#fff" />
        </TouchableOpacity>

        {/* =====================================================
            BOTTOM SPACING
        ===================================================== */}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
