import { extendTheme } from "@chakra-ui/react";
import { styles } from "./global-styles";

import { light, dark } from "./color-modes";
import { customColors } from "./custom-colors";
import { fonts } from "./fonts";

const colors = {
  mode: {
    light,
    dark,
  },
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  ...customColors,
};

const shadows = {
  bs: "0 12px 24px 0 rgba(0,0,0,0.09)",
};

export const theme = extendTheme({
  colors,
  styles,
  fonts,
  shadows,
});
