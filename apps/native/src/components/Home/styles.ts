import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#120302",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 4,
    paddingLeft: 4,
  },
  label: {
    color: 'white'
  },
  input: {
    backgroundColor: "#777777",
    borderRadius: 4,
    width: 240,
    color: "black",

    marginBottom: 10,
    padding: 4,
  },
  button: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 6,
  },
  buttonConnect: {
    backgroundColor: "green",
  },
  buttonDesconect: {
    backgroundColor: "red",
  },
});
