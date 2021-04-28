import React, { useRef, useState, createContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { useOptions } from '@/hooks/use-options';
import { jsonCompare } from '@/utils/is-valid-json';

const ToastStateContext = createContext();
const ToastDispatchContext = createContext();

const commonOptions = {
  duration: 6000,
  isClosable: true,
};

const validators = ['null', null, 'undefined', undefined, '', ' '];

const validateToastDescription = (description, ref) => {
  // @SCOPE: avoid passing null values in toast messages
  const isNotValid = validators.find(
    // NOTE: find will return the first matching element, otherwise will return undefined
    // if any validator matches, then that validator is returned
    (validator) => description === validator
  );

  // if is not valid is undefined then our description contains a value
  return isNotValid === undefined ? true : false;
};

export function ToastProvider({ config, children }) {
  const { getOptions } = useOptions();
  const toastOptions = getOptions('toasts');

  const msgRef = useRef(null);
  const [msg, setMsg] = useState(null);
  const [showToast] = useState(toastOptions?.show);
  const toast = useToast();

  React.useEffect(() => {
    if (!msg) return;
    // cleanup toasts
    setTimeout(() => {
      msg && setMsg(null);
    }, 9000);
    return () => setMsg(null);
  }, [msg]);

  React.useEffect(() => {
    // @SCOPE:  show valid toasts automatically on msg state change
    let outputMsg = Array.isArray(msg) ? msg[0] : msg;

    if (
      !process.browser ||
      !showToast ||
      !validateToastDescription(outputMsg?.description, msgRef) ||
      jsonCompare(msg?.description, msgRef?.current?.description) // used to avoid dupes
    ) {
      return;
    }
    // display validated toast:
    if (outputMsg) {
      toast({ position: 'top-right', ...outputMsg, ...commonOptions });
      msgRef.current = msg; // set reference to make sure we're not duplicating toasts
    }
  }, [msg]);

  return (
    <ToastStateContext.Provider value={{ msg, toast, showToast }}>
      <ToastDispatchContext.Provider value={{ setMsg }}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
}

export const useToastState = () => {
  const context = React.useContext(ToastStateContext);
  if (context === undefined) {
    throw new Error('useToastState must be used within a ToastProvider');
  }

  return context;
};
export const useToastDispatch = () => {
  const context = React.useContext(ToastDispatchContext);
  if (context === undefined) {
    throw new Error('useToastState must be used within a ToastProvider');
  }
  return context;
};

/**
 * * Usage:
* * Must wrap top level component with provider:
const { setMsg } = useToastDispatch()
<ToastProvider></ToastProvider>
setMsg({
  title: 'Welcome.',
  description: 'This is a test and can be triggered from anywhere',
  status: 'success',
  duration: 9000,
  isClosable: true,
})
setErrorMsg(error)
 */
