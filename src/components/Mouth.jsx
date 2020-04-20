import React, { useEffect } from "react";
import anime from "animejs";
import getConfig from "next/config";
import { Howl, Howler } from "howler";
const { publicRuntimeConfig } = getConfig();
const MOUTH_SHAPES = `${publicRuntimeConfig.staticFolder}/mouth-shapes`;
import assembleTimeline from "./helpers/assemble-timeline";

function Mouth({ audio, shapes }) {
  useEffect(() => {
    anime.set('#shape-A', {
      opacity: "1"
    });
    if (!audio || !shapes) return;
    const sound = new Howl({
      src: [audio],
      format: ["wav"],
    });
    const timeline = anime.timeline({
      targets: ".mouth",
      autoplay: false,
      loop: false,
    });
    assembleTimeline(timeline, shapes);
    anime.set('#shape-A', {
      opacity: "0"
    });
    sound.play();
    timeline.play();
  });
  return (
    <div className="container">
      <main>
        <h1 className="title">Welcome to Korerorero!</h1>
        <div className="mouth-container">
          {["A", "B", "C", "D", "E", "F", "G", "H", "X"].map((shape) => {
            const src = `${MOUTH_SHAPES}/mouth-${shape}.svg`;
            const id = `shape-${shape}`;
            return (
              <div key={id} className="mouth" id={id}>
                <img src={src} alt="" width="100%" />
              </div>
            );
          })}
        </div>
      </main>
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
    </div>
  );
}

export default Mouth;
