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

import styles from "./PrescriptionDetailsScreen.css";

const PrescriptionDetailsScreen = ({ navigation, route }) => {
  const { prescriptionId } = route.params || {};

  const [prescription, setPrescription] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // ==========================================
  // FETCH PRESCRIPTION
  // ==========================================

  useEffect(() => {
    const loadPrescription = async () => {
      try {
        setLoading(true);

        setError(null);

        if (!prescriptionId) {
          setError("Prescription ID was not provided.");

          return;
        }

        console.log("Fetching prescription:", prescriptionId);

        const response = await api.get(`/prescriptions/${prescriptionId}`);

        console.log("Prescription response:", response.data);

        /*
         * Handles common API response structures:
         *
         * response.data.data
         *
         * response.data.data.prescription
         *
         */

        const data = response.data?.data;

        const prescriptionData = data?.prescription || data;

        setPrescription(prescriptionData);
      } catch (error) {
        console.log(
          "Prescription error:",
          error.response?.data || error.message,
        );

        setError(
          error.response?.data?.message || "Failed to load prescription.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadPrescription();
  }, [prescriptionId]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4880D8" />

        <Text style={styles.loadingText}>Loading prescription...</Text>
      </SafeAreaView>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="file-alert-outline"
            size={70}
            color="#EF4444"
          />

          <Text style={styles.errorTitle}>Unable to Load Prescription</Text>

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

  // ==========================================
  // NO PRESCRIPTION
  // ==========================================

  if (!prescription) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={70}
            color="#9CA3AF"
          />

          <Text style={styles.emptyTitle}>Prescription Not Found</Text>

          <Text style={styles.emptyText}>
            No prescription information is available for this appointment.
          </Text>

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

  // ==========================================
  // DATA
  // ==========================================

  const patient = prescription.patient || {};

  const doctor = prescription.doctor || {};

  const medicines = Array.isArray(prescription.medicines)
    ? prescription.medicines
    : [];

  // ==========================================
  // SCREEN
  // ==========================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={32}
              color="#4880D8"
            />
          </View>

          <View>
            <Text style={styles.title}>Prescription</Text>

            <Text style={styles.subtitle}>Prescription details</Text>
          </View>
        </View>

        {/* ================================= */}
        {/* PRESCRIPTION INFORMATION */}
        {/* ================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Prescription Information</Text>

          {prescription._id && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Prescription ID</Text>

              <Text style={styles.value}>{prescription._id}</Text>
            </View>
          )}

          {prescription.createdAt && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Date</Text>

              <Text style={styles.value}>
                {new Date(prescription.createdAt).toLocaleDateString()}
              </Text>
            </View>
          )}

          {/* {prescription.status && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Status</Text>

              <Text style={styles.status}>{prescription.status}</Text>
            </View>
          )} */}
        </View>

        {/* ================================= */}
        {/* PATIENT */}
        {/* ================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Patient</Text>

          <View style={styles.personRow}>
            <View style={styles.personIcon}>
              <MaterialCommunityIcons
                name="account"
                size={28}
                color="#4880D8"
              />
            </View>

            <View>
              <Text style={styles.personName}>
                {patient.fullname ||
                  patient.fullName ||
                  patient.name ||
                  "Patient"}
              </Text>

              {patient.email && (
                <Text style={styles.personDetail}>{patient.email}</Text>
              )}

              {patient.phone && (
                <Text style={styles.personDetail}>{patient.phone}</Text>
              )}
            </View>
          </View>
        </View>

        {/* ================================= */}
        {/* DOCTOR */}
        {/* ================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Doctor</Text>

          <View style={styles.personRow}>
            <View style={styles.personIcon}>
              <MaterialCommunityIcons name="doctor" size={28} color="#4880D8" />
            </View>

            <View>
              <Text style={styles.personName}>
                Dr.{" "}
                {doctor?.user?.fullname ||
                  doctor?.fullname ||
                  doctor?.name ||
                  "Doctor"}
              </Text>

              {doctor.specialization && (
                <Text style={styles.personDetail}>{doctor.specialization}</Text>
              )}

              {doctor.hospital && (
                <Text style={styles.personDetail}>{doctor.hospital}</Text>
              )}
            </View>
          </View>
        </View>

        {/* ================================= */}
        {/* DIAGNOSIS */}
        {/* ================================= */}

        {(prescription.diagnosis ||
          prescription.notes ||
          prescription.instructions) && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Medical Information</Text>

            {prescription.diagnosis && (
              <View style={styles.textSection}>
                <Text style={styles.label}>Diagnosis</Text>

                <Text style={styles.description}>{prescription.diagnosis}</Text>
              </View>
            )}

            {prescription.notes && (
              <View style={styles.textSection}>
                <Text style={styles.label}>Notes</Text>

                <Text style={styles.description}>{prescription.notes}</Text>
              </View>
            )}

            {/* {prescription.instructions && (
              <View style={styles.textSection}>
                <Text style={styles.label}>Instructions</Text>

                <Text style={styles.description}>
                  {prescription.instructions}
                </Text>
              </View>
            )} */}
          </View>
        )}

        {/* ================================= */}
        {/* medicines */}
        {/* ================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>medications</Text>

          {medicines.length === 0 ? (
            <View style={styles.noMedication}>
              <MaterialCommunityIcons
                name="pill-off"
                size={40}
                color="#9CA3AF"
              />

              <Text style={styles.emptyMedication}>
                No medication recorded.
              </Text>
            </View>
          ) : (
            medicines.map((medication, index) => (
              <View
                key={medication._id || medication.id || index}
                style={styles.medicationCard}
              >
                <View style={styles.medicationHeader}>
                  <View style={styles.pillIcon}>
                    <MaterialCommunityIcons
                      name="pill"
                      size={24}
                      color="#4880D8"
                    />
                  </View>

                  <Text style={styles.medicationName}>
                    {medication.medicineName ||
                      medication.medication ||
                      medication.drugName ||
                      "Medication"}
                  </Text>
                </View>

                {medication.dosage && (
                  <View style={styles.medicationRow}>
                    <Text style={styles.medicationLabel}>Dosage</Text>

                    <Text style={styles.medicationValue}>
                      {medication.dosage}
                    </Text>
                  </View>
                )}

                {medication.frequency && (
                  <View style={styles.medicationRow}>
                    <Text style={styles.medicationLabel}>Frequency</Text>

                    <Text style={styles.medicationValue}>
                      {medication.frequency}
                    </Text>
                  </View>
                )}

                {medication.duration && (
                  <View style={styles.medicationRow}>
                    <Text style={styles.medicationLabel}>Duration</Text>

                    <Text style={styles.medicationValue}>
                      {medication.duration}
                    </Text>
                  </View>
                )}

                {medication.instruction && (
                  <View style={styles.medicationRow}>
                    <Text style={styles.medicationLabel}>Instructions</Text>

                    <Text style={styles.medicationValue}>
                      {medication.instruction}
                    </Text>
                  </View>
                )}
              </View>
            ))
          )}
        </View>

        {/* ================================= */}
        {/* FOOTER */}
        {/* ================================= */}

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrescriptionDetailsScreen;
