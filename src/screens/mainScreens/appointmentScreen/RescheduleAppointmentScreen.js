// import React, { useEffect, useState } from "react";

// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from "react-native";

// import { SafeAreaView } from "react-native-safe-area-context";

// import DateTimePicker from "@react-native-community/datetimepicker";

// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchAppointmentById,
//   rescheduleAppointment,
// } from "../../../redux/appointmentSlice";

// import styles from "./RescheduleAppointmentScreen.css";

// const RescheduleAppointmentScreen = ({ route, navigation }) => {
//   const dispatch = useDispatch();

//   const { appointmentId } = route.params;

//   const { appointment, loading } = useSelector((state) => state.appointment);

//   const [appointmentDate, setAppointmentDate] = useState(new Date());

//   const [appointmentTime, setAppointmentTime] = useState("");

//   const [reason, setReason] = useState("");

//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     dispatch(fetchAppointmentById(appointmentId));
//   }, []);

//   useEffect(() => {
//     if (appointment) {
//       setAppointmentDate(new Date(appointment.appointmentDate));

//       setAppointmentTime(appointment.appointmentTime || "");

//       setReason(appointment.reason || "");
//     }
//   }, [appointment]);

//   const submit = async () => {
//     if (!appointmentTime.trim()) {
//       return Alert.alert("Validation", "Please enter appointment time.");
//     }

//     const result = await dispatch(
//       rescheduleAppointment({
//         id: appointmentId,

//         appointmentDate,

//         appointmentTime,

//         reason,
//       }),
//     );

//     if (rescheduleAppointment.fulfilled.match(result)) {
//       Alert.alert("Success", "Appointment rescheduled successfully.");

//       navigation.goBack();
//     }
//   };

//   if (loading || !appointment) {
//     return (
//       <SafeAreaView style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#4880D8" />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <Text style={styles.title}>Reschedule Appointment</Text>

//         <Text style={styles.label}>Appointment Date</Text>

//         <TouchableOpacity
//           style={styles.dateButton}
//           onPress={() => setShowDatePicker(true)}
//         >
//           <MaterialCommunityIcons name="calendar" size={22} color="#4880D8" />

//           <Text style={styles.dateText}>{appointmentDate.toDateString()}</Text>
//         </TouchableOpacity>

//         {showDatePicker && (
//           <DateTimePicker
//             value={appointmentDate}
//             mode="date"
//             minimumDate={new Date()}
//             display="default"
//             onChange={(event, date) => {
//               setShowDatePicker(false);

//               if (date) {
//                 setAppointmentDate(date);
//               }
//             }}
//           />
//         )}

//         <Text style={styles.label}>Appointment Time</Text>

//         <TextInput
//           placeholder="9:00 AM"
//           value={appointmentTime}
//           onChangeText={setAppointmentTime}
//           style={styles.input}
//         />

//         <Text style={styles.label}>Reason</Text>

//         <TextInput
//           placeholder="Reason for appointment"
//           multiline
//           numberOfLines={5}
//           value={reason}
//           onChangeText={setReason}
//           style={styles.textArea}
//         />

//         <TouchableOpacity style={styles.button} onPress={submit}>
//           <MaterialCommunityIcons name="calendar-edit" size={22} color="#fff" />

//           <Text style={styles.buttonText}>Submit Request</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default RescheduleAppointmentScreen;

import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import DateTimePicker from "@react-native-community/datetimepicker";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchAppointmentById,
  rescheduleAppointment,
} from "../../../redux/appointmentSlice";

import styles from "./RescheduleAppointmentScreen.css";

const RescheduleAppointmentScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { appointmentId } = route.params;

  const { appointment, loading } = useSelector((state) => state.appointment);

  const [appointmentDate, setAppointmentDate] = useState(new Date());

  const [appointmentTime, setAppointmentTime] = useState("");

  const [reason, setReason] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (appointmentId) {
      dispatch(fetchAppointmentById(appointmentId));
    }
  }, [dispatch, appointmentId]);

  useEffect(() => {
    if (appointment) {
      setAppointmentDate(new Date(appointment.appointmentDate));

      setAppointmentTime(appointment.appointmentTime || "");

      setReason(appointment.reason || "");
    }
  }, [appointment]);

  const submit = async () => {
    if (!appointmentTime.trim()) {
      return Alert.alert("Validation", "Please enter appointment time.");
    }

    if (!appointmentId) {
      return Alert.alert(
        "Error",
        "Missing appointment reference. Please go back and try again.",
      );
    }

    const result = await dispatch(
      rescheduleAppointment({
        id: appointmentId,
        data: {
          appointmentDate,
          appointmentTime,
          reason,
        },
      }),
    );

    if (rescheduleAppointment.fulfilled.match(result)) {
      Alert.alert("Success", "Appointment rescheduled successfully.");

      navigation.goBack();
    }

    if (rescheduleAppointment.rejected.match(result)) {
      Alert.alert(
        "Error",
        result.payload?.message || "Unable to reschedule appointment.",
      );
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
      <ScrollView>
        <Text style={styles.title}>Reschedule Appointment</Text>

        <Text style={styles.label}>Appointment Date</Text>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <MaterialCommunityIcons name="calendar" size={22} color="#4880D8" />

          <Text style={styles.dateText}>{appointmentDate.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={appointmentDate}
            mode="date"
            minimumDate={new Date()}
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);

              if (date) {
                setAppointmentDate(date);
              }
            }}
          />
        )}

        <Text style={styles.label}>Appointment Time</Text>

        <TextInput
          placeholder="9:00 AM"
          value={appointmentTime}
          onChangeText={setAppointmentTime}
          style={styles.input}
        />

        <Text style={styles.label}>Reason</Text>

        <TextInput
          placeholder="Reason for appointment"
          multiline
          numberOfLines={5}
          value={reason}
          onChangeText={setReason}
          style={styles.textArea}
        />

        <TouchableOpacity style={styles.button} onPress={submit}>
          <MaterialCommunityIcons name="calendar-edit" size={22} color="#fff" />

          <Text style={styles.buttonText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RescheduleAppointmentScreen;
