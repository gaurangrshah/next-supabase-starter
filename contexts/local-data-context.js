import {
  useCallback,
  useContext,
  createContext,
  useEffect,
  useState,
} from 'react';
import { options } from '@/app.config';
const LocalDataStateContext = createContext();
const LocalDataDispatchContext = createContext();

const key = 'options';

export function LocalDataProvider({ children }) {
  const [localData, setLocalStorage] = useState(options);
  const [initialized, setInitialized] = useState({});

  useEffect(() => {
    const localDb = window.localStorage.getItem(key);
    const obj = localDb ? JSON.parse(localDb) : null;

    if (obj && Object.keys(obj).length) {
      setLocalData(obj);
    } else {
      window.localStorage.setItem(key, JSON.stringify(options));
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      window.localStorage.setItem(key, JSON.stringify(localData));
    }
  }, [localData]);

  function setLocalData(value) {
    setLocalStorage({
      ...localData,
      ...value,
    });
  }

  return (
    <LocalDataStateContext.Provider value={{ localData }}>
      <LocalDataDispatchContext.Provider value={{ setLocalData }}>
        {children}
      </LocalDataDispatchContext.Provider>
    </LocalDataStateContext.Provider>
  );
}

export const useLocalDataState = (key = 'localData') => {
  const context = useContext(LocalDataStateContext);
  if (context === undefined) {
    throw new Error(
      'useLocalDataState must be used within a LocalDataProvider'
    );
  }
  return context;
};

export const useLocalDataDispatch = (key = 'localData') => {
  const context = useContext(LocalDataDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useLocalDataDispatch must be used within a LocalDataProvider'
    );
  }
  return context;
};
