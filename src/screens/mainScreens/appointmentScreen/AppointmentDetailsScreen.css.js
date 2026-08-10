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

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    padding: 20,

    marginTop: 20,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 6,

    elevation: 4,
  },

  avatar: {
    width: 120,

    height: 120,

    borderRadius: 60,

    alignSelf: "center",

    marginBottom: 15,

    backgroundColor: "#E5E7EB",
  },

  name: {
    fontSize: 24,

    fontWeight: "700",

    color: "#111827",

    textAlign: "center",
  },

  specialization: {
    marginTop: 6,

    fontSize: 17,

    color: "#4880D8",

    fontWeight: "600",

    textAlign: "center",
  },

  hospital: {
    marginTop: 8,

    color: "#6B7280",

    fontSize: 15,

    textAlign: "center",
  },

  statusBadge: {
    alignSelf: "flex-start",

    paddingHorizontal: 14,

    paddingVertical: 8,

    borderRadius: 20,

    marginBottom: 18,
  },

  statusText: {
    color: "#FFFFFF",

    fontWeight: "700",

    textTransform: "capitalize",

    fontSize: 13,
  },

  label: {
    marginTop: 14,

    fontSize: 14,

    fontWeight: "700",

    color: "#6B7280",
  },

  value: {
    marginTop: 5,

    fontSize: 16,

    color: "#111827",

    lineHeight: 24,
  },

  rescheduleButton: {
    marginTop: 25,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#2563EB",

    borderRadius: 12,

    paddingVertical: 16,
  },

  videoButton: {
    marginTop: 15,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#16A34A",

    borderRadius: 12,

    paddingVertical: 16,
  },

  prescriptionButton: {
    marginTop: 15,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#7C3AED",

    borderRadius: 12,

    paddingVertical: 16,
  },

  cancelButton: {
    marginTop: 15,

    marginBottom: 35,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#DC2626",

    borderRadius: 12,

    paddingVertical: 16,
  },

  buttonText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 16,

    marginLeft: 10,
  },
});
