import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // =====================================================
  // CONTAINER
  // =====================================================

  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  // =====================================================
  // HEADER
  // =====================================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  headerIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#E8F0FE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
  },

  // =====================================================
  // CARD
  // =====================================================

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,

    elevation: 2,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 14,
  },

  // =====================================================
  // LABEL
  // =====================================================

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  // =====================================================
  // INPUT
  // =====================================================

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#1F2937",
    backgroundColor: "#FFFFFF",
  },

  // =====================================================
  // TEXT AREA
  // =====================================================

  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1F2937",
    backgroundColor: "#FFFFFF",
    textAlignVertical: "top",
  },

  // =====================================================
  // SAVE BUTTON
  // =====================================================

  saveButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#4880D8",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 6,
    paddingHorizontal: 20,

    shadowColor: "#4880D8",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    elevation: 3,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },

  // =====================================================
  // DISABLED BUTTON
  // =====================================================

  disabledButton: {
    opacity: 0.6,
  },
});

export default styles;
