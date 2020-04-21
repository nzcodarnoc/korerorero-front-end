import React from "react"
import { MOUTH_SHAPES_PATH } from "../utils";

export default ({ children }: any) => {
  const src = `${MOUTH_SHAPES_PATH}/face.svg`;
  return (
    <div id="face">
      <div id="face-wrapper">
        <img src={src} alt="" width="100%" />
      </div>
      <div id="mouth-wrapper">{children}</div>
    </div>
  );
};
