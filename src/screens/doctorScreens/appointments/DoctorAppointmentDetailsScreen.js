// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchAppointmentById,
//   updateAppointmentStatus,
// } from "../../../redux/appointmentSlice";

// import styles from "./DoctorAppointmentDetailsScreen.css";
// import AppointmentStatusModal from "../../../../components/appointments/AppointmentStatusModal";

// const DoctorAppointmentDetailsScreen = ({ navigation, route }) => {
//   const dispatch = useDispatch();
//   const { appointmentId } = route.params;

//   const { appointment, loading, error } = useSelector(
//     (state) => state.appointment,
//   );

//   const [showStatusModal, setShowStatusModal] = useState(false);

//   useEffect(() => {
//     dispatch(fetchAppointmentById(appointmentId));
//   }, [dispatch, appointmentId]);

//   const updateStatus = (status) => {
//     Alert.alert("Update Appointment", `Mark appointment as ${status}?`, [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {
//         text: "Yes",
//         onPress: async () => {
//           await dispatch(
//             updateAppointmentStatus({
//               id: appointmentId,
//               status,
//             }),
//           );

//           dispatch(fetchAppointmentById(appointmentId));
//         },
//       },
//     ]);
//   };

//   if (loading || !appointment) {
//     return (
//       <SafeAreaView style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#4880D8" />
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.loaderContainer}>
//         <Text>{error}</Text>
//       </SafeAreaView>
//     );
//   }

//   const patient = appointment.patient || {};
//   const doctor = appointment.doctor || {};
//   const doctorUser = doctor.user || {};

//   const statusColor = () => {
//     switch (appointment.status) {
//       case "pending":
//         return "#F59E0B";
//       case "confirmed":
//         return "#2563EB";
//       case "completed":
//         return "#10B981";
//       case "cancelled":
//         return "#EF4444";
//       default:
//         return "#6B7280";
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <Text style={styles.header}>Appointment Details</Text>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Patient Information</Text>
//           <Text style={styles.label}>Full Name</Text>
//           <Text style={styles.value}>{patient.fullname}</Text>

//           <Text style={styles.label}>Email</Text>
//           <Text style={styles.value}>{patient.email}</Text>

//           <Text style={styles.label}>Phone</Text>
//           <Text style={styles.value}>{patient.phone}</Text>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Doctor</Text>
//           <Text style={styles.value}>Dr. {doctorUser.fullname}</Text>
//           <Text style={styles.value}>{doctor.specialization}</Text>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Appointment</Text>
//           <Text style={styles.label}>Date</Text>
//           <Text style={styles.value}>{appointment.appointmentDate}</Text>

//           <Text style={styles.label}>Time</Text>
//           <Text style={styles.value}>{appointment.appointmentTime}</Text>

//           <Text style={styles.label}>Consultation Type</Text>
//           <Text style={styles.value}>{appointment.consultationType}</Text>

//           <View
//             style={[styles.statusBadge, { backgroundColor: statusColor() }]}
//           >
//             <Text style={styles.statusText}>{appointment.status}</Text>
//           </View>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Symptoms</Text>
//           <Text style={styles.value}>
//             {appointment.symptoms || "No symptoms provided."}
//           </Text>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Reason</Text>
//           <Text style={styles.value}>
//             {appointment.reason || "No reason provided."}
//           </Text>
//         </View>

//         {/* Update Status Button - Rendered unconditionally */}
//         <TouchableOpacity
//           style={styles.confirmButton}
//           onPress={() => setShowStatusModal(true)}
//         >
//           <MaterialCommunityIcons
//             name="clipboard-edit"
//             size={22}
//             color="#fff"
//           />
//           <Text style={styles.buttonText}>Update Appointment Status</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() =>
//             navigation.navigate("AddConsultationNoteScreen", {
//               appointmentId: appointment._id,
//               patientId: appointment.patient._id,
//             })
//           }
//         >
//           <Text style={styles.buttonText}>Consultation Notes</Text>
//         </TouchableOpacity>

//         {/* Quick action buttons depending on status */}
//         {appointment.status === "pending" && (
//           <TouchableOpacity
//             style={styles.cancelButton}
//             onPress={() => updateStatus("cancelled")}
//           >
//             <MaterialCommunityIcons
//               name="close-circle"
//               color="#fff"
//               size={22}
//             />
//             <Text style={styles.buttonText}>Cancel Appointment</Text>
//           </TouchableOpacity>
//         )}

//         {appointment.status === "confirmed" && (
//           <>
//             <TouchableOpacity
//               style={styles.completeButton}
//               onPress={() => updateStatus("completed")}
//             >
//               <MaterialCommunityIcons name="check-all" color="#fff" size={22} />
//               <Text style={styles.buttonText}>Complete Appointment</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => updateStatus("cancelled")}
//             >
//               <MaterialCommunityIcons
//                 name="close-circle"
//                 color="#fff"
//                 size={22}
//               />
//               <Text style={styles.buttonText}>Cancel Appointment</Text>
//             </TouchableOpacity>
//           </>
//         )}

