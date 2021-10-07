import React from "react";
import { Frame, Loading } from "@shopify/polaris";

export default class App extends React.Component {
  render() {
    return (
      <div style={{ height: "100px" }}>
        <Frame>
          <Loading />
        </Frame>
      </div>
    );
  }
}
