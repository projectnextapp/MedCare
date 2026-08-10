import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 18,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },

  label: {
    marginTop: 15,
    marginBottom: 8,
    fontWeight: "600",
    color: "#374151",
    fontSize: 15,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
  },

  textarea: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    minHeight: 120,
    textAlignVertical: "top",
    fontSize: 15,
  },

  button: {
    marginTop: 30,
    backgroundColor: "#2563EB",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 40,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
