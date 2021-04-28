import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Providers } from '@/chakra/contexts';
import { SupabaseProvider } from '@/contexts/supabase-context';

import Nprogress from '@/chakra/components/nprogress';

import appConfig from '../../app.config';

import {
  useLocalDataState,
  useLocalDataDispatch,
} from '@/contexts/local-data-context';

import { sb } from '@/lib/initSupabase';

export const ScaffoldContext = createContext();
export function ScaffoldProvider({ children }) {
  const { options, ...restAppConfig } = appConfig;

  return (
    <ScaffoldContext.Provider value={{ ...restAppConfig, options }}>
      <SupabaseProvider sb={sb}>
        <Providers.modal>
          <Providers.toasts toastOptions={options?.toasts}>
            <Providers.errors errorOptions={options?.errors}>
              <Nprogress />
              {children}
            </Providers.errors>
          </Providers.toasts>
        </Providers.modal>
      </SupabaseProvider>
    </ScaffoldContext.Provider>
  );
}

export const useScaffold = () => {
  const context = useContext(ScaffoldContext);
  if (context === undefined) {
    throw new Error('useScaffoldState must be used within a ScaffoldProvider');
  }

  const { localData: options } = useLocalDataState('options');
  const { setLocalData } = useLocalDataDispatch('options');
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [scaffoldTheme, setScaffoldTheme] = useState(context?.scaffold?.theme);

  const updateHeaderShow = useCallback((boolean) => setShowHeader(boolean), []);
  const updateFooterShow = useCallback((boolean) => setShowFooter(boolean), []);
  useEffect(() => {
    setLocalData({
      ...context?.options,
      tips: { show: true },
      theme: context?.scaffold?.theme,
    });
  }, []);

  /* scaffold = {header, footer} && restCtx: {details, options, routes, seo} */
  const { scaffold, ...restCtx } = context;

  /* defaults: {header, footer} && rest : {null} */
  const { defaults, theme, ...rest } = scaffold;

  return {
    header: defaults?.header,
    footer: defaults?.footer,
    scaffold: rest || null,
    properties: Object.keys(rest),
    config: restCtx,
    theme: scaffoldTheme,
    setScaffoldTheme,
    showHeader,
    showFooter,
    setShowHeader: updateHeaderShow,
    setShowFooter: updateFooterShow,
  };
};
