import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FB",
    paddingHorizontal: 18,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 10,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4880D8",
    marginBottom: 15,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 8,
  },

  value: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
    marginTop: 3,
  },

  statusBadge: {
    alignSelf: "flex-start",
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 30,
  },

  statusText: {
    color: "#FFFFFF",
    fontWeight: "700",
    textTransform: "capitalize",
  },

  confirmButton: {
    height: 55,
    backgroundColor: "#2563EB",

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginBottom: 15,
  },

  completeButton: {
    height: 55,
    backgroundColor: "#10B981",

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginBottom: 15,
  },

  cancelButton: {
    height: 55,
    backgroundColor: "#EF4444",

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginBottom: 15,
  },

  recordButton: {
    height: 55,
    backgroundColor: "#7C3AED",

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginBottom: 15,
  },

  prescriptionButton: {
    height: 55,
    backgroundColor: "#F59E0B",

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginBottom: 25,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },
});
