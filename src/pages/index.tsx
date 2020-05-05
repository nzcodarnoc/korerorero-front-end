import React, { useEffect, ComponentClass } from "react";
import { getShapes } from "../redux/actions/response";
import { connect } from "react-redux";
import { AppState } from "../redux/reducers/state";
import Face from "../components/Face";
import Mouth from "../components/Mouth";
import Recognizer from "../components/Recognizer"
import Head from "next/head";
import dynamic from "next/dynamic";
interface WidgetForwardDeclaration
  extends ComponentClass<{
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
    getShapes("Hello");
  }, []);
  function didReceiveNewUserMessage(message) {
    getShapes(message);
  }
  return (
    <>
      <Head>
        <title>Korerorero</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <main>
          <Recognizer />
          <h1 className="h3">Welcome to Korerorero!</h1>

          {!!isFetching && (
            <div className="loading-indicator">
              <div className="loading-position">
                Processing...
              </div>
            </div>
          )}
          {!!error && (
            <>
              There was an error communicating with the orchestration service:{" "}
              <code>{error}</code>
            </>
          )}
          {!error && (
            <Face>
              <Mouth audio={audio} mouthCues={mouthCues} />
            </Face>
          )}
          <Widget handleNewUserMessage={didReceiveNewUserMessage} />
        </main>
      </div>
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
