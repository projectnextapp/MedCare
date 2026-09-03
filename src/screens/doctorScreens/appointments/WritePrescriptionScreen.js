import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";

import {
  createPrescription,
  clearPrescriptionError,
} from "../../../redux/prescriptionSlice";

import styles from "./WritePrescriptionScreen.css";

const WritePrescriptionScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  // ==========================================
  // GET APPOINTMENT DATA
  // ==========================================

  const { appointmentId } = route.params;

  // ==========================================
  // REDUX
  // ==========================================

  const { loading, error, success } = useSelector(
    (state) => state.prescription,
  );

  // ==========================================
  // FORM
  // ==========================================

  const [diagnosis, setDiagnosis] = useState("");

  const [notes, setNotes] = useState("");

  // ==========================================
  // MEDICINES
  // ==========================================

  const [medicines, setMedicines] = useState([
    {
      medicineName: "",
      dosage: "",
      frequency: "",
      duration: "",
      instruction: "",
    },
  ]);

  // ==========================================
  // ADD MEDICINE
  // ==========================================

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        medicineName: "",
        dosage: "",
        frequency: "",
        duration: "",
        instruction: "",
      },
    ]);
  };

  // ==========================================
  // REMOVE MEDICINE
  // ==========================================

  const removeMedicine = (index) => {
    if (medicines.length === 1) {
      Alert.alert(
        "Medicine Required",
        "A prescription must contain at least one medicine.",
      );

      return;
    }

    const updatedMedicines = medicines.filter(
      (_, medicineIndex) => medicineIndex !== index,
    );

    setMedicines(updatedMedicines);
  };

  // ==========================================
  // UPDATE MEDICINE
  // ==========================================

  const updateMedicine = (index, field, value) => {
    const updatedMedicines = [...medicines];

    updatedMedicines[index][field] = value;

    setMedicines(updatedMedicines);
  };

  // ==========================================
  // VALIDATE FORM
  // ==========================================

  const validateForm = () => {
    if (!diagnosis.trim()) {
      Alert.alert(
        "Diagnosis Required",
        "Please enter the diagnosis.",
      );

      return false;
    }

    for (let i = 0; i < medicines.length; i++) {
      const medicine = medicines[i];

      if (!medicine.medicineName.trim()) {
        Alert.alert(
          "Medicine Required",
          `Please enter the medicine name for medicine ${i + 1}.`,
        );

        return false;
      }

      if (!medicine.dosage.trim()) {
        Alert.alert(
          "Dosage Required",
          `Please enter the dosage for ${medicine.medicineName || `medicine ${i + 1}`}.`,
        );

        return false;
      }

      if (!medicine.frequency.trim()) {
        Alert.alert(
          "Frequency Required",
          `Please enter the frequency for ${medicine.medicineName || `medicine ${i + 1}`}.`,
        );

        return false;
      }

      if (!medicine.duration.trim()) {
        Alert.alert(
          "Duration Required",
          `Please enter the duration for ${medicine.medicineName || `medicine ${i + 1}`}.`,
        );

        return false;
      }
    }

    return true;
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    dispatch(clearPrescriptionError());

    const prescriptionData = {
      appointment: appointmentId,

      diagnosis: diagnosis.trim(),

      medicines: medicines.map((medicine) => ({
        medicineName: medicine.medicineName.trim(),

        dosage: medicine.dosage.trim(),

        frequency: medicine.frequency.trim(),

        duration: medicine.duration.trim(),

        instruction: medicine.instruction.trim(),
      })),

      notes: notes.trim(),
    };

    try {
      const result = await dispatch(
        createPrescription(prescriptionData),
      ).unwrap();

      if (result) {
        Alert.alert(
          "Success",
          "Prescription created successfully.",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ],
        );
      }
    } catch (err) {
      console.log("Create Prescription Error:", err);

      Alert.alert(
        "Error",
        err?.message ||
          "Failed to create prescription.",
      );
    }
  };

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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={26}
              color="#222"
            />
          </TouchableOpacity>

          <Text style={styles.title}>
            Write Prescription
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* ================================= */}
        {/* APPOINTMENT */}
        {/* ================================= */}

        <View style={styles.infoCard}>
          <MaterialCommunityIcons
            name="calendar-check"
            size={24}
            color="#4880D8"
          />

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>
              Appointment
            </Text>

            <Text style={styles.infoValue}>
              {appointmentId}
            </Text>
          </View>
        </View>

        {/* ================================= */}
        {/* DIAGNOSIS */}
        {/* ================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Diagnosis
          </Text>

          <TextInput
            placeholder="Enter diagnosis"
            value={diagnosis}
            onChangeText={setDiagnosis}
            style={[
              styles.input,
              styles.textArea,
            ]}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* ================================= */}
        {/* MEDICINES */}
        {/* ================================= */}

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Medicines
            </Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={addMedicine}
            >
              <MaterialCommunityIcons
                name="plus"
                size={20}
                color="#FFFFFF"
              />

              <Text style={styles.addButtonText}>
                Add
              </Text>
            </TouchableOpacity>
          </View>

          {medicines.map((medicine, index) => (
            <View
              key={index}
              style={styles.medicineCard}
            >
              <View style={styles.medicineHeader}>
                <Text style={styles.medicineTitle}>
                  Medicine {index + 1}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    removeMedicine(index)
                  }
                >
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={24}
                    color="#EF4444"
                  />
                </TouchableOpacity>
              </View>

              {/* Medicine Name */}

              <Text style={styles.label}>
                Medicine Name
              </Text>

              <TextInput
                placeholder="e.g. Paracetamol"
                value={medicine.medicineName}
                onChangeText={(value) =>
                  updateMedicine(
                    index,
                    "medicineName",
                    value,
                  )
                }
                style={styles.input}
              />

              {/* Dosage */}

              <Text style={styles.label}>
                Dosage
              </Text>

              <TextInput
                placeholder="e.g. 500mg"
                value={medicine.dosage}
                onChangeText={(value) =>
                  updateMedicine(
                    index,
                    "dosage",
                    value,
                  )
                }
                style={styles.input}
              />

              {/* Frequency */}

              <Text style={styles.label}>
                Frequency
              </Text>

              <TextInput
                placeholder="e.g. Twice daily"
                value={medicine.frequency}
                onChangeText={(value) =>
                  updateMedicine(
                    index,
                    "frequency",
                    value,
                  )
                }
                style={styles.input}
              />

              {/* Duration */}

              <Text style={styles.label}>
                Duration
              </Text>

              <TextInput
                placeholder="e.g. 5 days"
                value={medicine.duration}
                onChangeText={(value) =>
                  updateMedicine(
                    index,
                    "duration",
                    value,
                  )
                }
                style={styles.input}
              />

              {/* Instructions */}

              <Text style={styles.label}>
                Instructions
              </Text>

              <TextInput
                placeholder="e.g. Take after meals"
                value={medicine.instruction}
                onChangeText={(value) =>
                  updateMedicine(
                    index,
                    "instruction",
                    value,
                  )
                }
                style={[
                  styles.input,
                  styles.textAreaSmall,
                ]}
                multiline
                textAlignVertical="top"
              />
            </View>
          ))}
        </View>

        {/* ================================= */}
        {/* NOTES */}
        {/* ================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Additional Notes
          </Text>

          <TextInput
            placeholder="Enter additional instructions or notes"
            value={notes}
            onChangeText={setNotes}
            style={[
              styles.input,
              styles.textArea,
            ]}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {error && (
          <View style={styles.errorContainer}>
            <MaterialCommunityIcons
              name="alert-circle"
              size={22}
              color="#EF4444"
            />

            <Text style={styles.errorText}>
              {typeof error === "string"
                ? error
                : "Failed to create prescription."}
            </Text>
          </View>
        )}

        {/* ================================= */}
        {/* SAVE BUTTON */}
        {/* ================================= */}

        <TouchableOpacity
          style={[
            styles.submitButton,
            loading && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#FFFFFF"
            />
          ) : (
            <>
              <MaterialCommunityIcons
                name="content-save"
                size={22}
                color="#FFFFFF"
              />

              <Text style={styles.submitButtonText}>
                Save Prescription
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WritePrescriptionScreen;
