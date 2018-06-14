import * as React from "react";
import * as PropTypes from "prop-types";
import { render, Artboard, Text, View } from "@mathieudutour/react-sketchapp";
import { renderToJSON } from "@mathieudutour/react-sketchapp/lib/render";
import {
  makeSymbol,
  getSymbolMasterByName
} from "@mathieudutour/react-sketchapp/lib/symbol";
import { createSymbol } from "./symbol";

// const TestComponent = () => (
//   <View style={{ width: 100, height: 100, backgroundColor: "teal" }} />
// );

// const symbolName = "TestComponent";

// const master = createSymbol(TestComponent, symbolName);

// export default () => master;

const Document = () => (
  <Artboard
    name="Component"
    style={{
      flexDirection: "column",
      width: (96 + 8) * 4
    }}
  >
    <Text>Hello world</Text>
  </Artboard>
);

export default () => renderToJSON(<Document />);
