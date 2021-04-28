import { Box, Flex, Spinner as ChSpinner } from "@chakra-ui/react";

export function Spinner() {
  return (
    <Flex display='flex' minH='100vh'>
      <ChSpinner m='auto' zIndex='popover' />
    </Flex>
  );
}
