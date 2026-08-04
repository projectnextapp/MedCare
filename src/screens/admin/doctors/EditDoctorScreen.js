import React, {
  useEffect,
  useState,
} from "react";

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

import {
  fetchDoctorById,
  updateDoctorProfile,
  clearDoctorSuccess,
} from "../../../redux/doctorSlice";

import styles from "./EditDoctorScreen.css";

const EditDoctorScreen = ({ navigation, route }) => {
  const { doctorId } = route.params;

  const dispatch = useDispatch();

  const { doctor, loading, success, error } = useSelector(
    (state) => state.doctor,
  );

  const [fullname, setFullname] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [specialization, setSpecialization] = useState("");

  const [department, setDepartment] = useState("");

  const [hospital, setHospital] = useState("");

  const [qualification, setQualification] = useState("");

  const [experience, setExperience] = useState("");

  const [consultationFee, setConsultationFee] = useState("");

  const [licenseNumber, setLicenseNumber] = useState("");

  const [biography, setBiography] = useState("");

  useEffect(() => {
    dispatch(fetchDoctorById(doctorId));
  }, [dispatch]);
  useEffect(() => {
    if (!doctor) return;

    setFullname(doctor.user?.fullname || "");

    setEmail(doctor.user?.email || "");

    setPhone(doctor.user?.phone || "");

    setSpecialization(doctor.specialization || "");

    setDepartment(doctor.department || "");

    setHospital(doctor.hospital || "");

    setQualification(doctor.qualification || "");

    setExperience(String(doctor.experience || ""));

    setConsultationFee(String(doctor.consultationFee || ""));

    setLicenseNumber(doctor.licenseNumber || "");

    setBiography(doctor.biography || "");
  }, [doctor]);

  useEffect(() => {
    if (success) {
      Alert.alert("Success", "Doctor updated successfully.");

      dispatch(clearDoctorSuccess());

      navigation.goBack();
    }
  }, [success]);

  const handleUpdate = () => {
    if (!fullname || !email || !phone || !specialization) {
      return Alert.alert("Validation", "Please complete all required fields.");
    }

    dispatch(
      updateDoctorProfile({
        id: doctorId,

        data: {
          fullname,

          email,

          phone,

          specialization,

          department,

          hospital,

          qualification,

          experience: Number(experience),

          consultationFee: Number(consultationFee),

          licenseNumber,

          biography,
        },
      }),
    );
  };

  if (loading && !doctor) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4880D8" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Edit Doctor</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullname}
          onChangeText={setFullname}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          style={styles.input}
          placeholder="Specialization"
          value={specialization}
          onChangeText={setSpecialization}
        />

        <TextInput
          style={styles.input}
          placeholder="Department"
          value={department}
          onChangeText={setDepartment}
        />

        <TextInput
          style={styles.input}
          placeholder="Hospital"
          value={hospital}
          onChangeText={setHospital}
        />

        <TextInput
          style={styles.input}
          placeholder="Qualification"
          value={qualification}
          onChangeText={setQualification}
        />

        <TextInput
          style={styles.input}
          placeholder="Experience"
          keyboardType="numeric"
          value={experience}
          onChangeText={setExperience}
        />

        <TextInput
          style={styles.input}
          placeholder="Consultation Fee"
          keyboardType="numeric"
          value={consultationFee}
          onChangeText={setConsultationFee}
        />

        <TextInput
          style={styles.input}
          placeholder="License Number"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
        />

        <TextInput
          style={[
            styles.input,
            {
              height: 120,
              textAlignVertical: "top",
            },
          ]}
          placeholder="Biography"
          multiline
          value={biography}
          onChangeText={setBiography}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdate}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Updating..." : "Update Doctor"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditDoctorScreen;