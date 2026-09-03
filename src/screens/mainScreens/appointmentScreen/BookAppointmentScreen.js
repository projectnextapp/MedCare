// import React, { useEffect, useMemo, useState } from "react";

// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
// } from "react-native";

// import { SafeAreaView } from "react-native-safe-area-context";

// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// import { Picker } from "@react-native-picker/picker";

// import { useDispatch, useSelector } from "react-redux";

// import { fetchDoctorById } from "../../../redux/doctorSlice";

// import { createAppointment } from "../../../redux/appointmentSlice";

// import styles from "./BookAppointmentScreen.css";

// const BookAppointmentScreen = ({ route, navigation }) => {
//   const dispatch = useDispatch();

//   const { doctorId } = route.params;

//   const { doctor, loading } = useSelector((state) => state.doctor);

//   const { loading: bookingLoading } = useSelector(
//     (state) => state.appointment,
//   );

//   // =========================================================
//   // SELECTED APPOINTMENT
//   // =========================================================

//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   // =========================================================
//   // OTHER APPOINTMENT INFORMATION
//   // =========================================================

//   const [consultationType, setConsultationType] = useState("Physical");

//   const [reason, setReason] = useState("");

//   const [symptoms, setSymptoms] = useState("");

//   // =========================================================
//   // FETCH DOCTOR
//   // =========================================================

//   useEffect(() => {
//     dispatch(fetchDoctorById(doctorId));
//   }, [dispatch, doctorId]);

//   // =========================================================
//   // PARSE TIME
//   //
//   // Supports:
//   // 09:00
//   // 9:00
//   // 09:00 AM
//   // 9:00 AM
//   // 09:00 PM
//   // 9:00 PM
//   // =========================================================

//   const parseTimeToMinutes = (time) => {
//     if (!time) {
//       return null;
//     }

//     const value = String(time).trim().toLowerCase();

//     const match = value.match(/^(\d{1,2}):(\d{2})\s*(am|pm)?$/);

//     if (!match) {
//       return null;
//     }

//     let hours = Number(match[1]);

//     const minutes = Number(match[2]);

//     const period = match[3];

//     if (Number.isNaN(hours) || Number.isNaN(minutes)) {
//       return null;
//     }

//     if (minutes < 0 || minutes > 59) {
//       return null;
//     }

//     if (period === "pm" && hours < 12) {
//       hours += 12;
//     }

//     if (period === "am" && hours === 12) {
//       hours = 0;
//     }

//     if (hours < 0 || hours > 23) {
//       return null;
//     }

//     return hours * 60 + minutes;
//   };

//   // =========================================================
//   // FORMAT TIME FOR DISPLAY
//   // =========================================================

//   const formatTime = (minutes) => {
//     const hours24 = Math.floor(minutes / 60);

//     const mins = minutes % 60;

//     const period = hours24 >= 12 ? "PM" : "AM";

//     let hours12 = hours24 % 12;

//     if (hours12 === 0) {
//       hours12 = 12;
//     }

//     return `${hours12}:${String(mins).padStart(2, "0")} ${period}`;
//   };

//   // =========================================================
//   // FORMAT DATE
//   // =========================================================

//   const formatDate = (date) => {
//     if (!date) {
//       return "";
//     }

//     return date.toLocaleDateString("en-US", {
//       weekday: "long",
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   // =========================================================
//   // GENERATE TIME SLOTS
//   //
//   // 30 MINUTE INTERVAL
//   // =========================================================

//   const generateTimeSlots = (startTime, endTime) => {
//     const startMinutes = parseTimeToMinutes(startTime);

//     const endMinutes = parseTimeToMinutes(endTime);

//     if (startMinutes === null || endMinutes === null) {
//       return [];
//     }

//     if (startMinutes >= endMinutes) {
//       return [];
//     }

//     const slots = [];

//     for (
//       let minutes = startMinutes;
//       minutes < endMinutes;
//       minutes += 30
//     ) {
//       slots.push({
//         value: `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(
//           minutes % 60,
//         ).padStart(2, "0")}`,

//         label: formatTime(minutes),
//       });
//     }

//     return slots;
//   };

//   // =========================================================
//   // CREATE ALL UPCOMING APPOINTMENT SLOTS
//   //
//   // We use the doctor's:
//   //
//   // day
//   // enabled
//   // startTime
//   // endTime
//   //
//   // and generate the next 30 days.
//   // =========================================================

