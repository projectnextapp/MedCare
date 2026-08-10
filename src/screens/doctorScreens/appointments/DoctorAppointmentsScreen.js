import React, { useEffect, useMemo, useState, useCallback } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";

import { fetchDoctorAppointments } from "../../../redux/appointmentSlice";

import styles from "./DoctorAppointmentsScreen.css";

const STATUS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

const DoctorAppointmentsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    appointments = [],
    loading,
    error,
  } = useSelector((state) => state.appointment);

  const [search, setSearch] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("All");

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await dispatch(fetchDoctorAppointments());

    setRefreshing(false);
  }, [dispatch]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const patient = appointment.patient?.fullname?.toLowerCase() || "";

      const keyword = search.toLowerCase();

      const searchMatch = patient.includes(keyword);

      const statusMatch =
        selectedStatus === "All"
          ? true
          : appointment.status?.toLowerCase() === selectedStatus.toLowerCase();

      return searchMatch && statusMatch;
    });
  }, [appointments, search, selectedStatus]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "#F59E0B";

      case "confirmed":
        return "#2563EB";

      case "completed":
        return "#10B981";

      case "cancelled":
        return "#EF4444";

      default:
        return "#6B7280";
    }
  };

  const renderAppointment = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("DoctorAppointmentDetailsScreen", {
          appointmentId: item._id,
        })
      }
    >
      <View style={styles.cardTop}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="account" size={34} color="#4880D8" />
        </View>

        <View style={styles.info}>
          <Text style={styles.patientName}>{item.patient?.fullname}</Text>

          <Text style={styles.reason}>{item.reason}</Text>

          <Text style={styles.date}>{item.appointmentDate}</Text>

          <Text style={styles.time}>{item.appointmentTime}</Text>
        </View>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: getStatusColor(item.status),
            },
          ]}
        >
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.type}>{item.consultationType}</Text>

        <MaterialCommunityIcons name="chevron-right" size={28} color="#999" />
      </View>
    </TouchableOpacity>
  );

  if (loading && appointments.length === 0) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4880D8" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Doctor Appointments</Text>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={22} color="#999" />

        <TextInput
          placeholder="Search patient..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={STATUS}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.filterContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedStatus(item)}
            style={[
              styles.filterButton,
              selectedStatus === item && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedStatus === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item._id}
        renderItem={renderAppointment}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="calendar-remove"
              size={90}
              color="#D1D5DB"
            />

            <Text style={styles.emptyText}>No appointments found.</Text>
          </View>
        }
        contentContainerStyle={{
          paddingBottom: 30,
          flexGrow: filteredAppointments.length === 0 ? 1 : 0,
        }}
      />
    </SafeAreaView>
  );
};

export default DoctorAppointmentsScreen;
