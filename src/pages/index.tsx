import React, { useEffect, ComponentClass } from "react";
import { getShapes } from "../redux/actions/response";
import { connect } from "react-redux";
import { AppState } from "../redux/reducers/state";
import Mouth from "../components/Mouth";
import Head from "next/head";
import dynamic from "next/dynamic";

interface WidgetForwardDeclaration extends ComponentClass<{
  handleNewUserMessage: (userInput: string) => void;
}> {}

const Widget = dynamic(
  () => import("react-chat-widget").then((mod) => mod.Widget),
  {
    ssr: false,
  }
) as WidgetForwardDeclaration;

function Index({ getShapes, isFetching, audio, mouthCues, error }: any) {
  useEffect(() => {
    getShapes("Please come here Watson");
  }, []);
  function didReceiveNewUserMessage(message) {
    console.log(message);
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
      {!error && !isFetching && <Mouth audio={audio} mouthCues={mouthCues} />}
      <Widget handleNewUserMessage={didReceiveNewUserMessage} />
    </>
  );
}

const mapState = (state: AppState) => ({
  isFetching: state.response.isFetching,
  error: state.response.error,
  audio: state.response.audio,
  mouthCues: state.response.mouthCues,
});

const mapActions = {
  getShapes,
};

export default connect(mapState, mapActions)(Index);
