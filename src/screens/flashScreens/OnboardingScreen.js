import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0066FF" />

      {/* Decorative Top Background Vector Lines & Shapes */}
      <View style={styles.topVectorCircle1} />
      <View style={styles.topVectorCircle2} />
      <View style={styles.lineDoodleContainer}>
        
        <View style={styles.doodleLoop} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              {/* <Text style={styles.logoIconText}>MC</Text> */}
              
  <Image 
    source={require("../../../assets/images/splash3.png")} 
    style={styles.logoImage}
    resizeMode="contain"
  />

            </View>
            <Text style={styles.brandName}>MedCare</Text>
          </View>
        </View>

        {/* Main Text Section */}
        <View style={styles.textContainer}>
          <Text style={styles.mainTitle}>
            We’ll help you{"\n"}take care of{"\n"}yourself
          </Text>
        </View>

        {/* Decorative Yellow Star Element */}
        <View style={styles.starContainer}>
          <Text style={styles.starText}>✦</Text>
        </View>

        {/* Central Illustration Card */}
        <View style={styles.cardContainer}>
          {/* Main Content White Card */}
          <View style={styles.whiteCard}>
            <Text style={styles.cardTitle}>Good Health</Text>
            <Text style={styles.cardTitle}>is Wealth</Text>

            {/* Doctors Avatars Row */}
            <View style={styles.avatarRow}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1606787364410-947e10173148?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
                style={styles.avatar}
              />
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
                style={[styles.avatar, styles.middleAvatar]}
              />
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
                style={styles.avatar}
              />
            </View>
          </View>

            {/* Glassmorphic Side Overlay */}
          <View style={styles.glassOverlayCurve} />
        </View>

        <View style={{ flex: 1 }} />

        {/* Bottom Navigation Section */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("FlashScreen1")}
          style={styles.nextButton} activeOpacity={0.8}>
            <Text style={styles.arrowText}>↗</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0066FF", // Primary sharp blue background
    paddingTop: 2,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    // paddingTop: 20,
    
  },
  // Abstract background decorations
  topVectorCircle1: {
    position: "absolute",
    top: 50,
    left: 30,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#00E5FF",
    opacity: 0.8,
  },
  topVectorCircle2: {
    position: "absolute",
    top: 85,
    left: 55,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#00E5FF",
    opacity: 0.6,
  },
  lineDoodleContainer: {
    position: "absolute",
    top: -20,
    right: -40,
    width: width * 0.7,
    height: height * 0.3,
    opacity: 0.25,
  },
  doodleLoop: {
    width: "100%",
    height: "100%",
    borderWidth: 1.5,
    borderColor: "#FFF",
    borderRadius: 120,
    transform: [{ rotate: "-30deg" }],
  },
  // Header Logo styles
  header: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    width: 28,
    height: 28,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
logoImage: {
  width: "100%",
  height: "100%",
},

  logoIconText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  brandName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
    opacity: 0.9,
  },
  // Title Typography
  textContainer: {
    marginTop: height * 0.05,
  },
  mainTitle: {
    fontSize: width * 0.1, // Scale size fluidly based on screen width
    fontWeight: "700",
    color: "#FFF",
    lineHeight: width * 0.13,
    letterSpacing: -0.5,
  },
  // Yellow Star
  starContainer: {
    position: "absolute",
    right: 35,
    top: height * 0.28,
  },
  starText: {
    fontSize: 48,
    color: "#FFE500", // Bright yellow
  },
  // Main Content Card
  cardContainer: {
    marginTop: height * 0.06,
    width: "100%",
    height: height * 0.38,
    position: "relative",
  },
  whiteCard: {
    backgroundColor: "#FFF",
    width: "90%",
    height: "100%",
    borderRadius: 36,
    paddingTop: 35,
    paddingHorizontal: 28,
    transform: [{ rotate: "-6deg" }], // Rotated axis exactly like reference mockup
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 1,
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111",
    lineHeight: 36,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#EEE",
  },
  middleAvatar: {
    marginHorizontal: 12,
  },
  // Glassmorphic side overlay element
  glassOverlayCurve: {
    position: "absolute",
    right: -10,
    top: "10%",
    width: "30%",
    height: "85%",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    zIndex: 2,
    transform: [{ rotate: "8deg" }],
  },
  // Bottom layout element
  bottomBar: {
    alignItems: "flex-end",
    marginBottom: 20,
    paddingRight: 10,
  },
  nextButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#000", // Solid black circle base
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  arrowText: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "400",
  },
});

export default OnboardingScreen;
