import React, { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

export default function Alert({
  open = false,
  header,
  children,
  handleSubmit = {
    label: "",
    action() {
      console.log("Alert Submit");
    },
    cancel() {
      console.log("action cancelled");
    },
  },
}) {
  const [isOpen, setIsOpen] = useState(open);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const handleCancel = () => {
    console.log("handling cancel in Alert Dialog");
    handleSubmit?.cancel && handleSubmit?.cancel();
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          {header && (
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {header}
            </AlertDialogHeader>
          )}

          <AlertDialogBody>{children}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleCancel}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={handleSubmit.action} ml={3}>
              {handleSubmit.btnLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
