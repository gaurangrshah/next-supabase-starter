import { useCallback, useEffect, useState } from 'react';

import appConfig from '@/app.config';

export function useOptions() {
  const [options, setOptions] = useState(appConfig?.options);

  const editOptions = useCallback((options) => {
    setOptions((prevState) => Object.assign({}, prevState, options));
  }, []);

  useEffect(() => {
    if (
      options ||
      !storageOptions ||
      !Object.keys(JSON.parse(storageOptions))?.length
    ) {
      return;
    }

    setOptions(JSON.parse(storageOptions));
  }, []);

  const getOptions = useCallback((key) => {
    if (!options) return;
    if (key) return options[key];
    return options;
  }, []);

  return {
    options,
    getOptions,
    editOptions,
  };
}
