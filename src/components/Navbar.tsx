import React from 'react';

import {
  Divider,
  TopNavigation,
  TopNavigationProps,
} from '@ui-kitten/components';

export default (props: TopNavigationProps) => (
  <>
    <TopNavigation alignment="center" {...props} />
    <Divider />
  </>
);
