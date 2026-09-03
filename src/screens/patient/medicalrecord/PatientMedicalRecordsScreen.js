import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import api from "../../../services/api";

import styles from "./PatientMedicalRecordsScreen.css";

const PatientMedicalRecordsScreen = ({ navigation }) => {
  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // ==========================================
  // FETCH MY MEDICAL RECORDS
  // ==========================================

  useEffect(() => {
    const fetchMyMedicalRecords = async () => {
      try {
        setLoading(true);

        setError(null);

        console.log("FETCHING MY MEDICAL RECORDS");

        const response = await api.get("/medical-records/my-records");

        console.log(
          "MY MEDICAL RECORDS:",
          JSON.stringify(response.data, null, 2),
        );

        const data = response.data?.data;

        if (Array.isArray(data)) {
          setRecords(data);
        } else {
          setRecords([]);
        }
      } catch (error) {
        console.log(
          "FETCH MY MEDICAL RECORD ERROR:",
          error.response?.data || error.message,
        );

        setError(
          error.response?.data?.message ||
            "Failed to load your medical records.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyMedicalRecords();
  }, []);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4880D8" />

        <Text style={styles.loadingText}>Loading your medical records...</Text>
      </SafeAreaView>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <MaterialCommunityIcons
          name="file-alert-outline"
          size={70}
          color="#EF4444"
        />

        <Text style={styles.errorTitle}>Unable to Load Records</Text>

        <Text style={styles.errorText}>{error}</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ==========================================
  // NO RECORDS
  // ==========================================

  if (records.length === 0) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <MaterialCommunityIcons
          name="clipboard-text-outline"
          size={75}
          color="#9CA3AF"
        />

        <Text style={styles.emptyTitle}>No Medical Records</Text>

        <Text style={styles.emptyText}>
          You don't have any medical records yet.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ==========================================
  // SCREEN
  // ==========================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =====================================
            HEADER
        ===================================== */}

        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="clipboard-pulse-outline"
              size={32}
              color="#4880D8"
            />
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>My Medical Records</Text>

            <Text style={styles.subtitle}>
              Your medical history and treatment records
            </Text>
          </View>
        </View>

        {/* =====================================
            RECORD COUNT
        ===================================== */}

        <View style={styles.summaryCard}>
          <MaterialCommunityIcons
            name="file-document-multiple-outline"
            size={28}
            color="#4880D8"
          />

          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryNumber}>{records.length}</Text>

            <Text style={styles.summaryLabel}>
              Medical Record
              {records.length !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        {/* =====================================
            MEDICAL RECORDS
        ===================================== */}

        {records.map((record, index) => {
          const doctor = record.doctor || {};

          const doctorUser = doctor.user || {};

          return (
            <View key={record._id || index.toString()} style={styles.card}>
              {/* RECORD HEADER */}

              <View style={styles.recordHeader}>
                <View style={styles.recordIcon}>
                  <MaterialCommunityIcons
                    name="file-document-outline"
                    size={28}
                    color="#4880D8"
                  />
                </View>

                <View style={styles.recordHeaderText}>
                  <Text style={styles.recordTitle}>Medical Record</Text>

                  {record.createdAt && (
                    <Text style={styles.dateText}>
                      {new Date(record.createdAt).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              </View>

              {/* DOCTOR */}

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Doctor</Text>

                <Text style={styles.value}>
                  Dr. {doctorUser.fullname || "Doctor"}
                </Text>

                {doctor.specialization && (
                  <Text style={styles.detailText}>{doctor.specialization}</Text>
                )}

                {doctor.hospital && (
                  <Text style={styles.detailText}>{doctor.hospital}</Text>
                )}
              </View>

              {/* APPOINTMENT DATE */}

              {record.appointment?.appointmentDate && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Appointment Date</Text>

                  <Text style={styles.value}>
                    {new Date(
                      record.appointment.appointmentDate,
                    ).toLocaleDateString()}
                  </Text>
                </View>
              )}

              {/* DIAGNOSIS */}

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Diagnosis</Text>

                <Text style={styles.description}>
                  {record.diagnosis || "No diagnosis provided."}
                </Text>
              </View>

              {/* SYMPTOMS */}

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Symptoms</Text>

                <Text style={styles.description}>
                  {record.symptoms || "No symptoms recorded."}
                </Text>
              </View>

              {/* FINDINGS */}

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Examination / Findings</Text>

                <Text style={styles.description}>
                  {record.findings || "No examination findings recorded."}
                </Text>
              </View>

              {/* TREATMENT */}

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Treatment</Text>

                <Text style={styles.description}>
                  {record.treatment || "No treatment recorded."}
                </Text>
              </View>

              {/* NOTES */}

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Doctor's Notes</Text>

                <Text style={styles.description}>
                  {record.notes || "No additional notes."}
                </Text>
              </View>
            </View>
          );
        })}

        {/* =====================================
            FOOTER
        ===================================== */}

        <View style={styles.footer}>
          <MaterialCommunityIcons
            name="shield-check-outline"
            size={22}
            color="#10B981"
          />

          <Text style={styles.footerText}>
            Your medical records are private and should only be accessed by
            authorized healthcare professionals.
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientMedicalRecordsScreen;
