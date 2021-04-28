import { constants } from '../constants';

export const header = {
  parts: ['wrapper', 'container'],
  base: {},
};

header.base.wrapper = {
  as: 'header',
  w: 'full',
  h: constants.headerHeight,
};

header.base.container = {
  display: 'flex',
  direction: 'row',
  jusitfy: 'space-between',
  align: 'center',
  maxW: 'container.lg',
  mx: 'auto',
  p: 2,
};

export const footer = {
  parts: ['wrapper', 'container'],
  base: {},
};

footer.base.wrapper = {
  as: 'footer',
  w: 'full',
  h: constants.footerHeight,
};

footer.base.container = {
  display: 'flex',
  direction: 'row',
  jusitfy: 'space-between',
  align: 'center',
  maxW: 'container.lg',
  mx: 'auto',
  p: 4,
};
