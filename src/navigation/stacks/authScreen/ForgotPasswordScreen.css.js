import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#4880D8",
  },

  scrollContainer: {
    flexGrow: 1,
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  logo: {
    width: 90,
    height: 60,
  },

  logoText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    letterSpacing: 1,
  },

  formContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },

  subtitle: {
    color: "#666",
    lineHeight: 22,
    marginBottom: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    height: 52,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 25,
  },

  button: {
    backgroundColor: "#4880D8",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 17,
  },

  backButton: {
    marginTop: 25,
    alignItems: "center",
  },

  backText: {
    color: "#4880D8",
    fontWeight: "600",
    fontSize: 16,
  },
});