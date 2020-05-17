// It seems that `dynamic` is caught up in a couple of Typescript bugs
// Seeing as this is a framework method, I'm putting it in a JS file
// https://github.com/zeit/next.js/issues/4515
// https://github.com/microsoft/TypeScript/issues/30712

import React from "react";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("react-chat-widget").then((mod) => mod.Widget), {
  loading: () => <>Loading&nbsp;&hellip;</>,
  ssr: false,
});


export default ChatWidget
