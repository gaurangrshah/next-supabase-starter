import { Box } from '@chakra-ui/react';

import { ScaffoldProvider } from '@/chakra/contexts/scaffold-context';
import { useScaffold } from '@/chakra/contexts/scaffold-context';
import { constants } from '../../constants';

function Scaffold({ children }) {
  const {
    showHeader,
    showFooter,
    header,
    footer,
    scaffold,
    properties,
    theme,
  } = useScaffold();

  return (
    <ScaffoldProvider>
      <Scaffold.PageGrid {...{ theme }}>
        {showHeader && header && (
          <Scaffold.TopBar {...{ theme }}>
            <header.component {...header.props} />
          </Scaffold.TopBar>
        )}
        <Scaffold.Main {...{ theme }}>
          {children}
          {typeof window !== 'undefined' && properties?.length
            ? properties.map((key) => {
                const Component = scaffold[key].Component;
                return (
                  <Component key={scaffold[key].id} {...scaffold[key].props} />
                );
              })
            : ''}
        </Scaffold.Main>
        {showFooter && footer && (
          <Scaffold.BottomBar {...{ theme }}>
            <footer.component {...footer.props} />
          </Scaffold.BottomBar>
        )}
      </Scaffold.PageGrid>
    </ScaffoldProvider>
  );
}

function PageGrid({ theme = 'base', children, ...rest }) {
  return (
    <Box {...pagegrid[theme]} {...rest}>
      {children}
    </Box>
  );
}

function TopBar({ theme = 'base', children, ...rest }) {
  return (
    <Box {...topbar[theme]} {...rest}>
      {children}
    </Box>
  );
}

function MainContent({ theme = 'base', children, ...rest }) {
  return (
    <Box {...main[theme]} {...rest}>
      {children}
    </Box>
  );
}

function BottomBar({ theme = 'base', children, ...rest }) {
  return (
    <Box {...bottombar[theme]} {...rest}>
      {children}
    </Box>
  );
}

Scaffold.PageGrid = PageGrid;
Scaffold.TopBar = TopBar;
Scaffold.Main = MainContent;
Scaffold.BottomBar = BottomBar;

export default Scaffold;

export const topbar = {
  base: {
    w: 'full',
    flex: 'none',
    mx: 'auto',
  },
};

export const pagegrid = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
};

export const main = {
  base: {
    as: 'main',
    position: 'relative',
    w: 'full',
    maxW: 'full',
    flex: '1 0 auto',
  },
};

export const bottombar = {
  base: {
    w: 'full',
    flex: 'none',
    mx: 'auto',
  },
};
