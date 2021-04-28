import { Box, Portal, Slide, Text } from "@chakra-ui/react";
import { useScaffold } from "@/chakra/contexts/scaffold-context";
import { useColor } from "@/chakra/hooks/use-color";

// @SCOPE:  used to handle errors and set toast messages and render error tag in UI accordingly

export const ErrorTag = ({
  error,
  parseErrorMessage,
  show = false,
  children,
  ...rest
}) => {
  const {
    config: { options },
  } = useScaffold();

  const { color } = useColor();

  // if errors.show is true only then use the global config
  const globalConfig = options?.errors?.show ? options?.errors?.config : {};

  // allow local props to override global config and a per use basis
  const { tags } = globalConfig; // config: { tags: bool }

  let isError;
  if (error) {
    isError = Object.entries(error).length > 0 || childrenCount > 0;
  }

  return (
    <Portal>
      <Slide
        direction='top'
        in={tags && show && isError}
        style={{ zIndex: 10 }}
      >
        <Box
          // @SCOPE:  only display tags if show and tags are valid
          // display={error && tags ? "block" : "none"}
          w='full'
          bg={color("danger")}
          p={2}
          boxShadow='default'
          {...rest}
        >
          {error ? parseErrorMessage(error) : children}
        </Box>
      </Slide>
    </Portal>
  );
};
