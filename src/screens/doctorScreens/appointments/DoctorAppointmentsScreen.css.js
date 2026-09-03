import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6dbe2",
    paddingHorizontal: 20,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20,
    marginBottom: 20,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 55,
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

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#111827",
  },

  filterContainer: {
    paddingBottom: 15,
  },

  filterButton: {
    paddingHorizontal: 18,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  activeFilter: {
    backgroundColor: "#4880D8",
  },

  filterText: {
    color: "#4B5563",
    fontWeight: "600",
    fontSize: 14,
  },

  activeFilterText: {
    color: "#FFFFFF",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  patientName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  reason: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  date: {
    marginTop: 8,
    fontSize: 14,
    color: "#4880D8",
    fontWeight: "600",
  },

  time: {
    marginTop: 4,
    fontSize: 14,
    color: "#374151",
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  badgeText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
    textTransform: "capitalize",
  },

  footer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  type: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },

  error: {
    color: "#DC2626",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    marginTop: 20,
    fontSize: 17,
    color: "#9CA3AF",
    fontWeight: "600",
  },
});
