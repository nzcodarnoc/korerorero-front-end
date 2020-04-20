export default (timeline, shapes) => {
  if (!shapes) return;
  let cursor = 0;
  const duration = 200;
  shapes.mouthCues.map((mouth) => {
    console.log(mouth);
    timeline.add(
      {
        targets: `#shape-${mouth.value}`,
        opacity: {
          value: "1",
          duration
        },
      },
      mouth.start * 1000
    );
    timeline.add(
      {
        targets: `#shape-${mouth.value}`,
        opacity: {
          value: "0",
          duration,
        },
      },
      mouth.end * 1000
    );
    cursor = mouth.end;
  });
  timeline.add(
    {
      targets: `#shape-A`,
      opacity: {
        value: "1",
        duration,
      },
    },
    cursor * 1000
  );
};