//         <TouchableOpacity
//           style={styles.recordButton}
//           onPress={() =>
//             navigation.navigate("PatientMedicalRecord", {
//               patientId: patient._id,
//             })
//           }
//         >
//           <MaterialCommunityIcons
//             name="file-document-outline"
//             size={22}
//             color="#fff"
//           />
//           <Text style={styles.buttonText}>View Medical Record</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.prescriptionButton}
//           onPress={() =>
//             navigation.navigate("PrescriptionScreen", {
//               appointmentId: appointment._id,
//             })
//           }
//         >
//           <MaterialCommunityIcons name="prescription" size={22} color="#fff" />
//           <Text style={styles.buttonText}>Write Prescription</Text>
//         </TouchableOpacity>

//         <View style={{ height: 40 }} />
//       </ScrollView>

//       <AppointmentStatusModal
//         visible={showStatusModal}
//         onClose={() => setShowStatusModal(false)}
//         appointmentId={appointment._id}
//         currentStatus={appointment.status}
//       />
//     </SafeAreaView>
//   );
// };

// export default DoctorAppointmentDetailsScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAppointmentById,
  updateAppointmentStatus,
} from "../../../redux/appointmentSlice";

import styles from "./DoctorAppointmentDetailsScreen.css";
import AppointmentStatusModal from "../../../../components/appointments/AppointmentStatusModal";

const DoctorAppointmentDetailsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { appointmentId } = route.params;

  const { appointment, loading, error } = useSelector(
    (state) => state.appointment,
  );

  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAppointmentById(appointmentId));
  }, [dispatch, appointmentId]);

  const updateStatus = (status) => {
    Alert.alert("Update Appointment", `Mark appointment as ${status}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await dispatch(
            updateAppointmentStatus({
              id: appointmentId,
              status,
            }),
          );

          dispatch(fetchAppointmentById(appointmentId));
        },
      },
    ]);
  };

  if (loading || !appointment) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4880D8" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  const patient = appointment.patient || {};
  const doctor = appointment.doctor || {};
  const doctorUser = doctor.user || {};

  const statusColor = () => {
    switch (appointment.status) {
      case "Pending":
      case "pending":
        return "#F59E0B";
      case "Accepted":
      case "confirmed":
        return "#2563EB";
      case "Completed":
      case "completed":
        return "#10B981";
      case "Cancelled":
      case "cancelled":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Appointment Details</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{patient.fullname}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{patient.email}</Text>

          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{patient.phone}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Doctor</Text>
          <Text style={styles.value}>Dr. {doctorUser.fullname}</Text>
          <Text style={styles.value}>{doctor.specialization}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Appointment</Text>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{appointment.appointmentDate}</Text>

          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>{appointment.appointmentTime}</Text>

          <Text style={styles.label}>Consultation Type</Text>
          <Text style={styles.value}>{appointment.consultationType}</Text>

          <View
            style={[styles.statusBadge, { backgroundColor: statusColor() }]}
          >
            <Text style={styles.statusText}>{appointment.status}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Symptoms</Text>
          <Text style={styles.value}>
            {appointment.symptoms || "No symptoms provided."}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Reason</Text>
          <Text style={styles.value}>
            {appointment.reason || "No reason provided."}
          </Text>
        </View>

        {/* Update Status Button - Rendered unconditionally */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => setShowStatusModal(true)}
        >
          <MaterialCommunityIcons
            name="clipboard-edit"
            size={22}
            color="#fff"
          />
          <Text style={styles.buttonText}>Update Appointment Status</Text>
        </TouchableOpacity>

        {/* Consultation Notes Button */}
        <TouchableOpacity
          style={styles.confirmButton || styles.recordButton}
          onPress={() =>
            navigation.navigate("AddConsultationNoteScreen", {
              appointmentId: appointment._id,
              patientId: patient._id,
            })
          }
        >
          <MaterialCommunityIcons
            name="notebook-edit-outline"
            size={22}
            color="#fff"
          />
          <Text style={styles.buttonText}>Consultation Notes</Text>
        </TouchableOpacity>

        {/* Quick action buttons depending on status */}
        {(appointment.status === "pending" ||
          appointment.status === "Pending") && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => updateStatus("Cancelled")}
          >
            <MaterialCommunityIcons
              name="close-circle"
              color="#fff"
              size={22}
            />
            <Text style={styles.buttonText}>Cancel Appointment</Text>
          </TouchableOpacity>
        )}

        {(appointment.status === "confirmed" ||
          appointment.status === "Accepted") && (
          <>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => updateStatus("Completed")}
            >
              <MaterialCommunityIcons name="check-all" color="#fff" size={22} />
              <Text style={styles.buttonText}>Complete Appointment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => updateStatus("Cancelled")}
            >
              <MaterialCommunityIcons
                name="close-circle"
                color="#fff"
                size={22}
              />
              <Text style={styles.buttonText}>Cancel Appointment</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={styles.recordButton}
          onPress={() =>
            navigation.navigate("PatientMedicalRecord", {
              patientId: patient._id,
            })
          }
        >
          <MaterialCommunityIcons
            name="file-document-outline"
            size={22}
            color="#fff"
          />
          <Text style={styles.buttonText}>View Medical Record</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.prescriptionButton}
          onPress={() =>
            navigation.navigate("PrescriptionScreen", {
              appointmentId: appointment._id,
            })
          }
        >
          <MaterialCommunityIcons name="prescription" size={22} color="#fff" />
          <Text style={styles.buttonText}>Write Prescription</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      <AppointmentStatusModal
        visible={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        appointmentId={appointment._id}
        currentStatus={appointment.status}
      />
    </SafeAreaView>
  );
};

export default DoctorAppointmentDetailsScreen;