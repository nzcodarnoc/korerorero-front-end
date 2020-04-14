import { useEffect } from "react";
import Head from "next/head";
import anime from "animejs";

const MOUTH_SHAPES = "/mouth-shapes"

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
      absTime += 500
      timeline.add(
        {
          targets: `#shape-${shape}`,
          opacity: "0",
        },
        absTime
      ); 
    })

  }, []);
  return (
    <div className="container">
      <Head>
        <title>Korerorero</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Welcome to Korerorero!</h1>
        <div className="mouth-container">
          {["A", "B", "C", "D", "E", "F", "G", "H", "X"].map((shape) => {
            const src = `${MOUTH_SHAPES}/mouth-${shape}.svg`;
            const id = `shape-${shape}`;
            return (
              <div key={id} className="mouth" id={id}>
                <img src={src} alt="" /> {shape}
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
          margin-left: -100vw
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
};

export default Home;
