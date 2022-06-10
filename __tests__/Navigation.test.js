import * as React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

describe("Navigation Check", () => {
  jest.useFakeTimers();
  test("Home Screen", async () => {
    const component = <App />;
    let { findByText } = render(component);
    const headerText = await findByText("Bad Characters");
    expect(headerText).toBeTruthy();
  });
  test("Detail Screen", async () => {
    const component = <App initialRouteName={"DetailScreen"} />;
    let { findByText } = render(component);
    const nicknameText = await findByText("Nickname:");
    expect(nicknameText).toBeTruthy();
  });
});
