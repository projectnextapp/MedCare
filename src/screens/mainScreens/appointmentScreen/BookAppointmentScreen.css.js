import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    paddingHorizontal: 20,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 20,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 4,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  specialization: {
    marginTop: 5,
    fontSize: 16,
    color: "#4880D8",
    fontWeight: "600",
  },

  hospital: {
    marginTop: 6,
    color: "#6B7280",
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    paddingHorizontal: 15,
    paddingVertical: 15,

    marginBottom: 15,

    justifyContent: "center",
  },

  picker: {
    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E5E7EB",

    borderRadius: 12,

    marginBottom: 15,

    overflow: "hidden",
  },

  textInput: {
    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E5E7EB",

    borderRadius: 12,

    paddingHorizontal: 15,
    paddingVertical: 15,

    fontSize: 16,

    marginBottom: 15,

    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#4880D8",

    paddingVertical: 17,

    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 10,
    marginBottom: 35,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  label: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 8,
    fontWeight: "600",
  },

  errorText: {
    color: "#DC2626",
    marginBottom: 12,
    fontSize: 14,
  },

  successText: {
    color: "#16A34A",
    marginBottom: 12,
    fontSize: 14,
  },
});
