import { setConfig } from "next/config";
import { configure } from "@storybook/react";
setConfig({
  publicRuntimeConfig: {
    staticFolder: "",
    ORCHESTRATION_ENDPOINT: "http://localhost:8000/orchestration"
  },
});
configure(require.context("../stories", true, /\.stories\.tsx?$/), module);
