import React, { createContext, useEffect, useRef, useState } from 'react';
import { ErrorTag } from '@/chakra/components/error-tag';
import { isValidJson } from '@/utils/is-valid-json';
import { useToastDispatch } from '@/chakra/contexts/toast-context';

import { useOptions } from '@/hooks/use-options';

export const parseErrorMessage = (error) => {
  // @SCOPE:  return a final error string accounting for common expected variations
  let finalError;

  if (error?.message) {
    finalError = error.message;
  }

  if (typeof error === 'string') {
    if (isValidJson(error)) {
      finalError = JSON.stringify(error);
    }

    finalError = error;
  }

  if (!finalError)
    finalError = 'Undefined error occured, please submit a ticket.';

  return finalError;
};

const ErrorStateContext = createContext();
const ErrorDispatchContext = createContext();

export function ErrorProvider({ children }) {
  const { getOptions } = useOptions();

  const errorOptions = getOptions('errors');

  const [error, setError] = useState(null);
  const [showErrors] = useState(
    errorOptions?.show && errorOptions?.config?.tags
  );
  const errorRef = useRef(null); // used to keep a reference to previous error

  const { setMsg } = useToastDispatch();

  const setErrorMsg = (errorMsg) => {
    if (!process.browser) return;
    if (!errorMsg || !showErrors) return;

    // @SCOPE:  parse error message and show toasts for validated errors
    const parsedMsg = parseErrorMessage(errorMsg);
    if (!parsedMsg) return;

    setMsg({
      description: parsedMsg,
      position: 'bottom-right',
      title: 'Error',
      status: 'error',
    });
  };

  useEffect(async () => {
    if (!error || !showErrors) return;

    setErrorMsg(error);
    errorRef.current = error;

    console.error('⛔️ error-monitor: error', error);

    // cleaup error
    setTimeout(() => {
      setError(null);
    }, 9000);
    return () => setError(null);
  }, [error]);

  return (
    <ErrorStateContext.Provider value={{ error, showErrors, errorOptions }}>
      <ErrorDispatchContext.Provider value={{ setError }}>
        {error && (
          <ErrorTag {...{ error, parseErrorMessage }} show={showErrors} />
        )}
        {children}
      </ErrorDispatchContext.Provider>
    </ErrorStateContext.Provider>
  );
}

export const useErrorState = () => {
  const context = React.useContext(ErrorStateContext);
  if (context === undefined) {
    throw new Error('useErrorState must be used within a ErrorProvider');
  }

  return context;
};

export const useErrorDispatch = () => {
  const context = React.useContext(ErrorDispatchContext);
  if (context === undefined) {
    throw new Error('useErrorState must be used within a ErrorProvider');
  }

  return context;
};
