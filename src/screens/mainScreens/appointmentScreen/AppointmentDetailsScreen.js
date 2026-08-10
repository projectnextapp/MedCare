

import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAppointmentById,
  updateAppointmentStatus,
} from "../../../redux/appointmentSlice";
import styles from "./AppointmentDetailsScreen.css";

const AppointmentDetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { appointmentId } = route.params || {};

  const { appointment, loading } = useSelector((state) => state.appointment);

  useEffect(() => {
    if (appointmentId) {
      dispatch(fetchAppointmentById(appointmentId));
    }
  }, [dispatch, appointmentId]);

  const normalizedStatus = appointment?.status
    ? String(appointment.status).toLowerCase().trim()
    : "";

  const handleCancel = () => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await dispatch(
                updateAppointmentStatus({
                  id: appointmentId,
                  status: "cancelled",
                }),
              ).unwrap();

              Alert.alert("Success", "Appointment cancelled successfully.", [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } catch (err) {
              Alert.alert(
                "Error",
                err?.message || "Failed to cancel appointment.",
              );
            }
          },
        },
      ],
    );
  };

  const getStatusColor = () => {
    switch (normalizedStatus) {
      case "confirmed":
        return "#22C55E";
      case "completed":
        return "#2563EB";
      case "cancelled":
        return "#DC2626";
      case "rejected":
        return "#991B1B";
      default:
        return "#F59E0B";
    }
  };

  if (loading || !appointment) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4880D8" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Doctor Card */}
        <View style={styles.card}>
          <Image
            source={{
              uri:
                appointment.doctor?.user?.profileImage ||
                "https://via.placeholder.com/150",
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>
            Dr. {appointment.doctor?.user?.fullname}
          </Text>

          <Text style={styles.specialization}>
            {appointment.doctor?.specialization}
          </Text>

          <Text style={styles.hospital}>{appointment.doctor?.hospital}</Text>
        </View>

        {/* Details Card */}
        <View style={styles.card}>
          <View
            style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}
          >
            <Text style={styles.statusText}>{appointment.status}</Text>
          </View>

          <Text style={styles.label}>Appointment ID</Text>
          <Text style={styles.value}>{appointment._id}</Text>

          <Text style={styles.label}>Appointment Date</Text>
          <Text style={styles.value}>
            {new Date(appointment.appointmentDate).toDateString()}
          </Text>

          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>{appointment.appointmentTime}</Text>

          <Text style={styles.label}>Consultation Type</Text>
          <Text style={styles.value}>{appointment.consultationType}</Text>

          <Text style={styles.label}>Reason</Text>
          <Text style={styles.value}>{appointment.reason}</Text>

          <Text style={styles.label}>Symptoms</Text>
          <Text style={styles.value}>{appointment.symptoms || "None"}</Text>
        </View>

        {/* Reschedule Button (Renders for pending, confirmed, or default statuses) */}
        {(normalizedStatus === "pending" ||
          normalizedStatus === "confirmed" ||
          !normalizedStatus) && (
          <TouchableOpacity
            style={styles.rescheduleButton}
            onPress={() =>
              // navigation.navigate("DoctorStack", {
              //   screen: "RescheduleAppointmentScreen",
              //   params: {
              //     doctorId: appointment.doctor?._id,
              //     rescheduleAppointmentId: appointment._id,
              //   },
              // })

              navigation.navigate("RescheduleAppointmentScreen", {
                doctorId: appointment.doctor?._id,
                appointmentId: appointment._id,
              })
            }
          >
            <MaterialCommunityIcons
              name="calendar-edit"
              size={20}
              color="#fff"
            />
            <Text style={styles.buttonText}>Reschedule Appointment</Text>
          </TouchableOpacity>
        )}

        {/* Video Consultation */}
        {appointment.consultationType === "Video" &&
          normalizedStatus === "confirmed" && (
            <TouchableOpacity style={styles.videoButton}>
              <MaterialCommunityIcons name="video" size={22} color="#fff" />
              <Text style={styles.buttonText}>Join Video Consultation</Text>
            </TouchableOpacity>
          )}

        {/* View Prescription */}
        {normalizedStatus === "completed" && (
          <TouchableOpacity style={styles.prescriptionButton}>
            <MaterialCommunityIcons
              name="file-document"
              size={20}
              color="#fff"
            />
            <Text style={styles.buttonText}>View Prescription</Text>
          </TouchableOpacity>
        )}

        {/* Cancel Button */}
        {normalizedStatus === "pending" && (
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color="#fff"
            />
            <Text style={styles.buttonText}>Cancel Appointment</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentDetailsScreen;10
