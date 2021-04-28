import React, { useState, createContext } from "react";
import { useDisclosure } from "@chakra-ui/react";

const ModalStateContext = createContext();
const ModalDispatchContext = createContext();

export function ModalProvider({ children }) {
  const [components, setComponents] = useState(null);

  return (
    <ModalStateContext.Provider value={{ components }}>
      <ModalDispatchContext.Provider value={{ setComponents }}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

export const useModalState = () => {
  const context = React.useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error("useModalState must be used within a ModalProvider");
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  return { context, isOpen, onOpen, onClose };
};

export const useModalDispatch = () => {
  const context = React.useContext(ModalDispatchContext);
  if (context === undefined) {
    throw new Error("useModalState must be used within a ModalProvider");
  }

  return context;
};
