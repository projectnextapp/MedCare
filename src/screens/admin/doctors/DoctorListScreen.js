// import React, {
//     useEffect,
//     useState,
//     useMemo,
//     useCallback,
// } from "react";

// import {

//     View,

//     Text,

//     FlatList,

//     TextInput,

//     TouchableOpacity,

//     RefreshControl,

//     ActivityIndicator,

//     Image,

// } from "react-native";

// import { SafeAreaView } from "react-native-safe-area-context";

// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// import Ionicons from "@expo/vector-icons/Ionicons";

// import { useDispatch, useSelector } from "react-redux";

// import {
//     fetchDoctors,
//     clearError,
// } from "../../../redux/doctorSlice";

// import styles from "./DoctorListScreen.css";

// const DoctorListScreen = ({ navigation }) => {
//   const dispatch = useDispatch();

//   const { doctors, loading, error } = useSelector((state) => state.doctor);

//   const [search, setSearch] = useState("");

//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     dispatch(fetchDoctors());
//   }, []);

//   useEffect(() => {
//     return () => {
//       dispatch(clearError());
//     };
//   }, []);

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);

//     await dispatch(fetchDoctors());

//     setRefreshing(false);
//   }, []);

//   const filteredDoctors = useMemo(() => {
//     if (!search.trim()) {
//       return doctors;
//     }

//     const keyword = search.toLowerCase();

//     return doctors.filter((doctor) => {
//       return (
//         doctor.user?.fullname?.toLowerCase().includes(keyword) ||
//         doctor.specialization?.toLowerCase().includes(keyword) ||
//         doctor.department?.toLowerCase().includes(keyword) ||
//         doctor.hospital?.toLowerCase().includes(keyword)
//       );
//     });
//   }, [search, doctors]);

//   const renderDoctor = ({ item }) => {
//     const doctor = item.user || {};

//       return (

// //           <TouchableOpacity
// //     style={styles.bookButton}
// //     onPress={() =>
// //         navigation.navigate(
// //             "DoctorDetailsScreen",
// //             {
// //                 doctorId: item._id,
// //             }
// //         )
// //     }
// // >
// //     <Text style={styles.bookButtonText}>
// //         Book Appointment
// //     </Text>
// // </TouchableOpacity>
//       <TouchableOpacity
//         activeOpacity={0.9}
//         style={styles.card}
//         onPress={() =>
//           navigation.navigate(
//               "DoctorDetails",

//             {
//               doctorId: item._id,
//             },
//           )
//         }
//       >
//         {/* ===========================
//                     Doctor Header
//                 =========================== */}

//         <View style={styles.cardHeader}>
//           <View style={styles.avatarContainer}>
//             {doctor.profileImage ? (
//               <Image
//                 source={{
//                   uri: doctor.profileImage,
//                 }}
//                 style={styles.avatar}
//               />
//             ) : (
//               <View style={styles.avatarPlaceholder}>
//                 <Ionicons name="person" size={34} color="#FFFFFF" />
//               </View>
//             )}
//           </View>

//           <View style={styles.infoContainer}>
//             <Text style={styles.doctorName}> Dr. {doctor.fullname || "Unknown"}</Text>

//             <Text style={styles.specialization}>{item.specialization}</Text>

//             <Text style={styles.department}>{item.department}</Text>
//           </View>
//         </View>

//         {/* ===========================
//                     Hospital
//                 =========================== */}

//         <View style={styles.row}>
//           <MaterialCommunityIcons
//             name="hospital-building"
//             size={18}
//             color="#4880D8"
//           />

//           <Text style={styles.rowText}>{item.hospital}</Text>
//         </View>

//         {/* ===========================
//                     Experience
//                 =========================== */}

//         <View style={styles.row}>
//           <MaterialCommunityIcons
//             name="briefcase-outline"
//             size={18}
//             color="#4880D8"
//           />

//           <Text style={styles.rowText}>{item.experience} Years Experience</Text>
//         </View>

//         {/* ===========================
//                     Consultation Fee
//                 =========================== */}

//         <View style={styles.row}>
//           <MaterialCommunityIcons name="cash" size={18} color="#2E7D32" />

//           <Text style={styles.feeText}>
//             ₦{Number(item.consultationFee || 0).toLocaleString()}
//           </Text>
//         </View>

//         {/* ===========================
//                     Rating
//                 =========================== */}

//         <View style={styles.ratingContainer}>
//           <MaterialCommunityIcons name="star" size={18} color="#FFC107" />

//           <Text style={styles.ratingText}>{(item.rating || 0).toFixed(1)}</Text>

//           <Text style={styles.reviewText}>
//             ({item.totalReviews || 0}
//             Reviews)
//           </Text>
//         </View>

//         {/* ===========================
//                     Status
//                 =========================== */}

//         <View style={styles.footer}>
//           <View
//             style={[
//               styles.statusBadge,

//               item.status === "available"
//                 ? styles.available
//                 : item.status === "busy"
//                   ? styles.busy
//                   : styles.offline,
//             ]}
//           >
//             <Text style={styles.statusText}>
//               {item.status

//                 .charAt(0)

//                 .toUpperCase() + item.status.slice(1)}
//             </Text>
//           </View>

//           <TouchableOpacity
//             style={styles.viewButton}
//             onPress={() =>
//               navigation.navigate(
//                 "DoctorDetails",

//                 {
//                   doctorId: item._id,
//                 },
//               )
//             }
//           >
//             <Text style={styles.viewButtonText}>View Details</Text>
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <View>
//           <Text style={styles.title}>Doctors</Text>

//           <Text style={styles.subtitle}>Manage hospital doctors</Text>
//         </View>

//         <TouchableOpacity
//           style={styles.addButton}
//           onPress={() => navigation.navigate("AddDoctor")}
//         >
//           <Ionicons name="add" size={22} color="#FFF" />

//           <Text style={styles.addButtonText}>Add</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.searchContainer}>
//         <MaterialCommunityIcons name="magnify" size={22} color="#777" />

//         <TextInput
//           placeholder="Search doctors..."
//           placeholderTextColor="#999"
//           value={search}
//           onChangeText={setSearch}
//           style={styles.searchInput}
//         />
//       </View>
//       {error ? (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{error}</Text>
//         </View>
//       ) : null}
//       {loading && doctors.length === 0 ? (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color="#4880D8" />
//         </View>
//       ) : null}

//       <FlatList
//         data={filteredDoctors}
//         keyExtractor={(item) => item._id}
//         renderItem={renderDoctor}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContainer}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={["#4880D8"]}
//             tintColor="#4880D8"
//           />
//         }
//         ListEmptyComponent={() =>
//           !loading && (
//             <View style={styles.emptyContainer}>
//               <MaterialCommunityIcons name="doctor" size={80} color="#C8C8C8" />

//               <Text style={styles.emptyTitle}>No Doctors Found</Text>

//               <Text style={styles.emptySubtitle}>
//                 Add your first doctor to begin managing your hospital.
//               </Text>
//             </View>
//           )
//         }
//       />

//       {/* ===============================
//                 Floating Add Button
//             =============================== */}

//       <TouchableOpacity
//         activeOpacity={0.9}
//         style={styles.fab}
//         onPress={() => navigation.navigate("AddDoctor")}
//       >
//         <Ionicons name="add" size={30} color="#FFF" />
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default DoctorListScreen;

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

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddDoctorScreen")}
      >
        <MaterialCommunityIcons name="plus" size={28} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DoctorListScreen;
