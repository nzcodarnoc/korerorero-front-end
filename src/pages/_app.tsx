import App from "next/app";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import React from "react";
import withRedux from "next-redux-wrapper";
import store from "../redux/store";
import "../styles/styles.scss"
import "react-chat-widget/lib/styles.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
