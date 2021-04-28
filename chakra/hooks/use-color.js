import { useTheme, useColorMode } from "@chakra-ui/react";

export function useColor() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { mode } = theme.colors;
  return {
    mode: colorMode,
    color: (colorName) => mode[colorMode][colorName],
  };
}
