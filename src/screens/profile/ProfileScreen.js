import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../../redux/authSlice";

import styles from "./ProfileScreen.css";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await dispatch(logoutUser());

          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          });
        },
      },
    ]);
  };

  const MenuItem = ({ icon, title, screen }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate(screen)}
    >
      <View style={styles.menuLeft}>
        <MaterialCommunityIcons name={icon} size={24} color="#4880D8" />

        <Text style={styles.menuTitle}>{title}</Text>
      </View>

      <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {user?.profileImage ? (
            <Image source={{ uri: user.profileImage }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <MaterialCommunityIcons name="account" size={70} color="#fff" />
            </View>
          )}

          <Text style={styles.name}>{user?.fullname || "Unknown User"}</Text>

          <Text style={styles.email}>{user?.email}</Text>

          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user?.role?.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{user?.phone || "-"}</Text>

          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.value}>{user?.dob || "-"}</Text>
        </View>

        <View style={styles.menuContainer}>
          <MenuItem
            icon="account-edit"
            title="Edit Profile"
            screen="EditProfileScreen"
          />

          <MenuItem
            icon="lock-reset"
            title="Change Password"
            screen="ChangePasswordScreen"
          />

          <MenuItem
            icon="bell-outline"
            title="Notifications"
            screen="NotificationScreen"
          />

          <MenuItem
            icon="shield-lock-outline"
            title="Privacy Policy"
            screen="PrivacyPolicyScreen"
          />

          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            screen="HelpSupportScreen"
          />

          <MenuItem
            icon="information-outline"
            title="About MedCare"
            screen="AboutScreen"
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="#fff" />

          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
