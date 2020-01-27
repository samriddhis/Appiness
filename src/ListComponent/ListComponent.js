import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Modal,
  TouchableOpacity
} from "react-native";

import data from "../../Data.json";
const { height, width } = Dimensions.get("window");
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import HeaderComponent from "./HeaderComponent.js";

class ListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listData: data, listScrollHeight: 0, showLoadMask: false };
  }

  _renderItem = ({ item, index }) => (
    <View style={styles.listViewStyle}>
      <View style={styles.idOuterViewStyle}>
        <View style={styles.idInnerViewStyle}>
          <Text style={styles.idTxtStyle}>{item.id}</Text>
        </View>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={styles.itemTextStyle}>Name : {item.name}</Text>
        <Text style={styles.itemTextStyle}>Age : {item.age}</Text>
        <Text style={styles.itemTextStyle}>Gender : {item.gender}</Text>
        <Text style={styles.itemTextStyle}>Email : {item.email}</Text>
        <Text style={styles.itemTextStyle}>Phone no : {item.phoneNo}</Text>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.props.loginStatus ? (
          <View>
            <HeaderComponent />
            {this.state.showLoadMask ? (
              <Modal
                transparent={true}
                animationType={"none"}
                visible={this.state.showLoadMask}
              >
                <View style={styles.modalBackground}>
                  <View style={styles.activityIndicatorWrapper}>
                    <Text style={styles.loadingTxtStyle}>Loading.....</Text>
                    <ActivityIndicator
                      animating={this.state.showLoadMask}
                      color="#00b5ec"
                    />
                  </View>
                </View>
              </Modal>
            ) : (
              <View />
            )}
            <FlatList
              style={styles.listStyle}
              ref={ref => (this.listRef = ref)}
              data={this.state.listData}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
              enableEmptySections={true}
              onScroll={event =>
                this.setState({
                  listScrollHeight: event.nativeEvent.contentOffset.y
                })
              }
              stickyHeaderIndices={[0]}
              ListHeaderComponent={() => {
                if (this.state.listScrollHeight > height) {
                  return (
                    <View
                      style={{
                        width: width,
                        height: height / 15,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          this.listRef.scrollToIndex({
                            animated: true,
                            index: 0
                          })
                        }
                        style={styles.topButtonStyle}
                      >
                        <Text
                          style={{
                            fontSize: height / 55,
                            color: "#008eec"
                          }}
                        >
                          {`Scroll to top`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                } else return null;
              }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB"
  },
  separator: {
    width: width,
    height: 12,
    backgroundColor: "#ececec"
  },
  listViewStyle: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 10
  },
  itemTextStyle: {
    fontSize: 14,
    color:"gray"
  },
  topButtonStyle: {
    width: width / 3,
    height: height / 20,
    borderRadius: width / 30,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  listStyle: {
    padding: 8
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040"
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  loadingTxtStyle: {
    color: "gray"
  },
  detailsStyle: {
    flex: 0.8,
    flexDirection: "column",
    padding: 10
  },
  idOuterViewStyle: {
    flex: 0.2,
    justifyContent:"center",
    alignItems:"center"
  },
  idInnerViewStyle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#008eed",
    justifyContent:"center",
    alignItems:"center"
  },
  idTxtStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color:"white"
  }
});

function mapStateToProps(state) {
  return {
    loginStatus: state.storeValue.isLoggedIn
  };
}

export default connect(mapStateToProps)(ListComponent);
