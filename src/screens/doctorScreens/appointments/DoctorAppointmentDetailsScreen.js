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

//   const prescriptionId =
//     appointment?.prescription?._id || appointment?.prescriptionId || null;
//   console.log("PRESCRIPTION ID:", prescriptionId);

//   // Trigger the API request when appointmentId changes
//   useEffect(() => {
//     dispatch(fetchAppointmentById(appointmentId));
//   }, [dispatch, appointmentId]);

//   // Log when the Redux store updates with the retrieved data
//   useEffect(() => {
//     console.log("APPOINTMENT UPDATED:", JSON.stringify(appointment, null, 2));
//   }, [appointment]);

//   const normalizedStatus = appointment?.status
//     ? String(appointment.status).toLowerCase().trim()
//     : "";

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
//       case "Pending":
//       case "pending":
//         return "#F59E0B";
//       case "Accepted":
//       case "confirmed":
//         return "#2563EB";
//       case "Completed":
//       case "completed":
//         return "#10B981";
//       case "Cancelled":
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

//         {/* <TouchableOpacity
//           style={styles.prescriptionButton}
//           onPress={() =>
//             navigation.navigate("PrescriptionDetails", {
//               prescriptionId,
//             })
//           }
//         >
//           <Text style={styles.prescriptionButtonTitle}>View Prescription</Text>

//           <MaterialCommunityIcons
//             name="chevron-right"
//             size={28}
//             color="#4880D8"
//           />
//         </TouchableOpacity> */}

//         {/* ==========================================
//     PRESCRIPTION
// ========================================== */}
//         {/*
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Prescription</Text>

//           {prescriptionId ? (
//             <TouchableOpacity
//               style={styles.prescriptionButton}
//               activeOpacity={0.8}
//               onPress={() =>
//                 navigation.navigate("PrescriptionDetails", {
//                   prescriptionId: prescriptionId,
//                 })
//               }
//             >
//               <View style={styles.prescriptionButtonLeft}>
//                 <View style={styles.prescriptionIcon}>
//                   <MaterialCommunityIcons
//                     name="file-document-outline"
//                     size={24}
//                     color="#4880D8"
//                   />
//                 </View>

//                 <View>
//                   <Text style={styles.prescriptionButtonTitle}>
//                     View Prescription
//                   </Text>

//                   <Text style={styles.prescriptionButtonSubtitle}>
//                     View prescribed medications and instructions
//                   </Text>
//                 </View>
//               </View>

//               <MaterialCommunityIcons
//                 name="chevron-right"
//                 size={28}
//                 color="#4880D8"
//               />
//             </TouchableOpacity>
//           ) : (
//             <View style={styles.noPrescription}>
//               <MaterialCommunityIcons
//                 name="file-document-outline"
//                 size={35}
//                 color="#9CA3AF"
//               />

//               <View style={styles.noPrescriptionTextContainer}>
//                 <Text style={styles.noPrescriptionTitle}>No Prescription</Text>

//                 <Text style={styles.noPrescriptionText}>
//                   No prescription has been created for this appointment.
//                 </Text>
//               </View>
//             </View>
//           )}
//         </View> */}

//         {/* ==========================================
//     PRESCRIPTION
// ========================================== */}

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Prescription</Text>

//           {prescriptionId ? (
//             <TouchableOpacity
//               style={styles.prescriptionButton}
//               activeOpacity={0.8}
//               onPress={() =>
//                 navigation.navigate("PrescriptionDetails", {
//                   prescriptionId: prescriptionId,
//                 })
//               }
//             >
//               <View style={styles.prescriptionButtonLeft}>
//                 <View style={styles.prescriptionIcon}>
//                   <MaterialCommunityIcons
//                     name="file-document-outline"
//                     size={24}
//                     color="#4880D8"
//                   />
//                 </View>

//                 <View>
//                   <Text style={styles.prescriptionButtonTitle}>
//                     View Prescription
//                   </Text>

//                   <Text style={styles.prescriptionButtonSubtitle}>
//                     View prescribed medications and instructions
//                   </Text>
//                 </View>
//               </View>

