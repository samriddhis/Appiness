import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Icon } from "react-native-elements";

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={Styles.OuterContainer}>
        <View style={Styles.TitleViewStyle}>
          <Text style={Styles.TitleStyle}>DashBoard</Text>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  OuterContainer: {
    height: 50,
    width: width,
    backgroundColor: "#0966aa",
    flexDirection: "row",
    padding: 10,
    elevation: 10
  },
  TitleViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  TitleStyle: {
    fontSize: 22,
    color: "#fff"
  }
});
