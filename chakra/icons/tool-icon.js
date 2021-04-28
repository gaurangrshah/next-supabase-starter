import { Box, Tooltip } from "@chakra-ui/react";
import { paths } from "./paths";

export const ToolIcon = ({
  icon = "add",
  color = "inherit",
  tipLabel = null,
  ...rest
}) => {
  const CustomIcon = ({ color, ...rest }) => {
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

  return tipLabel ? (
    <Tooltip label={tipLabel} aria-label={tipLabel}>
      <Box
        as='span'
        tabIndex={0}
        /* span is required by chakra as a wrapper on icons when using tooltips */
        // @link https://chakra-ui.com/docs/overlay/tooltip
      >
        <CustomIcon color={color} {...rest} />
      </Box>
    </Tooltip>
  ) : (
    <CustomIcon color={color} {...rest} />
  );
};
