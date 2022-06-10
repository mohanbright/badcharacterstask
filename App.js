/**
 * @format
 * @flow strict-local
 */

import React from "react";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";

import NavigationContainer from "./src/navigation";

const App = (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer {...props} />
    </Provider>
  );
};
export default App;
