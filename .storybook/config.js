import { setConfig } from "next/config";
import { configure } from "@storybook/react";
import "../src/styles/styles.scss";
import "react-chat-widget/lib/styles.css";

setConfig({
  publicRuntimeConfig: {
    THEME: "grace",
    SELF_PATH: "",
    ORCHESTRATION_ENDPOINT: "http://localhost:8000/orchestration",
    RECOGNIZER_HOST: "http://localhost:8000",
    RECOGNIZER_PATH: "/recognizer/socket.io",
  },
});
configure(require.context("../stories", true, /\.stories\.tsx?$/), module);
