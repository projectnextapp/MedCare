import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

// import AvailabilityCard from "../../components/availability/AvailabilityCard";
import AvailabilityCard from "../../../../components/availability/AvailabilityCard"


// import {
//   fetchDoctorById,
//   updateDoctorAvailability,
// } from "../../redux/doctorSlice";
import {
  fetchDoctorById,
  updateDoctorAvailability,
} from "../../../redux/doctorSlice";

import styles from "./DoctorAvailabilityScreen.css";

const DEFAULT_AVAILABILITY = [
  {
    day: "Monday",
    enabled: false,
    startTime: "",
    endTime: "",
  },
  {
    day: "Tuesday",
    enabled: false,
    startTime: "",
    endTime: "",
  },
  {
    day: "Wednesday",
    enabled: false,
    startTime: "",
    endTime: "",
  },
  {
    day: "Thursday",
    enabled: false,
    startTime: "",
    endTime: "",
  },
  {
    day: "Friday",
    enabled: false,
    startTime: "",
    endTime: "",
  },
  {
    day: "Saturday",
    enabled: false,
    startTime: "",
    endTime: "",
  },
  {
    day: "Sunday",
    enabled: false,
    startTime: "",
    endTime: "",
  },
];

const DoctorAvailabilityScreen = ({ route }) => {
  const dispatch = useDispatch();

  const { doctorId } = route.params;

  const { doctor, loading } = useSelector((state) => state.doctor);

  const [availability, setAvailability] = useState(DEFAULT_AVAILABILITY);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchDoctorById(doctorId));
  }, []);

  useEffect(() => {
    if (!doctor) return;

    if (doctor.availability && doctor.availability.length > 0) {
      const merged = DEFAULT_AVAILABILITY.map((day) => {
        const found = doctor.availability.find((item) => item.day === day.day);

        return found
          ? {
              ...day,
              ...found,
            }
          : day;
      });

      setAvailability(merged);
    }
  }, [doctor]);

  const updateDay = (updatedDay) => {
    setAvailability((prev) =>
      prev.map((item) => (item.day === updatedDay.day ? updatedDay : item)),
    );
  };

  const handleSave = async () => {
    setSaving(true);

    const result = await dispatch(
      updateDoctorAvailability({
        id: doctorId,
        availability,
      }),
    );

    setSaving(false);

    if (updateDoctorAvailability.fulfilled.match(result)) {
      Alert.alert("Success", "Availability updated successfully.");
    } else {
      Alert.alert(
        "Error",
        result.payload?.message || "Unable to save availability.",
      );
    }
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
      <Text style={styles.title}>Doctor Availability</Text>

      <FlatList
        data={availability}
        keyExtractor={(item) => item.day}
        renderItem={({ item }) => (
          <AvailabilityCard item={item} onChange={updateDay} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      />

      <TouchableOpacity
        style={styles.button}
        disabled={saving}
        onPress={handleSave}
      >
        {saving ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Save Availability</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DoctorAvailabilityScreen;
