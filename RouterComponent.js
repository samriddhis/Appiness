import { createStackNavigator } from "react-navigation";
import LoginComponent from "./src/LoginComponent/LoginComponent";
import ListComponent from "./src/ListComponent/ListComponent";

export default (RouterComponent = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginComponent
    },
    ListScreen: {
      screen: ListComponent
    }
  },
  {
    headerMode: "none"
  }
));
