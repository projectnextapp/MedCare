import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "rgba(0,0,0,0.45)",
  },

  container: {
    width: "90%",

    backgroundColor: "#fff",

    borderRadius: 16,

    padding: 20,
  },

  title: {
    fontSize: 22,

    fontWeight: "700",

    marginBottom: 20,

    color: "#111827",

    textAlign: "center",
  },

  option: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    padding: 15,

    borderWidth: 1,

    borderColor: "#E5E7EB",

    borderRadius: 10,

    marginBottom: 10,
  },

  selectedOption: {
    backgroundColor: "#EFF6FF",

    borderColor: "#2563EB",
  },

  optionText: {
    fontSize: 16,

    color: "#374151",

    textTransform: "capitalize",
  },

  selectedText: {
    color: "#2563EB",

    fontWeight: "700",
  },

  saveButton: {
    backgroundColor: "#2563EB",

    height: 50,

    borderRadius: 10,

    justifyContent: "center",

    alignItems: "center",

    marginTop: 15,
  },

  saveText: {
    color: "#fff",

    fontSize: 17,

    fontWeight: "700",
  },

  cancel: {
    marginTop: 18,

    textAlign: "center",

    color: "#EF4444",

    fontWeight: "700",

    fontSize: 16,
  },
});
