import { Box } from "@chakra-ui/react";
import { paths } from "./paths";

export const CustomIcon = ({ icon = "add", color = "inherit", ...rest }) => {
  const Icon = ({ color, ...rest }) => {
    return (
      <Box
        as='svg'
        viewBox={paths[icon].viewBox}
        width='1.25em'
        height='1.25em'
        fill={color}
        {...rest}
      >
        {/*
        NOTE:  svgs might have multiple paths in order to compose the icon, we'll render each one if we encounter an array
        */}
        {Array.isArray(paths[icon].d) ? (
          paths[icon].d.map((d, i) => <path key={i} d={d} />)
        ) : (
          <path d={paths[icon].d} />
        )}
      </Box>
    );
  };

  return (
    <Box
      as='span'
      tabIndex={0} // accessibility requirement
      /* span is required by chakra as a wrapper on icons when using tooltips */
      // @link https://chakra-ui.com/docs/overlay/tooltip
    >
      <Icon color={color} {...rest} />
    </Box>
  );
};
