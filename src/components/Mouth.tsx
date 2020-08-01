import React, { useEffect, useState } from "react";
import anime from "animejs";
import { MOUTH_SHAPES_PATH } from "../utils";
import { Howl, Howler } from "howler";
import assembleTimeline from "./helpers/assemble-timeline";
import { connect } from "react-redux";
import { startedSpeaking, endedSpeaking } from "../redux/actions/speech";
import styles from "../../public/mouth-shapes/grace/mouth-shape-styles.module.css";

function Mouth({
  audio,
  mouthCues,
  explicitUserAction,
  startedSpeaking,
  endedSpeaking,
}) {
  useEffect(() => {
    anime.set("#shape-A", {
      opacity: "1",
    });
    if (!audio || !mouthCues) return;
    const sound = new Howl({
      src: [audio],
      format: ["wav"],
    });
    const timeline = anime.timeline({
      targets: ".mouth",
      autoplay: false,
      loop: false,
      begin: (_anim) => startedSpeaking(),
      complete: (_anim) => endedSpeaking(),
    });
    assembleTimeline(timeline, mouthCues);
    if (explicitUserAction) {
      anime.set("#shape-A", {
        opacity: "0",
      });
      timeline.play();
      sound.play();
    }
  });
  return (
    <div className={styles.mouthWrapper}>
      <div className="mouth-container">
        {["A", "B", "C", "D", "E", "F", "G", "H", "X"].map((shape) => {
          const src = `${MOUTH_SHAPES_PATH}/mouth-${shape}.svg`;
          const id = `shape-${shape}`;
          return (
            <div key={id} className="mouth" id={id}>
              <img src={src} alt="" width="100%" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapActions = {
  startedSpeaking,
  endedSpeaking,
};

export default connect(null, mapActions)(Mouth);
