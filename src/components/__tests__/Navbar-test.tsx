import React from 'react';
import {render} from 'test-utils';

import Navbar from '../Navbar';

describe('Navbar', () => {
  test('Snapshot', () => {
    const {toJSON} = render(<Navbar title="Sample Title" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
