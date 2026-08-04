import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4880D8",
  },

  subtitle: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },

  email: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#4880D8",
    marginTop: 5,
    marginBottom: 40,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  otpInput: {
    width: 48,
    height: 55,
    borderWidth: 1,
    borderColor: "#4880D8",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },

  timer: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },

  resend: {
    textAlign: "center",
    color: "#4880D8",
    fontWeight: "bold",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#4880D8",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
});