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
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20,
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
    marginTop: 18,
  },

  dateButton: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    paddingHorizontal: 18,

    height: 58,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 6,

    elevation: 4,
  },

  dateText: {
    marginLeft: 15,

    fontSize: 16,

    color: "#111827",

    fontWeight: "600",
  },

  input: {
    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    paddingHorizontal: 18,

    height: 56,

    fontSize: 16,

    color: "#111827",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 6,

    elevation: 4,
  },

  textArea: {
    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    paddingHorizontal: 18,

    paddingTop: 18,

    minHeight: 140,

    textAlignVertical: "top",

    fontSize: 16,

    color: "#111827",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 6,

    elevation: 4,
  },

  button: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#4880D8",

    borderRadius: 14,

    height: 58,

    marginTop: 35,

    marginBottom: 40,
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 17,

    fontWeight: "700",

    marginLeft: 10,
  },
});
