import React from "react";
import { theme } from "@/chakra/index";
import { shuffle } from './array-ops';


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

export function propper(children, childProps) {
  // @SCOPE:  used to assign the same set of props to every child
  return React.Children.map(children, (child, i) => {
    const props = Object.assign({}, child.props, childProps);
    return <child.type key={i} {...props} />;
  });
}

export function combineProviders(providers) {
  return providers.reduce((Combined, Provider) => ({ children }) => (
    <Combined>
      <Provider>{children}</Provider>
    </Combined>
  ));

  /***
   * USAGE:

  const Providers2 = combineProviders(providers);

  const App = () => {
    return (
      <Providers>
        {children}
      </Providers>
    )
  }

   */
}
