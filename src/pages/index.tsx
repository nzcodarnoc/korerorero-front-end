import React, { useEffect } from "react";
import { firstResponse } from "../redux/actions/response";
import { connect } from "react-redux";
import { AppState } from "../redux/reducers/state";
import Mouth from "../components/Mouth";
import Head from "next/head";
import { Widget } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";
function Index({ firstResponse, isFetching, audio, shapes, error }: any) {
  useEffect(() => {
    firstResponse();
  }, []);
  function didRecieveNewUserMessage(message) {
    console.log(message)
  }
  return (
    <>
      <Head>
        <title>Korerorero</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!!isFetching && <>Loading...</>}
      {!!error && (
        <>
          There was an error communicating with the orchestration service:{" "}
          <code>{error}</code>
        </>
      )}
      {!error && !isFetching && <Mouth audio={audio} shapes={shapes} />}
      <Widget handleNewUserMessage={didRecieveNewUserMessage} />
    </>
  );
}

const mapState = (state: AppState) => ({
  isFetching: state.response.isFetching,
  error: state.response.error,
  audio: state.response.audio,
  shapes: state.response.shapes,
});

const mapActions = {
  firstResponse,
};

export default connect(mapState, mapActions)(Index);
