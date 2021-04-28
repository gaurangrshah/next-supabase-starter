import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/supabase-context";
import { CHModal } from "../modal";
import { useDisclosure } from "@chakra-ui/react";

export function Protected({ user, children }) {
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!process.browser) return null;

  const router = useRouter();
  const { session } = useUser();

  useEffect(() => session && setShow(true), [session]);
  useEffect(() => user && setShow(true), [user]);

  if (!session || !user)
    return (
      <CHModal
        {...{
          isOpen,
          onOpen,
          closeOnOverlayClick: false,
          closeOnEsc: false,
          onClose: () => null,
        }}
        allowClose
        blockScrollOnMount
      >
        Testing user or session not found
      </CHModal>
    );

  return show && children;
}

export function useProtection() {
  return Protected;
}

/**
 * USAGE: used to wrap any component to limit access for children to authenticated users
 * will only render children if there is a valid client-side session
 */