//   const availableAppointments = useMemo(() => {
//     if (!doctor?.availability || !Array.isArray(doctor.availability)) {
//       return [];
//     }

//     const appointments = [];

//     const today = new Date();

//     // Remove time from today's date.
//     today.setHours(0, 0, 0, 0);

//     // =======================================================
//     // NEXT 30 DAYS
//     // =======================================================

//     for (let i = 0; i < 30; i++) {
//       const date = new Date(today);

//       date.setDate(today.getDate() + i);

//       const dayName = date.toLocaleDateString("en-US", {
//         weekday: "long",
//       });

//       // =====================================================
//       // FIND DOCTOR'S SCHEDULE FOR THIS DAY
//       // ONLY ENABLED SCHEDULES
//       // =====================================================

//       const schedules = doctor.availability.filter((schedule) => {
//         if (!schedule?.enabled) {
//           return false;
//         }

//         return (
//           String(schedule.day || "")
//             .trim()
//             .toLowerCase() === dayName.trim().toLowerCase()
//         );
//       });

//       // =====================================================
//       // CREATE TIME SLOTS FOR EACH SCHEDULE
//       // =====================================================

//       schedules.forEach((schedule) => {
//         const slots = generateTimeSlots(
//           schedule.startTime,
//           schedule.endTime,
//         );

//         slots.forEach((slot) => {
//           appointments.push({
//             id: `${date.toDateString()}-${slot.value}`,

//             date: new Date(date),

//             day: dayName,

//             time: slot.value,

//             timeLabel: slot.label,

//             startTime: schedule.startTime,

//             endTime: schedule.endTime,
//           });
//         });
//       });
//     }

//     return appointments;
//   }, [doctor]);

//   // =========================================================
//   // SELECT APPOINTMENT SLOT
//   // =========================================================

//   const handleSelectAppointment = (appointment) => {
//     setSelectedAppointment(appointment);
//   };

//   // =========================================================
//   // BOOK APPOINTMENT
//   // =========================================================

//   const handleBookAppointment = async () => {
//     // -------------------------------------------------------
//     // CHECK APPOINTMENT SLOT
//     // -------------------------------------------------------

//     if (!selectedAppointment) {
//       Alert.alert(
//         "Select Appointment",
//         "Please select one of the available appointment dates and times.",
//       );

//       return;
//     }

//     // -------------------------------------------------------
//     // CHECK REASON
//     // -------------------------------------------------------

//     if (!reason.trim()) {
//       Alert.alert(
//         "Validation",
//         "Please enter your reason for visit.",
//       );

//       return;
//     }

//     // -------------------------------------------------------
//     // APPOINTMENT PAYLOAD
//     // -------------------------------------------------------

//     const payload = {
//       doctor: doctorId,

//       appointmentDate: selectedAppointment.date.toISOString(),

//       appointmentTime: selectedAppointment.time,

//       consultationType,

//       reason,

//       symptoms,
//     };

//     console.log("BOOKING PAYLOAD:", payload);

//     // -------------------------------------------------------
//     // CREATE APPOINTMENT
//     // -------------------------------------------------------

//     const result = await dispatch(createAppointment(payload));

//     if (createAppointment.fulfilled.match(result)) {
//       Alert.alert(
//         "Success",
//         "Appointment booked successfully.",
//       );

//       navigation.goBack();
//     }
//   };

//   // =========================================================
//   // LOADING
//   // =========================================================

//   if (loading || !doctor) {
//     return (
//       <SafeAreaView style={styles.loaderContainer}>
//         <ActivityIndicator
//           size="large"
//           color="#4880D8"
//         />
//       </SafeAreaView>
//     );
//   }

//   // =========================================================
//   // UI
//   // =========================================================

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//       >
//         <Text style={styles.title}>
//           Book Appointment
//         </Text>

//         {/* =================================================
//             DOCTOR INFORMATION
//         ================================================= */}

//         <View style={styles.card}>
//           <Text style={styles.name}>
//             Dr. {doctor.user?.fullname}
//           </Text>

//           <Text style={styles.specialization}>
//             {doctor.specialization}
//           </Text>

//           <Text style={styles.hospital}>
//             {doctor.hospital}
//           </Text>
//         </View>

//         {/* =================================================
//             AVAILABLE APPOINTMENTS
//         ================================================= */}

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>
//             Available Appointments
//           </Text>

