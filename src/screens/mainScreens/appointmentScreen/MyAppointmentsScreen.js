import React, { useEffect, useMemo, useState, useCallback } from "react";

import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";

import { fetchMyAppointments } from "../../../redux/appointmentSlice";

import styles from "./MyAppointmentsScreen.css";

const MyAppointmentsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { appointments, loading, error } = useSelector(
    (state) => state.appointment,
  );

  const [search, setSearch] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchMyAppointments());
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await dispatch(fetchMyAppointments());

    setRefreshing(false);
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const keyword = search.toLowerCase();

      return (
        appointment.doctor?.user?.fullname?.toLowerCase().includes(keyword) ||
        appointment.doctor?.specialization?.toLowerCase().includes(keyword)
      );
    });
  }, [appointments, search]);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#16A34A";

      case "completed":
        return "#2563EB";

      case "cancelled":
        return "#DC2626";

      case "rejected":
        return "#991B1B";

      default:
        return "#F59E0B";
    }
  };

  const renderAppointment = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("AppointmentDetailsScreen", {
          appointmentId: item._id,
        })
      }
    >
      <Image
        source={{
          uri:
            item.doctor?.user?.profileImage ||
            "https://via.placeholder.com/120",
        }}
        style={styles.avatar}
      />

      <View style={styles.info}>
        <Text style={styles.name}>Dr. {item.doctor?.user?.fullname}</Text>

        <Text style={styles.specialization}>{item.doctor?.specialization}</Text>

        <Text style={styles.hospital}>🏥 {item.doctor?.hospital}</Text>

        <Text style={styles.date}>
          📅 {new Date(item.appointmentDate).toDateString()}
        </Text>

        <Text style={styles.time}>🕒 {item.appointmentTime}</Text>

        <Text style={styles.type}>{item.consultationType}</Text>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: getStatusColor(item.status),
            },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <MaterialCommunityIcons name="chevron-right" size={26} color="#999" />
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
      <Text style={styles.header}>My Appointments</Text>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={22} color="#999" />

        <TextInput
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={filteredAppointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4880D8"]}
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="calendar-remove"
              size={80}
              color="#D1D5DB"
            />

            <Text style={styles.emptyText}>No appointments found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default MyAppointmentsScreen;
