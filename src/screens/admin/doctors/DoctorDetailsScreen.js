import React, { useEffect } from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchDoctor,
  clearSelectedDoctor,
  fetchDoctorById,
} from "../../../redux/doctorSlice";

//delete the csss also
import styles from "./DoctorDetailsScreen.css";

const DoctorDetailsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { doctorId } = route.params;

  const { doctor, loading, error } = useSelector((state) => state.doctor);
  console.log("loading:", loading);
  console.log("doctor:", doctor);
  console.log("error:", error);

  // useEffect(() => {
  //   dispatch(fetchDoctor(doctorId));
  //   console.log("doctorId:", doctorId);

  //   return () => {
  //     dispatch(clearSelectedDoctor());
  //   };
  // }, []);
  useEffect(() => {
    console.log("Fetching doctor:", doctorId);

    dispatch(fetchDoctorById(doctorId));
  }, [dispatch, doctorId]);

  if (loading || !doctor) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4880D8" />
      </SafeAreaView>
    );
  }

  // const doctor = selectedDoctor;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Doctor Photo */}

        <Image
          source={{
            uri: doctor.user?.profileImage || "https://via.placeholder.com/200",
          }}
          style={styles.image}
        />

        {/* Name */}

        <Text style={styles.name}>Dr. {doctor.user?.fullname}</Text>

        {/* Specialization */}

        <Text style={styles.specialization}>{doctor.specialization}</Text>

        {/* Rating */}

        <View style={styles.ratingContainer}>
          <MaterialCommunityIcons name="star" size={20} color="#FFC107" />

          <Text style={styles.rating}>
            {doctor.rating}
            {"  "}({doctor.totalReviews} Reviews)
          </Text>
        </View>

        {/* Information */}

        <View style={styles.card}>
          <Text style={styles.label}>Hospital</Text>

          <Text style={styles.value}>{doctor.hospital}</Text>

          <Text style={styles.label}>Department</Text>

          <Text style={styles.value}>{doctor.department}</Text>

          <Text style={styles.label}>Qualification</Text>

          <Text style={styles.value}>{doctor.qualification}</Text>

          <Text style={styles.label}>Experience</Text>

          <Text style={styles.value}>{doctor.experience} Years</Text>

          <Text style={styles.label}>Consultation Fee</Text>

          <Text style={styles.fee}>
            ₦{Number(doctor.consultationFee).toLocaleString()}
          </Text>
        </View>

        {/* Biography */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About Doctor</Text>

          <Text style={styles.biography}>
            {doctor.biography || "No biography available."}
          </Text>
        </View>

        {/* Languages */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Languages</Text>

          {doctor.languages.length === 0 ? (
            <Text style={styles.value}>No language added.</Text>
          ) : (
            doctor.languages.map((language, index) => (
              <Text key={index} style={styles.value}>
                • {language}
              </Text>
            ))
          )}
        </View>

        {/* Availability */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Availability</Text>

          {doctor.availability.length === 0 ? (
            <Text style={styles.value}>Not Available</Text>
          ) : (
            doctor.availability.map((schedule, index) => (
              <Text key={index} style={styles.value}>
                {schedule.day}
                {" : "}
                {schedule.startTime}-{schedule.endTime}
              </Text>
            ))
          )}
        </View>

        {/* Button */}

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("BookAppointment", {
              doctorId: doctor._id,
            })
          }
        >
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorDetailsScreen;
