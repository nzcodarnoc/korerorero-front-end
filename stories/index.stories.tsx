import * as React from "react";
import { storiesOf } from "@storybook/react";
import Index from "../src/pages/index";

import { Provider } from "react-redux";
import store from "../src/redux/store";

storiesOf("Integration", module).add('index page with redux', () => {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
});
