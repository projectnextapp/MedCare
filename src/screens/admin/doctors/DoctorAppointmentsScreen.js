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

  const appointmentState = useSelector((state) => state.appointment);
  
  // Safely extract appointments handling array wrappers or different state shapes
  const rawAppointments = Array.isArray(appointmentState?.appointments)
    ? appointmentState.appointments
    : Array.isArray(appointmentState?.data)
    ? appointmentState.data
    : Array.isArray(appointmentState)
    ? appointmentState
    : [];

  const loading = appointmentState?.loading ?? false;
  const error = appointmentState?.error ?? null;

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
    if (!Array.isArray(rawAppointments)) return [];

    return rawAppointments.filter((appointment) => {
      // Robust patient name resolution checking common property variations
      const patientName =
        appointment?.patient?.fullname ||
        appointment?.patient?.fullName ||
        appointment?.patient?.name ||
        appointment?.patientName ||
        "";

      const keyword = search.trim().toLowerCase();
      const searchMatch = keyword === "" || patientName.toLowerCase().includes(keyword);

      const currentStatus = (appointment?.status || "").toLowerCase();
      const targetStatus = selectedStatus.toLowerCase();

      const statusMatch =
        selectedStatus === "All" ? true : currentStatus === targetStatus;

      return searchMatch && statusMatch;
    });
  }, [rawAppointments, search, selectedStatus]);

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

  const renderAppointment = ({ item }) => {
    const patientName =
      item?.patient?.fullname ||
      item?.patient?.fullName ||
      item?.patient?.name ||
      "Unknown Patient";

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("DoctorAppointmentDetails", {
            appointmentId: item._id || item.id,
          })
        }
      >
        <View style={styles.cardTop}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={34} color="#4880D8" />
          </View>

          <View style={styles.info}>
            <Text style={styles.patientName}>{patientName}</Text>
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
  };

  if (loading && rawAppointments.length === 0) {
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

      {error && <Text style={styles.error}>{typeof error === 'string' ? error : 'Failed to fetch appointments'}</Text>}

      <FlatList
        data={filteredAppointments}
        keyExtractor={(item, index) => item._id || item.id || index.toString()}
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