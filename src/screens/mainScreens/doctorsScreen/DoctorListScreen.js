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

import { fetchDoctors } from "../../../redux/doctorSlice";

import styles from "./DoctorListScreen.css";

const DoctorListScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { doctors, loading, error } = useSelector((state) => state.doctor);

  const [search, setSearch] = useState("");

  const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     dispatch(fetchDoctors());
    //   }, [dispatch]);
    useEffect(() => {
      console.log("Loading doctors...");

      dispatch(fetchDoctors())
        .unwrap()
        .then((data) => {
          console.log("Doctors:", data);
        })
        .catch((err) => {
          console.log("Doctor Error:", err);
        });
    }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await dispatch(fetchDoctors());

    setRefreshing(false);
  }, [dispatch]);

  const filteredDoctors = useMemo(() => {
    const keyword = search.toLowerCase();

    return doctors.filter((doctor) => {
      return (
        doctor.user?.fullname?.toLowerCase().includes(keyword) ||
        doctor.specialization?.toLowerCase().includes(keyword) ||
        doctor.department?.toLowerCase().includes(keyword) ||
        doctor.hospital?.toLowerCase().includes(keyword)
      );
    });
  }, [search, doctors]);

  const renderDoctor = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("DoctorDetailsScreen", {
          doctorId: item._id,
        })
      }
    >
      {item.user?.profileImage ? (
        <Image
          source={{
            uri: item.user.profileImage,
          }}
          style={styles.avatar}
        />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <MaterialCommunityIcons name="doctor" size={42} color="#4880D8" />
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{item.user?.fullname}</Text>

        <View style={styles.ratingContainer}>
          <MaterialCommunityIcons name="star" size={18} color="#FFC107" />

          <Text style={styles.ratingText}>
            {item.rating || 0} ({item.totalReviews || 0} Reviews)
          </Text>
        </View>

        <Text style={styles.specialization}>{item.specialization}</Text>

        <Text style={styles.hospital}>🏥 {item.hospital}</Text>

        <Text style={styles.experience}>
          💼 {item.experience || 0} Years Experience
        </Text>

        <Text style={styles.fee}>
          ₦ {Number(item.consultationFee || 0).toLocaleString()}
        </Text>

        <View style={styles.availabilityContainer}>
          <View
            style={[
              styles.availableDot,
              {
                backgroundColor:
                  item.status === "available" ? "#22C55E" : "#EF4444",
              },
            ]}
          />

          <Text style={styles.availabilityText}>{item.status}</Text>
        </View>
      </View>

      <MaterialCommunityIcons name="chevron-right" size={28} color="#999" />
    </TouchableOpacity>
  );

  if (loading && doctors.length === 0) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4880D8" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Find a Doctor</Text>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={22} color="#999" />

        <TextInput
          style={styles.searchInput}
          placeholder="Search doctor..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item._id}
        renderItem={renderDoctor}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4880D8"]}
          />
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="doctor" size={80} color="#D1D5DB" />

              <Text style={styles.emptyText}>No doctors found</Text>
            </View>
          ) : null
        }
        contentContainerStyle={{
          paddingBottom: 30,
          flexGrow: filteredDoctors.length === 0 ? 1 : 0,
        }}
      />
    </SafeAreaView>
  );
};

export default DoctorListScreen;
