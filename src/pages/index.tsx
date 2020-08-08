import React, { useEffect, useState } from "react";
import { getShapes } from "../redux/actions/response";
import { connect } from "react-redux";
import { AppState } from "../redux/reducers/state";
import Face from "../components/Face";
import Mouth from "../components/Mouth";
import Recognizer from "../components/Recognizer";
import Head from "next/head";
import ChatWidget from "../components/ChatWidget";
import { SHOW_CHAT_WIDGET } from "../utils";

function Index({
  getShapes,
  isFetching,
  audio,
  mouthCues,
  isListening,
  error,
}: any) {
  useEffect(() => {
    getShapes("Hello");
  }, []);
  function didReceiveNewUserMessage(message) {
    getShapes(message);
  }
  const [state, setState] = useState({
    explicitUserAction: false,
  });
  function didExplicitUserAction(e) {
    setState({
      explicitUserAction: true,
    });
  }
  return (
    <>
      <Head>
        <title>Korerorero</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </Head>
      <div className="container">
        <main>
          <Recognizer isListening={isListening} />
          {!!isFetching && (
            <div className="loading-indicator">
              <div className="loading-position">Processing...</div>
            </div>
          )}
          {!!error && (
            <>
              There was an error communicating with the orchestration service:{" "}
              <code>{error}</code>
            </>
          )}
          {!error && (!isFetching || state.explicitUserAction) && (
            <>
              <div className="with-audio-content">
                {!state.explicitUserAction && (
                  <div
                    className="explicit-user-action"
                    onClick={didExplicitUserAction}
                  >
                    <div className="play-button">▶</div>
                  </div>
                )}
                <div className="audio-content">
                  <Face>
                    <Mouth
                      audio={audio}
                      mouthCues={mouthCues}
                      explicitUserAction={state.explicitUserAction}
                    />
                  </Face>
                </div>
              </div>
              {SHOW_CHAT_WIDGET && (
                <ChatWidget handleNewUserMessage={didReceiveNewUserMessage} />
              )}
            </>
          )}
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
  isListening: state.speech.isListening,
});

const mapActions = {
  getShapes,
};

export default connect(mapState, mapActions)(Index);
