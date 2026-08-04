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
  },

  subtitle: {
    color: "#777",
    marginTop: 5,
    marginBottom: 30,
  },

  label: {
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
    marginBottom: 18,
    fontSize: 16,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  passwordInput: {
    flex: 1,
    height: 52,
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  remember: {
    marginLeft: 8,
    color: "#444",
  },

  forgot: {
    color: "#4880D8",
    fontWeight: "600",
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
    fontSize: 18,
    fontWeight: "bold",
  },

  register: {
    marginTop: 25,
    textAlign: "center",
    color: "#4880D8",
    fontWeight: "600",
  },
});