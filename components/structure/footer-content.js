import { chakra, Box } from '@chakra-ui/react';
import { constants } from '../../chakra/constants';

export function FooterContent({ ...rest }) {
  return (
    <>
      <chakra.p color="#black">&copy; {new Date().getFullYear()}</chakra.p>
    </>
  );
}
