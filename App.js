/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import RouterComponent from "./RouterComponent";

const initialState = {
  isLoggedIn: false
};

const storeValue = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_STATUS":
      return {
        ...state,
        isLoggedIn: action.payload.loginStatus
      };

    default:
      return state;
  }
};

const reducer = combineReducers({
  storeValue: storeValue
});

const store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}

