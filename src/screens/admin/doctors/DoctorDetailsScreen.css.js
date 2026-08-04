import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: "center",
    marginTop: 25,
    backgroundColor: "#EAEAEA",
  },

  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginTop: 15,
  },

  specialization: {
    fontSize: 17,
    color: "#4880D8",
    textAlign: "center",
    marginTop: 5,
    fontWeight: "600",
  },

  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
  },

  rating: {
    marginLeft: 8,
    fontSize: 15,
    color: "#666",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginBottom: 18,
    padding: 18,
    borderRadius: 15,

    elevation: 3,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 4,

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 15,
  },

  label: {
    fontSize: 13,
    color: "#777",
    marginTop: 12,
  },

  value: {
    fontSize: 16,
    color: "#333",
    marginTop: 3,
    fontWeight: "500",
  },

  biography: {
    fontSize: 15,
    color: "#555",
    lineHeight: 24,
  },

  fee: {
    fontSize: 22,
    color: "#009688",
    fontWeight: "700",
    marginTop: 5,
  },

  button: {
    backgroundColor: "#4880D8",
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",

    elevation: 4,

    shadowColor: "#4880D8",

    shadowOpacity: 0.25,

    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