//           <Text style={styles.helperText}>
//             Select your preferred date and time.
//           </Text>

//           {availableAppointments.length === 0 ? (
//             <View style={styles.noAvailability}>
//               <MaterialCommunityIcons
//                 name="calendar-remove"
//                 size={35}
//                 color="#9CA3AF"
//               />

//               <Text style={styles.noAvailabilityText}>
//                 This doctor currently has no available
//                 appointment times.
//               </Text>
//             </View>
//           ) : (
//             availableAppointments.map((appointment) => {
//               const isSelected =
//                 selectedAppointment?.id === appointment.id;

//               return (
//                 <TouchableOpacity
//                   key={appointment.id}
//                   style={[
//                     styles.selectionItem,
//                     isSelected &&
//                       styles.selectionItemSelected,
//                   ]}
//                   activeOpacity={0.8}
//                   onPress={() =>
//                     handleSelectAppointment(appointment)
//                   }
//                 >
//                   {/* CHECKBOX */}

//                   <View
//                     style={[
//                       styles.checkbox,
//                       isSelected &&
//                         styles.checkboxSelected,
//                     ]}
//                   >
//                     {isSelected && (
//                       <MaterialCommunityIcons
//                         name="check"
//                         size={18}
//                         color="#FFFFFF"
//                       />
//                     )}
//                   </View>

//                   {/* APPOINTMENT INFORMATION */}

//                   <View style={styles.selectionTextContainer}>
//                     <Text
//                       style={[
//                         styles.selectionTitle,
//                         isSelected &&
//                           styles.selectionTitleSelected,
//                       ]}
//                     >
//                       {appointment.day}
//                     </Text>

//                     <Text
//                       style={styles.selectionSubtitle}
//                     >
//                       {formatDate(appointment.date)}
//                     </Text>

//                     <Text
//                       style={styles.availabilityTime}
//                     >
//                       {appointment.timeLabel}
//                     </Text>
//                   </View>

//                   {/* CLOCK ICON */}

//                   <MaterialCommunityIcons
//                     name="clock-outline"
//                     size={22}
//                     color={
//                       isSelected
//                         ? "#4880D8"
//                         : "#9CA3AF"
//                     }
//                   />
//                 </TouchableOpacity>
//               );
//             })
//           )}
//         </View>

//         {/* =================================================
//             SELECTED APPOINTMENT SUMMARY
//         ================================================= */}

//         {selectedAppointment && (
//           <View style={styles.summaryCard}>
//             <MaterialCommunityIcons
//               name="calendar-check"
//               size={30}
//               color="#2563EB"
//             />

//             <View style={styles.summaryTextContainer}>
//               <Text style={styles.summaryTitle}>
//                 Appointment Selected
//               </Text>

//               <Text style={styles.summaryText}>
//                 {formatDate(selectedAppointment.date)}
//               </Text>

//               <Text style={styles.summaryText}>
//                 {selectedAppointment.timeLabel}
//               </Text>
//             </View>
//           </View>
//         )}

//         {/* =================================================
//             CONSULTATION TYPE
//         ================================================= */}

//         <Text style={styles.fieldLabel}>
//           Consultation Type
//         </Text>

//         <View style={styles.picker}>
//           <Picker
//             selectedValue={consultationType}
//             onValueChange={setConsultationType}
//           >
//             <Picker.Item
//               label="Physical"
//               value="Physical"
//             />

//             <Picker.Item
//               label="Video"
//               value="Video"
//             />

//             <Picker.Item
//               label="Home Visit"
//               value="Home Visit"
//             />
//           </Picker>
//         </View>

//         {/* =================================================
//             REASON
//         ================================================= */}

//         <Text style={styles.fieldLabel}>
//           Reason for Visit
//         </Text>

//         <TextInput
//           style={styles.textInput}
//           placeholder="Enter your reason for visit"
//           value={reason}
//           onChangeText={setReason}
//         />

//         {/* =================================================
//             SYMPTOMS
//         ================================================= */}

//         <Text style={styles.fieldLabel}>
//           Symptoms
//         </Text>

//         <TextInput
//           style={[
//             styles.textInput,
//             {
//               height: 120,
//               textAlignVertical: "top",
//             },
//           ]}
//           multiline
//           placeholder="Describe your symptoms"
//           value={symptoms}
//           onChangeText={setSymptoms}
//         />

