import { ModeToggle } from "../components/mode-toggle";
import Scaffold from "../components/structure/scaffold";

import { Wave } from "@/components/backgrounds/shapes";

import { useColor } from "@/chakra/hooks/use-color";

export function DefaultLayout(props) {
  const { color } = useColor();

  return (
    <>
      <ModeToggle />
      <Scaffold {...props} />
      <Wave
        colors={[color("fieldLabel"), color("fieldLabel")]}
        position='fixed'
        bottom={0}
        left={0}
        zIndex={-1}
        transform='rotate(180deg)'
        sx={{ transformStyle: "preserve-3d" }}
      />
    </>
  );
}
