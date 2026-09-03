import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


import api from "../../../../services/api";


import styles from "./CreateMedicalRecordScreen.css";

const CreateMedicalRecordScreen = ({ navigation, route }) => {
  const { appointmentId } = route.params || {};

  const [diagnosis, setDiagnosis] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [findings, setFindings] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);

  // =====================================================
  // SAVE MEDICAL RECORD
  // =====================================================

  const handleSave = async () => {
    if (!appointmentId) {
      Alert.alert("Error", "Appointment ID was not provided.");

      return;
    }

    if (!diagnosis.trim()) {
      Alert.alert("Required", "Please enter the diagnosis.");

      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/medical-records", {
        appointment: appointmentId,
        diagnosis: diagnosis.trim(),
        symptoms: symptoms.trim(),
        findings: findings.trim(),
        treatment: treatment.trim(),
        notes: notes.trim(),
      });

      console.log("MEDICAL RECORD CREATED:", response.data);

      Alert.alert("Success", "Medical record created successfully.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.log(
        "CREATE MEDICAL RECORD ERROR:",
        error.response?.data || error.message,
      );

      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create medical record.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SCREEN
  // =====================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="clipboard-pulse-outline"
              size={30}
              color="#4880D8"
            />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.title}>Medical Record</Text>

            <Text style={styles.subtitle}>
              Add patient's medical information
            </Text>
          </View>
        </View>

        {/* ================================================= */}
        {/* DIAGNOSIS */}
        {/* ================================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Diagnosis</Text>

          <Text style={styles.label}>Diagnosis *</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter diagnosis"
            placeholderTextColor="#9CA3AF"
            value={diagnosis}
            onChangeText={setDiagnosis}
          />
        </View>

        {/* ================================================= */}
        {/* SYMPTOMS */}
        {/* ================================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Symptoms</Text>

          <TextInput
            style={styles.textArea}
            placeholder="Describe patient's symptoms"
            placeholderTextColor="#9CA3AF"
            value={symptoms}
            onChangeText={setSymptoms}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* ================================================= */}
        {/* FINDINGS */}
        {/* ================================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Clinical Findings</Text>

          <TextInput
            style={styles.textArea}
            placeholder="Enter examination findings"
            placeholderTextColor="#9CA3AF"
            value={findings}
            onChangeText={setFindings}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* ================================================= */}
        {/* TREATMENT */}
        {/* ================================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Treatment</Text>

          <TextInput
            style={styles.textArea}
            placeholder="Describe treatment given"
            placeholderTextColor="#9CA3AF"
            value={treatment}
            onChangeText={setTreatment}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* ================================================= */}
        {/* NOTES */}
        {/* ================================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Doctor's Notes</Text>

          <TextInput
            style={styles.textArea}
            placeholder="Add additional notes"
            placeholderTextColor="#9CA3AF"
            value={notes}
            onChangeText={setNotes}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* ================================================= */}
        {/* SAVE BUTTON */}
        {/* ================================================= */}

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.disabledButton]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <MaterialCommunityIcons
                name="content-save"
                size={22}
                color="#fff"
              />

              <Text style={styles.saveButtonText}>Save Medical Record</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMedicalRecordScreen;
