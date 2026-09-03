import React, { useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchPrescription,
  clearSelectedPrescription,
} from "../../../redux/prescriptionSlice";

import styles from "./PatientPrescriptionDetailsScreen.css";

const PatientPrescriptionDetailsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { prescriptionId } = route.params || {};

  const { prescription, loading, error } = useSelector(
    (state) => state.prescription,
  );

  // ==========================================
  // FETCH PRESCRIPTION
  // ==========================================

  useEffect(() => {
    if (!prescriptionId) {
      return;
    }

    dispatch(fetchPrescription(prescriptionId));

    return () => {
      dispatch(clearSelectedPrescription());
    };
  }, [dispatch, prescriptionId]);

  // ==========================================
  // NO ID
  // ==========================================

  if (!prescriptionId) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={70}
          color="#EF4444"
        />

        <Text style={styles.errorTitle}>Prescription Not Found</Text>

        <Text style={styles.errorText}>No prescription ID was provided.</Text>
      </SafeAreaView>
    );
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading && !prescription) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4880D8" />

        <Text style={styles.loadingText}>Loading prescription...</Text>
      </SafeAreaView>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error && !prescription) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={70}
          color="#EF4444"
        />

        <Text style={styles.errorTitle}>Unable to Load Prescription</Text>

        <Text style={styles.errorText}>
          {typeof error === "string"
            ? error
            : "Something went wrong while loading the prescription."}
        </Text>
      </SafeAreaView>
    );
  }

  if (!prescription) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <MaterialCommunityIcons
          name="file-document-outline"
          size={70}
          color="#D1D5DB"
        />

        <Text style={styles.errorTitle}>Prescription Not Found</Text>
      </SafeAreaView>
    );
  }

  // ==========================================
  // DATA
  // ==========================================

  const doctor = prescription.doctor || {};
  const doctorUser = doctor.user || {};
  const patient = prescription.patient || {};

  const medicines = Array.isArray(prescription.medicines)
    ? prescription.medicines
    : [];

  const prescriptionDate = prescription.createdAt
    ? new Date(prescription.createdAt).toLocaleDateString()
    : "Date unavailable";

  // ==========================================
  // SCREEN
  // ==========================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* =====================================
            HEADER
        ===================================== */}

        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="prescription"
              size={32}
              color="#4880D8"
            />
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Prescription Details</Text>

            <Text style={styles.headerSubtitle}>
              Issued on {prescriptionDate}
            </Text>
          </View>
        </View>

        {/* =====================================
            DOCTOR INFORMATION
        ===================================== */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Doctor</Text>

          <View style={styles.doctorRow}>
            <View style={styles.doctorIcon}>
              <MaterialCommunityIcons name="doctor" size={28} color="#4880D8" />
            </View>

            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>
                Dr. {doctorUser.fullname || "Doctor"}
              </Text>

              <Text style={styles.specialization}>
                {doctor.specialization || "Medical Doctor"}
              </Text>

              {doctor.hospital ? (
                <Text style={styles.hospital}>{doctor.hospital}</Text>
              ) : null}
            </View>
          </View>
        </View>

        {/* =====================================
            PATIENT
        ===================================== */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Patient</Text>

          <Text style={styles.patientName}>
            {patient.fullname || "Patient"}
          </Text>

          {patient.email ? (
            <Text style={styles.patientDetail}>{patient.email}</Text>
          ) : null}

          {patient.phone ? (
            <Text style={styles.patientDetail}>{patient.phone}</Text>
          ) : null}
        </View>

        {/* =====================================
            DIAGNOSIS
        ===================================== */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Diagnosis</Text>

          <View style={styles.diagnosisBox}>
            <MaterialCommunityIcons
              name="clipboard-pulse-outline"
              size={25}
              color="#4880D8"
            />

            <Text style={styles.diagnosisText}>
              {prescription.diagnosis || "No diagnosis provided."}
            </Text>
          </View>
        </View>

        {/* =====================================
            MEDICINES
        ===================================== */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Prescribed Medicines</Text>

          {medicines.length === 0 ? (
            <Text style={styles.emptyText}>No medicines were prescribed.</Text>
          ) : (
            medicines.map((medicine, index) => (
              <View
                key={medicine._id || index.toString()}
                style={styles.medicineCard}
              >
                {/* Medicine Header */}

                <View style={styles.medicineHeader}>
                  <View style={styles.medicineIcon}>
                    <MaterialCommunityIcons
                      name="pill"
                      size={25}
                      color="#4880D8"
                    />
                  </View>

                  <Text style={styles.medicineName}>
                    {medicine.medicineName || "Medicine"}
                  </Text>
                </View>

                {/* Dosage */}

                <View style={styles.medicineInfoRow}>
                  <Text style={styles.medicineLabel}>Dosage</Text>

                  <Text style={styles.medicineValue}>
                    {medicine.dosage || "Not specified"}
                  </Text>
                </View>

                {/* Frequency */}

                <View style={styles.medicineInfoRow}>
                  <Text style={styles.medicineLabel}>Frequency</Text>

                  <Text style={styles.medicineValue}>
                    {medicine.frequency || "Not specified"}
                  </Text>
                </View>

                {/* Duration */}

                <View style={styles.medicineInfoRow}>
                  <Text style={styles.medicineLabel}>Duration</Text>

                  <Text style={styles.medicineValue}>
                    {medicine.duration || "Not specified"}
                  </Text>
                </View>

                {/* Instruction */}

                <View style={styles.instructionBox}>
                  <Text style={styles.instructionLabel}>Instructions</Text>

                  <Text style={styles.instructionText}>
                    {medicine.instruction || "No special instructions."}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* =====================================
            DOCTOR'S NOTES
        ===================================== */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Doctor's Notes</Text>

          <View style={styles.notesBox}>
            <MaterialCommunityIcons
              name="note-text-outline"
              size={24}
              color="#4880D8"
            />

            <Text style={styles.notesText}>
              {prescription.notes || "No additional notes provided."}
            </Text>
          </View>
        </View>

        {/* =====================================
            PRESCRIPTION DATE
        ===================================== */}

        <View style={styles.dateContainer}>
          <MaterialCommunityIcons
            name="calendar-check-outline"
            size={20}
            color="#6B7280"
          />

          <Text style={styles.dateText}>
            Prescription issued on {prescriptionDate}
          </Text>
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <MaterialCommunityIcons
            name="shield-check"
            size={22}
            color="#10B981"
          />

          <Text style={styles.footerText}>
            Keep your prescription information safe and follow your doctor's
            instructions.
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientPrescriptionDetailsScreen;
