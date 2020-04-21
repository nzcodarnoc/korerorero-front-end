import React, { useEffect } from "react";
import anime from "animejs";
import { MOUTH_SHAPES_PATH } from "../utils";
import { Howl, Howler } from "howler";
import assembleTimeline from "./helpers/assemble-timeline";

function Mouth({ audio, mouthCues }) {
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
    });
    assembleTimeline(timeline, mouthCues);
    anime.set("#shape-A", {
      opacity: "0",
    });
    sound.play();
    timeline.play();
  });
  return (
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
  );
}

export default Mouth;
