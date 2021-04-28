import { Box } from "@chakra-ui/react";

export function Wave({ color = "inherit", colors = [], ...rest }) {
  return (
    <Box
      as='svg'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1080 470'
      {...rest}
    >
      <path
        fill={colors?.length ? colors[0] : color} //
        d='M0 329c385.7 0 165.3-219 551-219V0H0z'
      />
      <path
        fill={colors?.length ? colors[1] : color} //
        d='M550 110c371 0 159-56 530-56V0H550z'
      />
    </Box>
  );
}
