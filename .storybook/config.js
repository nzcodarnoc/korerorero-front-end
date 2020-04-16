import { setConfig } from "next/config";
import { configure } from "@storybook/react";

setConfig({
  publicRuntimeConfig: {
    staticFolder: "",
  },
});
configure(require.context("../stories", true, /\.stories\.tsx?$/), module);
