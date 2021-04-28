import { Box, Flex } from '@chakra-ui/react';
import { header, footer } from '../../layer-styles';
import { useScaffold } from '@/chakra/contexts/scaffold-context';

export function Header({ HeaderComponent, children, ...rest }) {
  const { theme } = useScaffold(); // @TODO: consume from localstorage
  return (
    <Box {...header[theme]?.wrapper} {...rest}>
      <Flex {...header[theme]?.container}>
        <HeaderComponent />
        {children}
      </Flex>
    </Box>
  );
}

export function Footer({ FooterComponent, children, ...rest }) {
  const { theme } = useScaffold(); // @TODO: consume from localstorage
  return (
    <Box {...footer[theme]?.wrapper} {...rest}>
      <Flex {...footer[theme]?.container}>
        <FooterComponent />
        {children}
      </Flex>
    </Box>
  );
}
