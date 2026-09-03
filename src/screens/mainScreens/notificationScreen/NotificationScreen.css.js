import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // =========================================================
  // CONTAINER
  // =========================================================

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  // =========================================================
  // HEADER
  // =========================================================

  header: {
    minHeight: 65,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },

  headerUnreadBadge: {
    minWidth: 23,
    height: 23,
    borderRadius: 12,
    marginLeft: 8,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF4444",
  },

  headerUnreadBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  headerRightPlaceholder: {
    width: 42,
  },

  markAllButton: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },

  markAllText: {
    color: "#4880D8",
    fontSize: 13,
    fontWeight: "700",
  },

  markAllTextDisabled: {
    color: "#9CA3AF",
  },

  // =========================================================
  // ERROR
  // =========================================================

  errorContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  errorText: {
    flex: 1,
    marginLeft: 8,
    color: "#DC2626",
    fontSize: 13,
  },

  // =========================================================
  // LIST
  // =========================================================

  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 30,
  },

  // =========================================================
  // NOTIFICATION CARD
  // =========================================================

  notificationCard: {
    width: "100%",
    minHeight: 90,
    marginBottom: 12,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  unreadNotificationCard: {
    backgroundColor: "#F0F7FF",
    borderColor: "#D7E8FC",
  },

  // =========================================================
  // NOTIFICATION ICON
  // =========================================================

  notificationIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
  },

  unreadNotificationIconContainer: {
    backgroundColor: "#DBEAFE",
  },

  // =========================================================
  // CONTENT
  // =========================================================

  notificationContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 6,
  },

  notificationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  notificationTitle: {
    flex: 1,
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
  },

  unreadNotificationTitle: {
    color: "#111827",
    fontWeight: "700",
  },

  notificationMessage: {
    marginTop: 5,
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 19,
  },

  // =========================================================
  // UNREAD DOT
  // =========================================================

  unreadDot: {
    width: 8,
    height: 8,
    marginLeft: 7,
    borderRadius: 4,
    backgroundColor: "#4880D8",
  },

  // =========================================================
  // TIME
  // =========================================================

  notificationTimeContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  notificationTime: {
    marginLeft: 5,
    color: "#9CA3AF",
    fontSize: 11,
  },

  // =========================================================
  // LOADING
  // =========================================================

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  loadingText: {
    marginTop: 12,
    color: "#6B7280",
    fontSize: 14,
  },

  // =========================================================
  // EMPTY STATE
  // =========================================================

  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingBottom: 80,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIconContainer: {
    width: 95,
    height: 95,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
    marginBottom: 20,
  },

  emptyTitle: {
    color: "#1F2937",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
  },

  emptyText: {
    marginTop: 10,
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
});

export default styles;
