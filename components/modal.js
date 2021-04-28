import React from "react";
import {
  Button,
  Modal as Mdl,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export const CHModal = ({
  title = "",
  children,
  footer,
  isOpen,
  onOpen,
  onClose,
  hasSubmit = false,
  allowClose = true,
  handler,
  ...rest
}) => {
  const handleHandler = async (e) => {
    await handler.action(e);
    onClose();
  };

  return (
    <>
      <Mdl
        isOpen={isOpen}
        onClose={onClose}
        onEsc={onClose}
        border='2px solid blue'
        motionPreset='slideInBottom'
        blockScrollOnMount={false}
        size='2xl'
        isCentered={true}
        {...rest}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform='capitalize'>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            {footer}

            {allowClose && !hasSubmit ? (
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            ) : (
              handler?.action && (
                <Button colorScheme='green' mr={3} onClick={handleHandler}>
                  {handler.label}
                </Button>
              )
            )}
          </ModalFooter>
        </ModalContent>
      </Mdl>
    </>
  );
};

/*
 USAGE:

      <CHModal
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      hasSubmit={true}
      title={
        <Heading
          as='h1'
          fontSize='5xl'
          textAlign='center'
          color='inherit'
          pt={12}
        >
          Welcome Back!
        </Heading>
      }
    />

*/
