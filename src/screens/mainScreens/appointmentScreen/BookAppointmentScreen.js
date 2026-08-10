import React, { useEffect, useState } from "react";

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

import DateTimePicker from "@react-native-community/datetimepicker";

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

  const [appointmentDate, setAppointmentDate] = useState(new Date());

  const [appointmentTime, setAppointmentTime] = useState(new Date());

  const [showDate, setShowDate] = useState(false);

  const [showTime, setShowTime] = useState(false);

  const [consultationType, setConsultationType] = useState("Physical");

  const [reason, setReason] = useState("");

  const [symptoms, setSymptoms] = useState("");

  useEffect(() => {
    dispatch(fetchDoctorById(doctorId));
  }, []);

  const handleBookAppointment = async () => {
    if (!reason.trim()) {
      Alert.alert("Validation", "Please enter your reason for visit.");

      return;
    }

    const payload = {
      doctor: doctorId,

      appointmentDate: appointmentDate.toISOString(),

      appointmentTime: appointmentTime.toLocaleTimeString(),

      consultationType,

      reason,

      symptoms,
    };

    const result = await dispatch(createAppointment(payload));

    if (createAppointment.fulfilled.match(result)) {
      Alert.alert("Success", "Appointment booked successfully.");

      navigation.goBack();
    }
  };

  if (loading || !doctor) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4880D8" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Book Appointment</Text>

        <View style={styles.card}>
          <Text style={styles.name}>Dr. {doctor.user.fullname}</Text>

          <Text style={styles.specialization}>{doctor.specialization}</Text>

          <Text style={styles.hospital}>{doctor.hospital}</Text>
        </View>

        {/* Date */}

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDate(true)}
        >
          <Text>{appointmentDate.toDateString()}</Text>
        </TouchableOpacity>

        {showDate && (
          <DateTimePicker
            value={appointmentDate}
            mode="date"
            minimumDate={new Date()}
            onChange={(e, selectedDate) => {
              setShowDate(false);

              if (selectedDate) {
                setAppointmentDate(selectedDate);
              }
            }}
          />
        )}

        {/* Time */}

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowTime(true)}
        >
          <Text>{appointmentTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>

        {showTime && (
          <DateTimePicker
            value={appointmentTime}
            mode="time"
            onChange={(e, selectedTime) => {
              setShowTime(false);

              if (selectedTime) {
                setAppointmentTime(selectedTime);
              }
            }}
          />
        )}

        {/* Consultation */}

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

        <TextInput
          style={styles.textInput}
          placeholder="Reason for visit"
          value={reason}
          onChangeText={setReason}
        />

        <TextInput
          style={[
            styles.textInput,
            {
              height: 120,
            },
          ]}
          multiline
          placeholder="Symptoms"
          value={symptoms}
          onChangeText={setSymptoms}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleBookAppointment}
          disabled={bookingLoading}
        >
          {bookingLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Book Appointment</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookAppointmentScreen;
