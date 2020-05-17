// based on:
// https://github.com/mozilla/DeepSpeech-examples/blob/r0.7/web_microphone_websocket/src/App.js
import React, { Component } from "react";
import io from "socket.io-client";
import { RECOGNIZER_HOST, RECOGNIZER_PATH, STATIC_PATH } from "../utils";
import { connect } from "react-redux";
import { getShapes } from "../redux/actions/response";

const DOWNSAMPLING_WORKER = STATIC_PATH + 'downsampling_worker.js';

class Recognizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      recording: false,
      recordingStart: 0,
      recordingTime: 0,
      recognitionOutput: [],
    };
  }

  componentDidMount() {
    let recognitionCount = 0;

    this.socket = io.connect(RECOGNIZER_HOST, { path: RECOGNIZER_PATH });

    this.socket.on("connect", () => {
      console.log("socket connected");
      this.setState({ connected: true });
      this.startRecording();
    });

    this.socket.on("disconnect", () => {
      console.log("socket disconnected");
      this.setState({ connected: false });
      this.stopRecording();
    });

    this.socket.on("recognize", (results) => {
      console.log("recognized:", results);
      const { recognitionOutput } = this.state;
      results.id = recognitionCount++;
      this.props.getShapes(results.text);
      recognitionOutput.unshift(results);
      this.setState({ recognitionOutput });
    });
  }

  render() {
    return <></>;
  }

  createAudioProcessor(audioContext, audioSource) {
    let processor = audioContext.createScriptProcessor(4096, 1, 1);

    const sampleRate = audioSource.context.sampleRate;

    let downsampler = new Worker(DOWNSAMPLING_WORKER);
    downsampler.postMessage({ command: "init", inputSampleRate: sampleRate });
    downsampler.onmessage = (e) => {
      if (this.socket.connected) {
        this.socket.emit("stream-data", e.data.buffer);
      }
    };

    processor.onaudioprocess = (event) => {
      if (!this.props.isListening) return;
      var data = event.inputBuffer.getChannelData(0);
      downsampler.postMessage({ command: "process", inputFrame: data });
    };

    processor.shutdown = () => {
      processor.disconnect();
      this.onaudioprocess = null;
    };

    processor.connect(audioContext.destination);

    return processor;
  }

  startRecording = (e) => {
    if (!this.state.recording) {
      this.recordingInterval = setInterval(() => {
        let recordingTime = new Date().getTime() - this.state.recordingStart;
        this.setState({ recordingTime });
      }, 100);

      this.setState(
        {
          recording: true,
          recordingStart: new Date().getTime(),
          recordingTime: 0,
        },
        () => {
          this.startMicrophone();
        }
      );
    }
  };

  startMicrophone() {
    this.audioContext = new AudioContext();

    const success = (stream) => {
      console.log("started recording");
      this.mediaStream = stream;
      this.mediaStreamSource = this.audioContext.createMediaStreamSource(
        stream
      );
      this.processor = this.createAudioProcessor(
        this.audioContext,
        this.mediaStreamSource
      );
      this.mediaStreamSource.connect(this.processor);
    };

    const fail = (e) => {
      console.error("recording failure", e);
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: true,
        })
        .then(success)
        .catch(fail);
    } else {
      navigator.getUserMedia(
        {
          video: false,
          audio: true,
        },
        success,
        fail
      );
    }
  }

  stopRecording = (e) => {
    if (this.state.recording) {
      if (this.socket.connected) {
        this.socket.emit("stream-reset");
      }
      clearInterval(this.recordingInterval);
      this.setState(
        {
          recording: false,
        },
        () => {
          this.stopMicrophone();
        }
      );
    }
  };

  stopMicrophone() {
    if (this.mediaStream) {
      this.mediaStream.getTracks()[0].stop();
    }
    if (this.mediaStreamSource) {
      this.mediaStreamSource.disconnect();
    }
    if (this.processor) {
      this.processor.shutdown();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

const mapActions = {
  getShapes,
};

export default connect(null, mapActions)(Recognizer);
