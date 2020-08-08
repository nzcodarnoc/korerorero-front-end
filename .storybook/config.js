import { setConfig } from "next/config";
import { configure } from "@storybook/react";
import "../src/styles/styles.scss";
import "react-chat-widget/lib/styles.css";
import dotenv from "dotenv"
dotenv.config()

setConfig({
  publicRuntimeConfig: {
    SELF_PATH: process.env.SELF_PATH,
    ORCHESTRATION_ENDPOINT: process.env.ORCHESTRATION_ENDPOINT,
    RECOGNIZER_HOST: process.env.RECOGNIZER_HOST,
    RECOGNIZER_PATH: process.env.RECOGNIZER_PATH,
    SHOW_CHAT_WIDGET: process.env.SHOW_CHAT_WIDGET
  },
});
configure(require.context("../stories", true, /\.stories\.tsx?$/), module);
