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

  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 20,
    marginBottom: 18,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 12,

    paddingHorizontal: 15,

    marginBottom: 20,

    height: 52,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,

    shadowRadius: 5,

    elevation: 3,
  },

  searchInput: {
    flex: 1,

    marginLeft: 10,

    fontSize: 16,

    color: "#111827",
  },

  card: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 15,

    padding: 15,

    marginBottom: 15,

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
    width: 70,

    height: 70,

    borderRadius: 35,

    backgroundColor: "#E5E7EB",
  },

  info: {
    flex: 1,

    marginLeft: 15,
  },

  name: {
    fontSize: 18,

    fontWeight: "700",

    color: "#111827",
  },

  specialization: {
    color: "#4880D8",

    fontWeight: "600",

    marginTop: 3,

    fontSize: 15,
  },

  hospital: {
    marginTop: 5,

    color: "#6B7280",

    fontSize: 14,
  },

  date: {
    marginTop: 6,

    color: "#374151",

    fontSize: 14,
  },

  time: {
    marginTop: 4,

    color: "#374151",

    fontSize: 14,
  },

  type: {
    marginTop: 4,

    color: "#2563EB",

    fontWeight: "600",

    fontSize: 14,
  },

  statusBadge: {
    alignSelf: "flex-start",

    marginTop: 10,

    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 20,
  },

  statusText: {
    color: "#FFFFFF",

    fontWeight: "700",

    textTransform: "capitalize",

    fontSize: 12,
  },

  emptyContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    marginTop: 80,
  },

  emptyText: {
    marginTop: 20,

    fontSize: 17,

    color: "#9CA3AF",

    fontWeight: "600",

    textAlign: "center",
  },

  error: {
    color: "#DC2626",

    marginBottom: 15,

    textAlign: "center",

    fontWeight: "600",
  },
});
