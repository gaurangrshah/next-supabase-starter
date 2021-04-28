import { mode } from "@chakra-ui/theme-tools";
import "focus-visible/dist/focus-visible";

export const styles = {
  global: (props) => ({
    ".js-focus-visible": {
      /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
    */
      outline: "none",
      boxShadow: "none",
    },
    "@fontFace": {
      fontFamily: "radnika_next",
      src: "url('/static/radnikanext-medium-webfont.woff2') format('woff2')",
      fontWeight: "normal",
      fontStyle: "normal",
    },
    "*": {
      border: 0,
      margin: 0,
      padding: 0,
      fontFeatureSettings: `'kern'`,
      textRendering: "optimizeLegibility",
      WebkitFontSmoothing: "antialiased",
    },
    "*, *::before, *::after": {
      borderColor: mode("gray.500", "gray.700")(props),
      boxSizing: "border-box",
      wordWrap: "break-word",
    },
    "*::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      borderRadius: "10px",
      backgroundColor: "transparent",
    },
    "*::-webkit-scrollbar": {
      width: "9px",
    },
    "*::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
      backgroundColor: "gray.700",
    },
    "html, body": {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      scrollBehavior: "smooth",
      // using % here allows users to override default size in browser settings??
      fontSize: "85.2%", // == 10px
      bg: mode("gray.400", "gray.900")(props),
    },
    body: {
      position: "relative",
      fontFamily: "body",
      color: mode("gray.600", "whiteAlpha.700")(props),
      // bg: mode("gray.400", "gray.900")(props),
      fontSize: "1.5rem",
      lineHeight: 2,
      textRendering: "optimizeLegibility",
      overflowX: "hidden",
      maxW: "full",
    },
    "*::placeholder": {
      color: mode("gray.500", "whiteAlpha.400")(props),
    },
    "input:focus": {
      border: "inherit",
    },
    "input:focus:invalid": {
      backround: "rgba(255, 224, 224, 1)",
    },
    "input:focus, input:focus:valid": {
      backround: "rgba(226, 250, 219, 1)",
    },
    "a:active, a:focus, a:visited": {
      outline: 0,
      border: "none",
      outlineStyle: "none",
      textDecoration: "none",
      boxShadow: "0 0 0 1px rgba(0, 0, 0, 0) !important",
    },
    "a:hover": {
      textDecoration: "underline",
    },
    a: {
      textDecoration: "none",
      color: mode("black", "white")(props),
    },
    button: {
      fontFamily: "body",
    },
  }),
};
