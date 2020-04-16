import React, { useEffect } from "react";
import { firstResponse } from "../redux/actions/response";
import { connect } from "react-redux";
import { AppState } from "../redux/reducers/state";
import Mouth from "../components/Mouth"

function Index({ firstResponse, isFetching, ...rest }: any) {
  useEffect(() => {
    firstResponse();
  }, []);
  return (
    <>
      {isFetching ? (
        <>Loading...</>
      ) : (
        <>
          <div>
            The API needs it's CORS policy so it has returned the following
            error: <code>{JSON.stringify(rest)}</code> (or, maybe the service isn't running)
          </div>
          <div>
            This is totally normal and what is expected. There needs to be a PR
            on the Orchestration Server to relax it's CORS rules.
          </div>
        </>
        )}
      <Mouth />
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
