import React, { useCallback, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";

import { useFocusEffect } from "@react-navigation/native";

import { fetchMyPrescriptions } from "../../../redux/prescriptionSlice";

import styles from "./PatientPrescriptions.css";

const PatientPrescriptions = ({ navigation }) => {
  const dispatch = useDispatch();

  // ==========================================
  // PRESCRIPTION REDUX STATE
  // ==========================================

  const {
    prescriptions,
    loading,
    error,
  } = useSelector((state) => state.prescription);

  // ==========================================
  // REFRESH STATE
  // ==========================================

  const [refreshing, setRefreshing] = useState(false);

  // ==========================================
  // FETCH PATIENT PRESCRIPTIONS
  // ==========================================

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchMyPrescriptions());
    }, [dispatch]),
  );

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = async () => {
    setRefreshing(true);

    await dispatch(fetchMyPrescriptions());

    setRefreshing(false);
  };

  // ==========================================
  // VIEW PRESCRIPTION
  // ==========================================

  const handleViewPrescription = (prescription) => {
    if (!prescription?._id) {
      console.log("Prescription ID is missing.");
      return;
    }

    navigation.navigate("PrescriptionDetailsScreen", {
      prescriptionId: prescription._id,
    });
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    try {
      const formattedDate = new Date(date);

      if (isNaN(formattedDate.getTime())) {
        return "Date not available";
      }

      return formattedDate.toLocaleDateString("en-NG", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return "Date not available";
    }
  };

  // ==========================================
  // GET DOCTOR NAME
  // ==========================================

  const getDoctorName = (prescription) => {
    const doctor = prescription?.doctor;

    return (
      doctor?.user?.fullname ||
      doctor?.fullname ||
      doctor?.name ||
      "Doctor"
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading && prescriptions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#4880D8" />

          <Text style={styles.loadingText}>
            Loading your prescriptions...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error && prescriptions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="file-alert-outline"
            size={70}
            color="#EF4444"
          />

          <Text style={styles.errorTitle}>
            Unable to Load Prescriptions
          </Text>

          <Text style={styles.errorText}>
            {error}
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => dispatch(fetchMyPrescriptions())}
          >
            <Text style={styles.retryButtonText}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // EMPTY
  // ==========================================

  if (prescriptions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={75}
            color="#9CA3AF"
          />

          <Text style={styles.emptyTitle}>
            No Prescriptions
          </Text>

          <Text style={styles.emptyText}>
            You do not have any prescriptions yet.
          </Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        {/* ==========================================
            HEADER
        ========================================== */}

        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="prescription"
              size={30}
              color="#4880D8"
            />
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>
              My Prescriptions
            </Text>

            <Text style={styles.subtitle}>
              Your prescribed medications
            </Text>
          </View>
        </View>

        {/* ==========================================
            PRESCRIPTION COUNT
        ========================================== */}

        <View style={styles.countCard}>
          <MaterialCommunityIcons
            name="file-document-multiple-outline"
            size={25}
            color="#4880D8"
          />

          <View style={styles.countContent}>
            <Text style={styles.countNumber}>
              {prescriptions.length}
            </Text>

            <Text style={styles.countLabel}>
              Prescription
              {prescriptions.length === 1 ? "" : "s"}
            </Text>
          </View>
        </View>

        {/* ==========================================
            PRESCRIPTION LIST
        ========================================== */}

        {prescriptions.map((prescription, index) => (
          <View
            key={prescription._id || index}
            style={styles.prescriptionCard}
          >
            {/* ======================================
                CARD HEADER
            ====================================== */}

            <View style={styles.cardHeader}>
              <View style={styles.prescriptionIcon}>
                <MaterialCommunityIcons
                  name="prescription"
                  size={28}
                  color="#4880D8"
                />
              </View>

              <View style={styles.cardHeaderContent}>
                <Text style={styles.cardTitle}>
                  Prescription #{index + 1}
                </Text>

                <Text style={styles.doctorText}>
                  Dr. {getDoctorName(prescription)}
                </Text>
              </View>
            </View>

            {/* ======================================
                DATE
            ====================================== */}

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="calendar"
                size={20}
                color="#6B7280"
              />

              <Text style={styles.infoText}>
                {formatDate(
                  prescription.createdAt ||
                    prescription.date
                )}
              </Text>
            </View>

            {/* ======================================
                MEDICATION COUNT
            ====================================== */}

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="pill"
                size={20}
                color="#6B7280"
              />

              <Text style={styles.infoText}>
                {Array.isArray(prescription.medicines)
                  ? prescription.medicines.length
                  : 0}{" "}
                medication
                {Array.isArray(prescription.medicines) &&
                prescription.medicines.length === 1
                  ? ""
                  : "s"}
              </Text>
            </View>

            {/* ======================================
                VIEW BUTTON
            ====================================== */}

            <TouchableOpacity
              style={styles.viewButton}
              onPress={() =>
                handleViewPrescription(prescription)
              }
            >
              <Text style={styles.viewButtonText}>
                View Prescription
              </Text>

              <MaterialCommunityIcons
                name="chevron-right"
                size={22}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientPrescriptions;