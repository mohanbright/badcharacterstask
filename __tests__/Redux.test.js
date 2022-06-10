import * as React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import App from "../App";
import { store } from "../src/redux/store";

describe("Redux Check", () => {
  jest.useFakeTimers();
  test("Redux Setup", async () => {
    const component = <App />;
    let { findByText } = render(component);
    const headerText = await findByText("Bad Characters");
    expect(headerText).toBeTruthy();
    const reduxStore = store.getState().deviceDimensionReducer;
    expect(reduxStore).not.toBeNull();
  });
  test("Redux Update", async () => {
    let layout = { width: 390, height: 800 };
    const component = <App initialRouteName={"DetailScreen"} />;
    let { findByText, getByTestId } = render(component);
    const nicknameText = await findByText("Nickname:");
    expect(nicknameText).toBeTruthy();
    const layoutView = getByTestId("layoutView");
    fireEvent(layoutView, "layout", {
      nativeEvent: { layout },
    });
  });
});
