import React from "react";
import { theme } from "@/chakra/index";

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function borders(children, color = "red") {
  let colors = Object.keys(theme.colors[color]);
  colors = shuffle(colors);
  return React.Children.map(children, (child, i) => {
    const borderProps = {
      style: { border: `1px solid ${theme.colors[color][colors[i]]}` },
      // border: `1px solid ${theme.colors[color][colors[i]]}`,
    };
    const props = Object.assign({}, child.props, borderProps);
    return <child.type key={i} {...props} />;
  });
}
