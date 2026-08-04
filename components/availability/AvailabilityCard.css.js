import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    marginBottom: 18,
    borderRadius: 15,
    padding: 18,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 15,
  },

  day: {
    fontSize: 18,

    fontWeight: "700",

    color: "#222",
  },

  timeButton: {
    backgroundColor: "#F4F6F8",

    padding: 15,

    borderRadius: 12,

    marginBottom: 12,
  },

  label: {
    color: "#666",

    marginBottom: 5,

    fontSize: 14,
  },

  time: {
    fontSize: 16,

    fontWeight: "600",

    color: "#4880D8",
  },
});
