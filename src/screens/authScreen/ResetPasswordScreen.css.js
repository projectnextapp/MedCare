import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#4880D8",
  },

  scrollContainer: {
    flexGrow: 1,
  },

  // ================= HEADER =================

  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30,
  },

  logo: {
    width: 90,
    height: 60,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    letterSpacing: 1,
  },

  // ================= FORM =================

  formContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 10,
    textAlign: "center",
    color: "#666",
    fontSize: 15,
  },

  email: {
    marginTop: 6,
    textAlign: "center",
    color: "#4880D8",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 25,
  },

  label: {
    color: "#333",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 8,
  },

  // ================= OTP =================

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  otpInput: {
    width: width * 0.12,
    height: width * 0.14,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },

  // ================= TIMER =================

  timerContainer: {
    alignItems: "center",
    marginBottom: 25,
  },

  timerText: {
    color: "#666",
    fontSize: 14,
    marginBottom: 8,
  },

  resendText: {
    color: "#4880D8",
    fontWeight: "bold",
    fontSize: 15,
  },

  disabledResend: {
    color: "#B0B0B0",
  },

  // ================= PASSWORD =================

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  passwordInput: {
    flex: 1,
    height: 55,
    fontSize: 16,
    color: "#222",
  },

  // ================= PASSWORD TIPS =================

  passwordTips: {
    backgroundColor: "#EEF5FF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: "#4880D8",
  },

  tip: {
    color: "#555",
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },

  // ================= BUTTON =================

  button: {
    backgroundColor: "#4880D8",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.5,
  },

  // ================= LOGIN =================

  loginContainer: {
    alignItems: "center",
    marginTop: 25,
  },

  loginText: {
    color: "#4880D8",
    fontWeight: "600",
    fontSize: 16,
  },
});