//         {/* =================================================
//             BOOK BUTTON
//         ================================================= */}

//         <TouchableOpacity
//           style={[
//             styles.button,
//             !selectedAppointment &&
//               styles.buttonDisabled,
//           ]}
//           onPress={handleBookAppointment}
//           disabled={bookingLoading}
//         >
//           {bookingLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>
//               Book Appointment
//             </Text>
//           )}
//         </TouchableOpacity>

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default BookAppointmentScreen;

import React, { useEffect, useMemo, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Picker } from "@react-native-picker/picker";

import { useDispatch, useSelector } from "react-redux";

import { fetchDoctorById } from "../../../redux/doctorSlice";

import { createAppointment } from "../../../redux/appointmentSlice";

import styles from "./BookAppointmentScreen.css";

const BookAppointmentScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { doctorId } = route.params;

  const { doctor, loading } = useSelector((state) => state.doctor);

  const { loading: bookingLoading } = useSelector((state) => state.appointment);

  // =========================================================
  // SELECTED APPOINTMENT
  // =========================================================

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // =========================================================
  // OTHER APPOINTMENT INFORMATION
  // =========================================================

  const [consultationType, setConsultationType] = useState("Physical");

  const [reason, setReason] = useState("");

  const [symptoms, setSymptoms] = useState("");

  // =========================================================
  // FETCH DOCTOR
  // =========================================================

  useEffect(() => {
    if (doctorId) {
      dispatch(fetchDoctorById(doctorId));
    }
  }, [dispatch, doctorId]);

  // =========================================================
  // PARSE TIME
  //
  // Supports:
  //
  // 09:00
  // 9:00
  // 09:00 AM
  // 9:00 AM
  // 09:00 PM
  // 9:00 PM
  // =========================================================

  const parseTimeToMinutes = (time) => {
    if (!time) {
      return null;
    }

    const value = String(time).trim().toLowerCase();

    const match = value.match(/^(\d{1,2}):(\d{2})\s*(am|pm)?$/);

    if (!match) {
      return null;
    }

    let hours = Number(match[1]);

    const minutes = Number(match[2]);

    const period = match[3];

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return null;
    }

    if (minutes < 0 || minutes > 59) {
      return null;
    }

    if (period === "pm" && hours < 12) {
      hours += 12;
    }

    if (period === "am" && hours === 12) {
      hours = 0;
    }

    if (hours < 0 || hours > 23) {
      return null;
    }

    return hours * 60 + minutes;
  };

  // =========================================================
  // FORMAT TIME
  // =========================================================

  const formatTime = (minutes) => {
    const hours24 = Math.floor(minutes / 60);

    const mins = minutes % 60;

    const period = hours24 >= 12 ? "PM" : "AM";

    let hours12 = hours24 % 12;

    if (hours12 === 0) {
      hours12 = 12;
    }

    return `${hours12}:${String(mins).padStart(2, "0")} ${period}`;
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // =========================================================
  // SHORT DATE
  // =========================================================

  const formatShortDate = (date) => {
    if (!date) {
      return "";
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // =========================================================
  // GENERATE TIME SLOTS
  //
  // Doctor:
  //
  // 09:00 - 12:00
  //
  // becomes:
  //
  // 09:00
  // 09:30
  // 10:00
  // 10:30
  // 11:00
  // 11:30
  // =========================================================

  const generateTimeSlots = (startTime, endTime) => {
    const startMinutes = parseTimeToMinutes(startTime);

    const endMinutes = parseTimeToMinutes(endTime);

    if (startMinutes === null || endMinutes === null) {
      return [];
    }

    if (startMinutes >= endMinutes) {
      return [];
    }

    const slots = [];

    for (let minutes = startMinutes; minutes < endMinutes; minutes += 30) {
      slots.push({
        value: `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(
          minutes % 60,
        ).padStart(2, "0")}`,

        label: formatTime(minutes),
      });
    }

    return slots;
  };

  // =========================================================
  // CREATE UPCOMING APPOINTMENT SLOTS
  //
  // We look ahead 30 days.
  //
  // IMPORTANT:
  // We ONLY use the doctor's enabled availability.
  // =========================================================

  const availableAppointments = useMemo(() => {
    if (!doctor?.availability || !Array.isArray(doctor.availability)) {
      return [];
    }

    const appointments = [];

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    // =======================================================
    // LOOK AHEAD 30 DAYS
    // =======================================================

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);

      date.setDate(today.getDate() + i);

      const dayName = date.toLocaleDateString("en-US", {
        weekday: "long",
      });

      // =====================================================
      // FIND ENABLED DOCTOR SCHEDULE
      // =====================================================

      const schedules = doctor.availability.filter((schedule) => {
        if (!schedule?.enabled) {
          return false;
        }

        return (
          String(schedule.day || "")
            .trim()
            .toLowerCase() === dayName.trim().toLowerCase()
        );
      });

      // =====================================================
      // GENERATE SLOTS
      // =====================================================

      schedules.forEach((schedule) => {
        const slots = generateTimeSlots(schedule.startTime, schedule.endTime);

        slots.forEach((slot) => {
          appointments.push({
            id: `${date.toDateString()}-${slot.value}`,

            date: new Date(date),

            day: dayName,

            time: slot.value,

            timeLabel: slot.label,

            startTime: schedule.startTime,

            endTime: schedule.endTime,
          });
        });
      });
    }

    return appointments;
  }, [doctor]);

  // =========================================================
  // GROUP APPOINTMENTS BY DATE
  //
  // This gives us:
  //
  // Monday, Sep 7
  //   9:00 AM
  //   9:30 AM
  //
  // Tuesday, Sep 8
  //   2:00 PM
  //   2:30 PM
  // =========================================================

  const groupedAppointments = useMemo(() => {
    const groups = {};

    availableAppointments.forEach((appointment) => {
      const key = appointment.date.toISOString().split("T")[0];

      if (!groups[key]) {
        groups[key] = {
          date: appointment.date,
          day: appointment.day,
          appointments: [],
        };
      }

      groups[key].appointments.push(appointment);
    });

    return Object.values(groups);
  }, [availableAppointments]);

  // =========================================================
  // SELECT APPOINTMENT
  // =========================================================

  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
  };

  // =========================================================
  // BOOK APPOINTMENT
  // =========================================================

  const handleBookAppointment = async () => {
    // -------------------------------------------------------
    // CHECK SLOT
    // -------------------------------------------------------

    if (!selectedAppointment) {
      Alert.alert(
        "Select Appointment",
        "Please select an available appointment date and time.",
      );

      return;
    }

    // -------------------------------------------------------
    // CHECK REASON
    // -------------------------------------------------------

    if (!reason.trim()) {
      Alert.alert("Validation", "Please enter your reason for visit.");

      return;
    }

    // -------------------------------------------------------
    // PAYLOAD
    // -------------------------------------------------------

    const payload = {
      doctor: doctorId,

      appointmentDate: selectedAppointment.date.toISOString(),

      appointmentTime: selectedAppointment.time,

      consultationType,

      reason: reason.trim(),

      symptoms: symptoms.trim(),
    };

    console.log("BOOKING PAYLOAD:", payload);

    // -------------------------------------------------------
    // CREATE APPOINTMENT
    // -------------------------------------------------------

    try {
      const result = await dispatch(createAppointment(payload));

      if (createAppointment.fulfilled.match(result)) {
        Alert.alert("Success", "Appointment booked successfully.", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        // ---------------------------------------------------
        // BACKEND ERROR
        // ---------------------------------------------------

        const message =
          result.payload?.message ||
          result.error?.message ||
          "Unable to book appointment.";

        Alert.alert("Booking Failed", message);
      }
    } catch (error) {
      console.log("BOOK APPOINTMENT ERROR:", error);

      Alert.alert(
        "Booking Failed",
        "Something went wrong while booking the appointment.",
      );
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading || !doctor) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4880D8" />
      </SafeAreaView>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* =================================================
            TITLE
        ================================================= */}

        <Text style={styles.title}>Book Appointment</Text>

        {/* =================================================
            DOCTOR INFORMATION
        ================================================= */}

        <View style={styles.card}>
          <Text style={styles.name}>Dr. {doctor.user?.fullname}</Text>

          <Text style={styles.specialization}>{doctor.specialization}</Text>

          <Text style={styles.hospital}>{doctor.hospital}</Text>
        </View>

        {/* =================================================
            AVAILABLE APPOINTMENTS
        ================================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Available Appointments</Text>

          <Text style={styles.helperText}>
            Select one available date and time.
          </Text>

          {/* =================================================
              NO AVAILABILITY
          ================================================= */}

          {groupedAppointments.length === 0 ? (
            <View style={styles.noAvailability}>
              <MaterialCommunityIcons
                name="calendar-remove"
                size={35}
                color="#9CA3AF"
              />

              <Text style={styles.noAvailabilityText}>
                This doctor currently has no available appointment times.
              </Text>
            </View>
          ) : (
            groupedAppointments.map((group) => (
              <View
                key={group.date.toISOString()}
                style={{
                  marginBottom: 18,
                }}
              >
                {/* =======================================
                      DATE HEADER
                  ======================================= */}

                <View
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: "#1F2937",
                    }}
                  >
                    {group.day}
                  </Text>

                  <Text
                    style={{
                      fontSize: 13,
                      color: "#6B7280",
                      marginTop: 3,
                    }}
                  >
                    {formatShortDate(group.date)}
                  </Text>
                </View>

                {/* =======================================
                      TIME SLOTS
                  ======================================= */}

                {group.appointments.map((appointment) => {
                  const isSelected = selectedAppointment?.id === appointment.id;

                  return (
                    <TouchableOpacity
                      key={appointment.id}
                      style={[
                        styles.selectionItem,
                        isSelected && styles.selectionItemSelected,
                      ]}
                      activeOpacity={0.8}
                      onPress={() => handleSelectAppointment(appointment)}
                    >
                      {/* =================================
                              CHECKBOX
                          ================================= */}

                      <View
                        style={[
                          styles.checkbox,
                          isSelected && styles.checkboxSelected,
                        ]}
                      >
                        {isSelected && (
                          <MaterialCommunityIcons
                            name="check"
                            size={18}
                            color="#FFFFFF"
                          />
                        )}
                      </View>

                      {/* =================================
                              TIME
                          ================================= */}

                      <View style={styles.selectionTextContainer}>
                        <Text
                          style={[
                            styles.selectionTitle,
                            isSelected && styles.selectionTitleSelected,
                          ]}
                        >
                          {appointment.timeLabel}
                        </Text>

                        <Text style={styles.selectionSubtitle}>
                          {group.day}, {formatShortDate(group.date)}
                        </Text>
                      </View>

                      {/* =================================
                              CLOCK
                          ================================= */}

                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={22}
                        color={isSelected ? "#4880D8" : "#9CA3AF"}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))
          )}
        </View>

        {/* =================================================
            SELECTED APPOINTMENT SUMMARY
        ================================================= */}

        {selectedAppointment && (
          <View style={styles.summaryCard}>
            <MaterialCommunityIcons
              name="calendar-check"
              size={30}
              color="#2563EB"
            />

            <View style={styles.summaryTextContainer}>
              <Text style={styles.summaryTitle}>Appointment Selected</Text>

              <Text style={styles.summaryText}>
                {formatDate(selectedAppointment.date)}
              </Text>

              <Text style={styles.summaryText}>
                {selectedAppointment.timeLabel}
              </Text>
            </View>
          </View>
        )}

        {/* =================================================
            CONSULTATION TYPE
        ================================================= */}

        <Text style={styles.fieldLabel}>Consultation Type</Text>

        <View style={styles.picker}>
          <Picker
            selectedValue={consultationType}
            onValueChange={setConsultationType}
          >
            <Picker.Item label="Physical" value="Physical" />

            <Picker.Item label="Video" value="Video" />

            <Picker.Item label="Home Visit" value="Home Visit" />
          </Picker>
        </View>

        {/* =================================================
            REASON
        ================================================= */}

        <Text style={styles.fieldLabel}>Reason for Visit</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Enter your reason for visit"
          value={reason}
          onChangeText={setReason}
        />

        {/* =================================================
            SYMPTOMS
        ================================================= */}

        <Text style={styles.fieldLabel}>Symptoms</Text>

        <TextInput
          style={[
            styles.textInput,
            {
              height: 120,
              textAlignVertical: "top",
            },
          ]}
          multiline
          placeholder="Describe your symptoms"
          value={symptoms}
          onChangeText={setSymptoms}
        />

        {/* =================================================
            BOOK BUTTON
        ================================================= */}

        <TouchableOpacity
          style={[styles.button, !selectedAppointment && styles.buttonDisabled]}
          onPress={handleBookAppointment}
          disabled={bookingLoading}
        >
          {bookingLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Book Appointment</Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookAppointmentScreen;