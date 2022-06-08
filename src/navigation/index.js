import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Dimensions,
  Platform,
} from "react-native";
import colors from "../constants/colors";
import { connect } from "react-redux";
import HomeScreen from "../screens/Home";
import DetailScreen from "../screens/Detail";
import {
  ChangeDimension,
  ChangeOrientation,
} from "../redux/actions/dimensionActions";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer as Container } from "@react-navigation/native";

let timer;
let addEventListener;

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("window").height;
const differnce = screenHeight - windowHeight;

const Stack = createNativeStackNavigator();

function NavigationContainer({ dimension, changeOrientation, ...props }) {
  const [RealHeight, setRealHeight] = useState(
    Platform.OS === "ios"
      ? windowHeight
      : differnce > 1
      ? windowHeight
      : windowHeight - StatusBar.currentHeight
  );
  useEffect(() => {
    if (addEventListener) addEventListener?.remove();
    addEventListener = Dimensions.addEventListener("change", ({ screen }) => {
      if (screen.height > screen.width) {
        setRealHeight(
          Platform.OS === "ios"
            ? windowHeight
            : differnce > 1
            ? windowHeight
            : windowHeight - StatusBar.currentHeight
        );
      } else {
        setRealHeight(screenWidth);
      }
    });
    return () => addEventListener.remove();
  }, []);
  const onLayout = ({ nativeEvent: { layout } }) => {
    if (timer) clearTimeout(timer);
    if (layout.y > 0)
      setTimeout(() => {
        timer = props?.changeDimension(layout);
      }, 2000);
  };
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: RealHeight,
        backgroundColor: colors.white,
      }}
    >
      <View
        onLayout={onLayout}
        style={{
          flex: 1,
        }}
      >
        <StatusBar backgroundColor={colors.white} />
        <Container>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="HomeScreen"
          >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} />
          </Stack.Navigator>
        </Container>
      </View>
    </SafeAreaView>
  );
}
const mapStatetoProps = (state) => ({
  dimension: state.deviceDimensionReducer,
});
const mapDispatchtoProps = (dispatch) => ({
  changeDimension: (layout) => dispatch(ChangeDimension(layout)),
  changeOrientation: () => dispatch(ChangeOrientation()),
});
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(NavigationContainer);
