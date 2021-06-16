import React from 'react';
import {render} from 'test-utils';

import 'firebase/firestore';

import TodoList from '../TodoList';
import {MockedProvider} from '../../context/Todos';

describe('TodoList', () => {
  let wrapper, data;

  beforeAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    data = [
      {
        id: '1',
        description: 'Sample 1',
        done: false,
      },
      {
        id: '2',
        description: 'Sample 2',
        done: false,
      },
      {
        id: '3',
        description: 'Sample 3',
        done: false,
      },
    ];

    wrapper = render(
      <MockedProvider value={{data}}>
        <TodoList />
      </MockedProvider>,
    );
  });

  test('TodoList', () => {
    const {toJSON} = wrapper;

    expect(toJSON()).toMatchSnapshot();
  });
});
