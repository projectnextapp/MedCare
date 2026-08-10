import React, { useState } from "react";

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

import { useDispatch, useSelector } from "react-redux";

import { createConsultationNote } from "../../../redux/consultationSlice";

import styles from "./AddConsultationNoteScreen.css";

const AddConsultationNoteScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.consultation);

  const { appointmentId } = route.params;

  const [chiefComplaint, setChiefComplaint] = useState("");

  const [historyOfPresentIllness, setHistoryOfPresentIllness] = useState("");

  const [physicalExamination, setPhysicalExamination] = useState("");

  const [diagnosis, setDiagnosis] = useState("");

  const [treatmentPlan, setTreatmentPlan] = useState("");

  const [doctorNotes, setDoctorNotes] = useState("");

  const [followUpDate, setFollowUpDate] = useState("");

  const handleSave = async () => {
    if (!chiefComplaint || !diagnosis) {
      Alert.alert("Validation", "Chief Complaint and Diagnosis are required.");

      return;
    }

    try {
      await dispatch(
        createConsultationNote({
          appointment: appointmentId,

          chiefComplaint,

          historyOfPresentIllness,

          physicalExamination,

          diagnosis,

          treatmentPlan,

          doctorNotes,

          followUpDate,
        }),
      ).unwrap();

      Alert.alert("Success", "Consultation Note Saved.");

      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message || "Unable to save.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Consultation Note</Text>

        <Text style={styles.label}>Chief Complaint</Text>

        <TextInput
          value={chiefComplaint}
          onChangeText={setChiefComplaint}
          style={styles.input}
          multiline
        />

        <Text style={styles.label}>History of Present Illness</Text>

        <TextInput
          value={historyOfPresentIllness}
          onChangeText={setHistoryOfPresentIllness}
          style={styles.textarea}
          multiline
        />

        <Text style={styles.label}>Physical Examination</Text>

        <TextInput
          value={physicalExamination}
          onChangeText={setPhysicalExamination}
          style={styles.textarea}
          multiline
        />

        <Text style={styles.label}>Diagnosis</Text>

        <TextInput
          value={diagnosis}
          onChangeText={setDiagnosis}
          style={styles.textarea}
          multiline
        />

        <Text style={styles.label}>Treatment Plan</Text>

        <TextInput
          value={treatmentPlan}
          onChangeText={setTreatmentPlan}
          style={styles.textarea}
          multiline
        />

        <Text style={styles.label}>Doctor Notes</Text>

        <TextInput
          value={doctorNotes}
          onChangeText={setDoctorNotes}
          style={styles.textarea}
          multiline
        />

        <Text style={styles.label}>Follow-up Date</Text>

        <TextInput
          value={followUpDate}
          onChangeText={setFollowUpDate}
          placeholder="YYYY-MM-DD"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save Consultation Note</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddConsultationNoteScreen;
