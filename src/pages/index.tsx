import React, { useEffect } from "react";
import { firstResponse } from "../redux/actions/response";
import { connect } from "react-redux";
import { AppState } from "../redux/reducers/state";
import Mouth from "../components/Mouth";
import Head from "next/head";

function Index({ firstResponse, isFetching, error }: any) {
  useEffect(() => {
    firstResponse();
  }, []);
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
      {!error && !isFetching && <Mouth />}
      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }
        .mouth-container {
          margin-left: -100vw;
        }
        .mouth {
          position: absolute;
          opacity: 0;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
      `}</style>
    </>
  );
}

const mapState = (state: AppState) => ({
  isFetching: state.response.isFetching,
  error: state.response.error,
});

const mapActions = {
  firstResponse,
};

export default connect(mapState, mapActions)(Index);
