import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import api from "../../../../services/api";

import styles from "./PatientMedicalRecordScreen.css";

const PatientMedicalRecordScreen = ({ navigation, route }) => {
  const { patientId } = route.params || {};

  const [records, setRecords] = useState([]);
  const [patient, setPatient] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =====================================================
  // FETCH PATIENT MEDICAL RECORDS
  // =====================================================

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!patientId) {
          setError("Patient ID was not provided.");
          return;
        }

        console.log("FETCHING MEDICAL RECORDS FOR:", patientId);

        const response = await api.get(`/medical-records/patient/${patientId}`);

        console.log(
          "MEDICAL RECORD RESPONSE:",
          JSON.stringify(response.data, null, 2),
        );

        // =================================================
        // HANDLE COMMON API RESPONSE STRUCTURES
        // =================================================

        const data = response.data?.data;

        let medicalRecords = [];

        if (Array.isArray(data)) {
          medicalRecords = data;
        } else if (Array.isArray(data?.records)) {
          medicalRecords = data.records;
        } else if (Array.isArray(data?.medicalRecords)) {
          medicalRecords = data.medicalRecords;
        } else if (data?.record) {
          medicalRecords = [data.record];
        } else if (data?.medicalRecord) {
          medicalRecords = [data.medicalRecord];
        }

        setRecords(medicalRecords);

        // =================================================
        // GET PATIENT INFORMATION
        // =================================================

        if (medicalRecords.length > 0) {
          const firstRecord = medicalRecords[0];

          setPatient(firstRecord.patient || null);
        }
      } catch (error) {
        console.log(
          "FETCH MEDICAL RECORD ERROR:",
          error.response?.data || error.message,
        );

        setError(
          error.response?.data?.message || "Failed to load medical records.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecords();
  }, [patientId]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4880D8" />

        <Text style={styles.loadingText}>Loading medical records...</Text>
      </SafeAreaView>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="file-alert-outline"
            size={70}
            color="#EF4444"
          />

          <Text style={styles.errorTitle}>Unable to Load Medical Records</Text>

          <Text style={styles.errorText}>{error}</Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // =====================================================
  // NO RECORDS
  // =====================================================

  if (records.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={80}
            color="#9CA3AF"
          />

          <Text style={styles.emptyTitle}>No Medical Records</Text>

          <Text style={styles.emptyText}>
            This patient does not have any medical records yet.
          </Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
              size={32}
              color="#4880D8"
            />
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Medical Records</Text>

            <Text style={styles.headerSubtitle}>Patient medical history</Text>
          </View>
        </View>

        {/* ================================================= */}
        {/* PATIENT INFORMATION */}
        {/* ================================================= */}

        {patient && (
          <View style={styles.patientCard}>
            <View style={styles.patientIcon}>
              <MaterialCommunityIcons
                name="account"
                size={30}
                color="#4880D8"
              />
            </View>

            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>
                {patient.fullname ||
                  patient.fullName ||
                  patient.name ||
                  "Patient"}
              </Text>

              {patient.email ? (
                <Text style={styles.patientDetail}>{patient.email}</Text>
              ) : null}

              {patient.phone ? (
                <Text style={styles.patientDetail}>{patient.phone}</Text>
              ) : null}
            </View>
          </View>
        )}

        {/* ================================================= */}
        {/* RECORD COUNT */}
        {/* ================================================= */}

        <View style={styles.recordCountContainer}>
          <MaterialCommunityIcons
            name="file-document-multiple-outline"
            size={22}
            color="#4880D8"
          />

          <Text style={styles.recordCountText}>
            {records.length}{" "}
            {records.length === 1 ? "Medical Record" : "Medical Records"}
          </Text>
        </View>

        {/* ================================================= */}
        {/* MEDICAL RECORDS */}
        {/* ================================================= */}

        {records.map((record, index) => {
          const doctor = record.doctor || {};
          const doctorUser = doctor.user || {};

          const recordDate = record.createdAt
            ? new Date(record.createdAt).toLocaleDateString()
            : "Date unavailable";

          return (
            <View
              key={record._id || record.id || index.toString()}
              style={styles.recordCard}
            >
              {/* ========================================= */}
              {/* RECORD HEADER */}
              {/* ========================================= */}

              <View style={styles.recordHeader}>
                <View style={styles.recordIcon}>
                  <MaterialCommunityIcons
                    name="clipboard-text-outline"
                    size={26}
                    color="#4880D8"
                  />
                </View>

                <View style={styles.recordHeaderText}>
                  <Text style={styles.recordTitle}>Medical Record</Text>

                  <Text style={styles.recordDate}>{recordDate}</Text>
                </View>
              </View>

              {/* ========================================= */}
              {/* DOCTOR */}
              {/* ========================================= */}

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Doctor</Text>

                <Text style={styles.sectionValue}>
                  Dr.{" "}
                  {doctorUser.fullname ||
                    doctor.fullname ||
                    doctor.name ||
                    "Doctor"}
                </Text>

                {doctor.specialization ? (
                  <Text style={styles.secondaryValue}>
                    {doctor.specialization}
                  </Text>
                ) : null}
              </View>

              {/* ========================================= */}
              {/* DIAGNOSIS */}
              {/* ========================================= */}

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Diagnosis</Text>

                <View style={styles.informationBox}>
                  <MaterialCommunityIcons
                    name="stethoscope"
                    size={22}
                    color="#4880D8"
                  />

                  <Text style={styles.informationText}>
                    {record.diagnosis || "No diagnosis provided."}
                  </Text>
                </View>
              </View>

              {/* ========================================= */}
              {/* SYMPTOMS */}
              {/* ========================================= */}

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Symptoms</Text>

                <Text style={styles.description}>
                  {record.symptoms || "No symptoms recorded."}
                </Text>
              </View>

              {/* ========================================= */}
              {/* FINDINGS */}
              {/* ========================================= */}

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Clinical Findings</Text>

                <Text style={styles.description}>
                  {record.findings || "No clinical findings recorded."}
                </Text>
              </View>

              {/* ========================================= */}
              {/* TREATMENT */}
              {/* ========================================= */}

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Treatment</Text>

                <Text style={styles.description}>
                  {record.treatment || "No treatment recorded."}
                </Text>
              </View>

              {/* ========================================= */}
              {/* NOTES */}
              {/* ========================================= */}

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Doctor's Notes</Text>

                <Text style={styles.description}>
                  {record.notes || "No additional notes."}
                </Text>
              </View>

              {/* ========================================= */}
              {/* APPOINTMENT */}
              {/* ========================================= */}

              {record.appointment ? (
                <View style={styles.appointmentReference}>
                  <MaterialCommunityIcons
                    name="calendar-check-outline"
                    size={20}
                    color="#6B7280"
                  />

                  <Text style={styles.appointmentReferenceText}>
                    Linked to appointment
                  </Text>
                </View>
              ) : null}
            </View>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientMedicalRecordScreen;
