/**
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import colors from './src/constants/colors';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {connect, Provider} from 'react-redux';
import HomeScreen from './src/screens/Home';
import DetailScreen from './src/screens/Detail';
import {
  ChangeDimension,
  ChangeOrientation,
} from './src/redux/actions/dimensionActions';
import {NavigationContainer as Container} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

let timer;
let addEventListener;

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('window').height;
const differnce = screenHeight - windowHeight;

const Stack = createNativeStackNavigator();
const navigationContainer = ({dimension, changeOrientation, ...props}) => {
  const [RealHeight, setRealHeight] = useState(
    Platform.OS === 'ios'
      ? windowHeight
      : differnce > 1
      ? windowHeight
      : windowHeight - StatusBar.currentHeight,
  );
  useEffect(() => {
    if (addEventListener) addEventListener?.remove();
    addEventListener = Dimensions.addEventListener('change', ({screen}) => {
      if (screen.height > screen.width) {
        setRealHeight(
          Platform.OS === 'ios'
            ? windowHeight
            : differnce > 1
            ? windowHeight
            : windowHeight - StatusBar.currentHeight,
        );
      } else {
        setRealHeight(screenWidth);
      }
    });
    return () => addEventListener.remove();
  }, []);
  const onLayout = ({nativeEvent: {layout}}) => {
    if (timer) clearTimeout(timer);
    if (layout.y > 0)
      setTimeout(() => {
        timer = props?.changeDimension(layout);
      }, 2000);
  };
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: RealHeight,
        backgroundColor: colors.white,
      }}>
      <View
        onLayout={onLayout}
        style={{
          flex: 1,
        }}>
        <StatusBar backgroundColor={colors.white} />
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  );
};
const mapStatetoProps = state => ({
  dimension: state.deviceDimensionReducer,
});
const mapDispatchtoProps = dispatch => ({
  changeDimension: layout => dispatch(ChangeDimension(layout)),
  changeOrientation: () => dispatch(ChangeOrientation()),
});
const NavigationContainer = connect(
  mapStatetoProps,
  mapDispatchtoProps,
)(navigationContainer);

const App = props => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Container>
          <NavigationContainer />
        </Container>
      </PersistGate>
    </Provider>
  );
};
export default App;
