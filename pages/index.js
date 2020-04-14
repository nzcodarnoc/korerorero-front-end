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
        <div>
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

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
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

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Home;