//               <MaterialCommunityIcons
//                 name="chevron-right"
//                 size={28}
//                 color="#4880D8"
//               />
//             </TouchableOpacity>
//           ) : (
//             <View style={styles.noPrescription}>
//               <MaterialCommunityIcons
//                 name="file-document-outline"
//                 size={35}
//                 color="#9CA3AF"
//               />

//               <View style={styles.noPrescriptionTextContainer}>
//                 <Text style={styles.noPrescriptionTitle}>No Prescription</Text>

//                 <Text style={styles.noPrescriptionText}>
//                   No prescription has been created for this appointment.
//                 </Text>
//               </View>
//             </View>
//           )}
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

//         {/* Consultation Notes Button */}
//         <TouchableOpacity
//           style={styles.confirmButton || styles.recordButton}
//           onPress={() =>
//             navigation.navigate("AddConsultationNoteScreen", {
//               appointmentId: appointment._id,
//               patientId: patient._id,
//             })
//           }
//         >
//           <MaterialCommunityIcons
//             name="notebook-edit-outline"
//             size={22}
//             color="#fff"
//           />
//           <Text style={styles.buttonText}>Consultation Notes</Text>
//         </TouchableOpacity>

//         {/* <TouchableOpacity
//           style={styles.buttonPrescibe}
//           onPress={() =>
//             navigation.navigate("WritePrescriptionScreen", {
//               appointmentId: appointment._id,
//               patientId: appointment.patient._id,
//             })
//           }
//         >
//           <MaterialCommunityIcons
//             name="notebook-edit-outline"
//             size={22}
//             color="#fff"
//           />
//           <Text style={styles.buttonText}>Write Prescription</Text>
//         </TouchableOpacity> */}

//         {/* Quick action buttons depending on status */}
//         {(appointment.status === "pending" ||
//           appointment.status === "Pending") && (
//           <TouchableOpacity
//             style={styles.cancelButton}
//             onPress={() => updateStatus("Cancelled")}
//           >
//             <MaterialCommunityIcons
//               name="close-circle"
//               color="#fff"
//               size={22}
//             />
//             <Text style={styles.buttonText}>Cancel Appointment</Text>
//           </TouchableOpacity>
//         )}

//         {(appointment.status === "confirmed" ||
//           appointment.status === "Accepted") && (
//           <>
//             <TouchableOpacity
//               style={styles.completeButton}
//               onPress={() => updateStatus("Completed")}
//             >
//               <MaterialCommunityIcons name="check-all" color="#fff" size={22} />
//               <Text style={styles.buttonText}>Complete Appointment</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => updateStatus("Cancelled")}
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
//         {/* ==========================================
//     CREATE MEDICAL RECORD
// ========================================== */}

//         {appointment &&
//           (normalizedStatus === "accepted" ||
//             normalizedStatus === "completed") && (
//             <TouchableOpacity
//               style={styles.medicalRecordButton}
//               // style={styles.cancelButton}
//               onPress={() =>
//                 navigation.navigate("CreateMedicalRecordScreen", {
//                   appointmentId: appointment._id,
//                 })
//               }
//             >
//               <MaterialCommunityIcons
//                 name="clipboard-pulse-outline"
//                 size={22}
//                 color="#fff"
//               />

