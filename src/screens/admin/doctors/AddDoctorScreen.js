import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";

import { createDoctor } from "../../../redux/doctorSlice";

import styles from "./AddDoctorScreen.css";

const LANGUAGES = ["English", "French", "Arabic", "Igbo", "Yoruba", "Hausa"];

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AddDoctorScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.doctor);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    dob: "",
    specialization: "",
    department: "",
    hospital: "",
    qualification: "",

    licenseNumber: "",

    experience: "",

    consultationFee: "",

    biography: "",

    languages: [],

    availability: [],
  });

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleLanguage = (language) => {
    const exists = form.languages.includes(language);

    if (exists) {
      updateField(
        "languages",
        form.languages.filter((item) => item !== language),
      );
    } else {
      updateField("languages", [...form.languages, language]);
    }
  };

  const toggleDay = (day) => {
    const exists = form.availability.find((item) => item.day === day);

    if (exists) {
      updateField(
        "availability",
        form.availability.filter((item) => item.day !== day),
      );
    } else {
      updateField("availability", [
        ...form.availability,
        {
          day,
          startTime: "09:00",
          endTime: "17:00",
        },
      ]);
    }
  };

  const validate = () => {
    if (!form.fullname.trim())
      return Alert.alert("Validation", "Full name is required.");

    if (!form.email.trim())
      return Alert.alert("Validation", "Email is required.");

    if (!form.phone.trim())
      return Alert.alert("Validation", "Phone number is required.");

    if (!form.dob.trim())
      // <-- ADD THIS
      return Alert.alert("Validation", "Date of birth is required.");

    if (!form.specialization.trim())
      return Alert.alert("Validation", "Specialization is required.");

    if (!form.department.trim())
      return Alert.alert("Validation", "Department is required.");

    if (!form.hospital.trim())
      return Alert.alert("Validation", "Hospital is required.");

    if (!form.qualification.trim())
      return Alert.alert("Validation", "Qualification is required.");

    if (!form.licenseNumber.trim())
      return Alert.alert("Validation", "License Number is required.");

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const result = await dispatch(
      createDoctor({
        ...form,

        experience: Number(form.experience),

        consultationFee: Number(form.consultationFee),
      }),
    );

    if (createDoctor.fulfilled.match(result)) {
      Alert.alert("Success", "Doctor created successfully.");

      navigation.goBack();
    } else {
      Alert.alert(
        "Error",
        result.payload?.message || "Unable to create doctor.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Add Doctor</Text>

        <Text style={styles.section}>Personal Information</Text>

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={form.fullname}
          onChangeText={(text) => updateField("fullname", text)}
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => updateField("email", text)}
        />

        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(text) => updateField("phone", text)}
        />

        <TextInput
          placeholder="Date of Birth (YYYY-MM-DD)"
          style={styles.input}
          value={form.dob}
          onChangeText={(text) => updateField("dob", text)}
        />

        <Text style={styles.section}>Professional Information</Text>

        <TextInput
          placeholder="Specialization"
          style={styles.input}
          value={form.specialization}
          onChangeText={(text) => updateField("specialization", text)}
        />

        <TextInput
          placeholder="Department"
          style={styles.input}
          value={form.department}
          onChangeText={(text) => updateField("department", text)}
        />

        <TextInput
          placeholder="Hospital"
          style={styles.input}
          value={form.hospital}
          onChangeText={(text) => updateField("hospital", text)}
        />

        <TextInput
          placeholder="Qualification"
          style={styles.input}
          value={form.qualification}
          onChangeText={(text) => updateField("qualification", text)}
        />

        <TextInput
          placeholder="License Number"
          style={styles.input}
          value={form.licenseNumber}
          onChangeText={(text) => updateField("licenseNumber", text)}
        />

        <TextInput
          placeholder="Years of Experience"
          keyboardType="numeric"
          style={styles.input}
          value={form.experience}
          onChangeText={(text) => updateField("experience", text)}
        />

        <TextInput
          placeholder="Consultation Fee"
          keyboardType="numeric"
          style={styles.input}
          value={form.consultationFee}
          onChangeText={(text) => updateField("consultationFee", text)}
        />

        <TextInput
          placeholder="Biography"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          style={styles.textArea}
          value={form.biography}
          onChangeText={(text) => updateField("biography", text)}
        />

        <Text style={styles.section}>Languages</Text>

        <View style={styles.chipContainer}>
          {LANGUAGES.map((language) => {
            const active = form.languages.includes(language);

            return (
              <TouchableOpacity
                key={language}
                style={[styles.chip, active && styles.activeChip]}
                onPress={() => toggleLanguage(language)}
              >
                <Text
                  style={[styles.chipText, active && styles.activeChipText]}
                >
                  {language}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.section}>Availability</Text>

        <View style={styles.chipContainer}>
          {DAYS.map((day) => {
            const active = form.availability.find((item) => item.day === day);

            return (
              <TouchableOpacity
                key={day}
                style={[styles.chip, active && styles.activeChip]}
                onPress={() => toggleDay(day)}
              >
                <Text
                  style={[styles.chipText, active && styles.activeChipText]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Create Doctor</Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddDoctorScreen;
