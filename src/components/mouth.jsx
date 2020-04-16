import React, { useEffect } from "react";
import anime from "animejs";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const MOUTH_SHAPES = `${publicRuntimeConfig.staticFolder}/mouth-shapes`;

const Home = () => {
  useEffect(() => {
    const timeline = anime.timeline({
      targets: ".mouth",
      autoplay: true,
      loop: false, // it can't loop because we are using absolute time offsets
      complete: (x) => doRestart(),
    });

    function doRestart() {
      console.log("doing restart");
      timeline.restart();
    }
    let absTime = 0;
    ["A", "B", "C", "D", "E", "F", "G", "H", "X"].map((shape) => {
      timeline.add(
        {
          targets: `#shape-${shape}`,
          opacity: "1",
        },
        absTime
      );
      absTime += 500;
      timeline.add(
        {
          targets: `#shape-${shape}`,
          opacity: "0",
        },
        absTime
      );
    });
  }, []);
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
                <img src={src} alt="" width="100%" /> {shape}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
