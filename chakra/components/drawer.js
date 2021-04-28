import { useRef } from "react";
import {
  Button,
  Drawer as ChDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
} from "@chakra-ui/react";

export function Drawer({ content = {}, isOpen, onOpen, onClose, children }) {
  if (!content) return "";
  const btnRef = useRef();
  const { header, body, footer } = content;

  return (
    <>
      <ChDrawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='lg'
      >
        <DrawerOverlay>
          <DrawerContent bg='#213D85'>
            <DrawerCloseButton />
            <DrawerHeader>
              {header && <header.Component {...header?.props} />}
            </DrawerHeader>

            <DrawerBody>
              {body && <body.Component {...body?.props}></body.Component>}
              {children}
            </DrawerBody>

            <DrawerFooter>
              {footer && <footer.Component {...footer?.props} />}
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </ChDrawer>
    </>
  );
}
