import * as React from "react";
import * as PropTypes from "prop-types";
import {
  render,
  Artboard,
  Text,
  View,
  TextStyles
} from "@mathieudutour/react-sketchapp";

// const textStylesConfig = Object.keys(textStyles).reduce(
//   (acc, key) => {
//     acc.idMap[key] = generateID();
//     return acc;
//   },
//   { idMap: {} }
// );

// console.log("creating text styles");

// TextStyles.create(textStylesConfig, textStyles);

import { renderToJSON } from "@mathieudutour/react-sketchapp/lib/render";
import {
  generateID
} from "@mathieudutour/react-sketchapp/lib/jsonUtils/models";
import {
  makeSymbol,
  getSymbolMasterByName
} from "@mathieudutour/react-sketchapp/lib/symbol";
import { createSymbol } from "./symbol";

const components = [
  {
    name: "hello world",
    Component: () => <Text>Hello world</Text>
  }
  // {
  //   name: "Hello Text Style",
  //   Component: () => (
  //     <Text style={TextStyles.get("test")}>Hello Text Style</Text>
  //   )
  // }
];

const symbols = components.map(({ name, Component }) => {
  const Wrapped = () => (
    <View style={{ width: 375 }}>
      <Component />
    </View>
  );

  return createSymbol(Wrapped, name);
});

const arrangedSymbols = symbols.reduce(
  (acc, symbol, i) => {
    const { result, offset } = acc;

    symbol.frame.y = offset;
    result.push(symbol);

    return {
      result,
      offset: offset + symbol.frame.height + 48
    };
  },
  {
    result: [],
    offset: 0
  }
);

export default () => ({
  textStyles: TextStyles.toJSON(),
  layers: arrangedSymbols.result
});

// // const { name, Component } = components[0];
// // const master = createSymbol(Component, name);
// // export default () => [master];

// const TestComponent = () => (
//   <View style={{ width: 100, height: 100, backgroundColor: "teal" }} />
// );
// const master = createSymbol(TestComponent, "TestComponent");
// export default () => [master];

// const TestComponent = () => (
//   <View style={{ width: 100, height: 100, backgroundColor: "teal" }} />
// );

// const Document = () => (
//   <Artboard
//     name="Component"
//     style={{
//       flexDirection: "column",
//       width: (96 + 8) * 4
//     }}
//   >
//     <Text>Hello world</Text>
//   </Artboard>
// );

// export default () => [renderToJSON(<Document />)];