//               <Text style={styles.buttonText}>Create Medical Record</Text>
//             </TouchableOpacity>
//           )}
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
//           style={styles.buttonPrescibe}
//           // style={styles.confirmButton || styles.recordButton}
//           onPress={() =>
//             navigation.navigate("WritePrescriptionScreen", {
//               appointmentId: appointment._id,
//               patientId: appointment.patient._id,
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

  // =========================================================
  // REDUX
  // =========================================================

  const { appointment, loading, error } = useSelector(
    (state) => state.appointment,
  );

  // =========================================================
  // LOCAL STATE
  // =========================================================

  const [showStatusModal, setShowStatusModal] = useState(false);

  // =========================================================
  // FETCH APPOINTMENT
  // =========================================================

  useEffect(() => {
    if (appointmentId) {
      dispatch(fetchAppointmentById(appointmentId));
    }
  }, [dispatch, appointmentId]);

  // =========================================================
  // DEBUG
  // =========================================================

  useEffect(() => {
    console.log("APPOINTMENT UPDATED:", JSON.stringify(appointment, null, 2));
  }, [appointment]);

  // =========================================================
  // PRESCRIPTION
  // =========================================================
  // Prescription is OPTIONAL.
  //
  // If there is no prescription:
  // appointment.prescription === null
  //
  // That is NOT an error.
  // =========================================================

  const prescriptionId =
    appointment?.prescription?._id ||
    appointment?.prescription?.id ||
    appointment?.prescriptionId ||
    null;

  console.log("PRESCRIPTION ID:", prescriptionId);

  // =========================================================
  // NORMALIZED STATUS
  // =========================================================

  const normalizedStatus = appointment?.status
    ? String(appointment.status).toLowerCase().trim()
    : "";

  // =========================================================
  // UPDATE STATUS
  // =========================================================

  const updateStatus = (status) => {
    Alert.alert("Update Appointment", `Mark appointment as ${status}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },

      {
        text: "Yes",

        onPress: async () => {
          try {
            await dispatch(
              updateAppointmentStatus({
                id: appointmentId,
                status,
              }),
            ).unwrap();

            // Fetch the appointment again so that the
            // complete populated patient/doctor information
            // is available after the status update.
            dispatch(fetchAppointmentById(appointmentId));
          } catch (error) {
            console.log("UPDATE APPOINTMENT STATUS ERROR:", error);

            Alert.alert(
              "Update Failed",
              error?.message || "Unable to update appointment status.",
            );
          }
        },
      },
    ]);
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading && !appointment) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4880D8" />
      </SafeAreaView>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error && !appointment) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={60}
          color="#EF4444"
        />

        <Text
          style={{
            marginTop: 15,
            fontSize: 16,
            color: "#374151",
            textAlign: "center",
            paddingHorizontal: 25,
          }}
        >
          {typeof error === "string"
            ? error
            : error?.message || "Unable to load appointment."}
        </Text>

        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: "#4880D8",
            paddingHorizontal: 25,
            paddingVertical: 12,
            borderRadius: 8,
          }}
          onPress={() => dispatch(fetchAppointmentById(appointmentId))}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
            }}
          >
            Try Again
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // =========================================================
  // SAFETY CHECK
  // =========================================================

  if (!appointment) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <MaterialCommunityIcons
          name="calendar-remove"
          size={60}
          color="#9CA3AF"
        />

        <Text
          style={{
            marginTop: 15,
            fontSize: 16,
            color: "#6B7280",
          }}
        >
          Appointment not found.
        </Text>
      </SafeAreaView>
    );
  }

  // =========================================================
  // PATIENT / DOCTOR SAFETY
  // =========================================================

  const patient = appointment.patient || {};

  const doctor = appointment.doctor || {};

  const doctorUser = doctor.user || {};

  // =========================================================
  // STATUS COLOR
  // =========================================================

  const statusColor = () => {
    switch (normalizedStatus) {
      case "pending":
        return "#F59E0B";

      case "accepted":
      case "confirmed":
        return "#2563EB";

      case "rejected":
        return "#EF4444";

      case "completed":
        return "#10B981";

      case "cancelled":
      case "canceled":
        return "#EF4444";

      case "no show":
        return "#6B7280";

      default:
        return "#6B7280";
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* =====================================================
            HEADER
        ===================================================== */}

        <Text style={styles.header}>Appointment Details</Text>

        {/* =====================================================
            PATIENT INFORMATION
        ===================================================== */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Patient Information</Text>

          <Text style={styles.label}>Full Name</Text>

          <Text style={styles.value}>
            {patient.fullname || "Not available"}
          </Text>

          <Text style={styles.label}>Email</Text>

          <Text style={styles.value}>{patient.email || "Not available"}</Text>

          <Text style={styles.label}>Phone</Text>

          <Text style={styles.value}>{patient.phone || "Not available"}</Text>
        </View>

        {/* =====================================================
            DOCTOR INFORMATION
        ===================================================== */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Doctor</Text>

          <Text style={styles.value}>
            {doctorUser.fullname
              ? `Dr. ${doctorUser.fullname}`
              : "Doctor information unavailable"}
          </Text>

          <Text style={styles.value}>
            {doctor.specialization || "Specialization unavailable"}
          </Text>
        </View>

        {/* =====================================================
            APPOINTMENT INFORMATION
        ===================================================== */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Appointment</Text>

          <Text style={styles.label}>Date</Text>

          <Text style={styles.value}>
            {appointment.appointmentDate || "Not available"}
          </Text>

          <Text style={styles.label}>Time</Text>

          <Text style={styles.value}>
            {appointment.appointmentTime || "Not available"}
          </Text>

          <Text style={styles.label}>Consultation Type</Text>

          <Text style={styles.value}>
            {appointment.consultationType || "Not available"}
          </Text>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: statusColor(),
              },
            ]}
          >
            <Text style={styles.statusText}>
              {appointment.status || "Unknown"}
            </Text>
          </View>
        </View>

        {/* =====================================================
            SYMPTOMS
        ===================================================== */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Symptoms</Text>

          <Text style={styles.value}>
            {appointment.symptoms || "No symptoms provided."}
          </Text>
        </View>

        {/* =====================================================
            REASON
        ===================================================== */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Reason</Text>

          <Text style={styles.value}>
            {appointment.reason || "No reason provided."}
          </Text>
        </View>

        {/* =====================================================
            PRESCRIPTION
        ===================================================== */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Prescription</Text>

          {prescriptionId ? (
            <TouchableOpacity
              style={styles.prescriptionButton}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("PrescriptionDetails", {
                  prescriptionId: prescriptionId,
                })
              }
            >
              <View style={styles.prescriptionButtonLeft}>
                <View style={styles.prescriptionIcon}>
                  <MaterialCommunityIcons
                    name="file-document-outline"
                    size={24}
                    color="#4880D8"
                  />
                </View>

                <View>
                  <Text style={styles.prescriptionButtonTitle}>
                    View Prescription
                  </Text>

                  <Text style={styles.prescriptionButtonSubtitle}>
                    View prescribed medications and instructions
                  </Text>
                </View>
              </View>

              <MaterialCommunityIcons
                name="chevron-right"
                size={28}
                color="#4880D8"
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.noPrescription}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={35}
                color="#9CA3AF"
              />

              <View style={styles.noPrescriptionTextContainer}>
                <Text style={styles.noPrescriptionTitle}>No Prescription</Text>

                <Text style={styles.noPrescriptionText}>
                  No prescription has been created for this appointment.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* =====================================================
            UPDATE APPOINTMENT STATUS
        ===================================================== */}

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

        {/* =====================================================
            CONSULTATION NOTES
        ===================================================== */}

        <TouchableOpacity
          style={styles.confirmButton}
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

        {/* =====================================================
            CANCEL PENDING APPOINTMENT
        ===================================================== */}

        {normalizedStatus === "pending" && (
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

        {/* =====================================================
            ACCEPTED APPOINTMENT ACTIONS
        ===================================================== */}

        {(normalizedStatus === "accepted" ||
          normalizedStatus === "confirmed") && (
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

        {/* =====================================================
            CREATE MEDICAL RECORD
        ===================================================== */}

        {(normalizedStatus === "accepted" ||
          normalizedStatus === "completed") && (
          <TouchableOpacity
            style={styles.medicalRecordButton}
            onPress={() =>
              navigation.navigate("CreateMedicalRecordScreen", {
                appointmentId: appointment._id,
              })
            }
          >
            <MaterialCommunityIcons
              name="clipboard-pulse-outline"
              size={22}
              color="#fff"
            />

            <Text style={styles.buttonText}>Create Medical Record</Text>
          </TouchableOpacity>
        )}

        {/* =====================================================
            VIEW MEDICAL RECORD
        ===================================================== */}

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

        {/* =====================================================
            WRITE PRESCRIPTION
        ===================================================== */}

        <TouchableOpacity
          style={styles.buttonPrescibe}
          onPress={() =>
            navigation.navigate("WritePrescriptionScreen", {
              appointmentId: appointment._id,

              patientId: patient._id,
            })
          }
        >
          <MaterialCommunityIcons name="prescription" size={22} color="#fff" />

          <Text style={styles.buttonText}>Write Prescription</Text>
        </TouchableOpacity>

        {/* =====================================================
            BOTTOM SPACE
        ===================================================== */}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* =======================================================
          APPOINTMENT STATUS MODAL
      ======================================================= */}

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
