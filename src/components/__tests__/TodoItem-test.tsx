/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {render, fireEvent} from 'test-utils';

import 'firebase/firestore';

import TodoItem from '../TodoItem';

import {MockedProvider} from '../../context/Todos';
import {waitFor} from '@testing-library/react-native';

jest.mock('react-native-config', () => ({
  Config: {
    SINGLE_LIST_ID: '1',
  },
}));

describe('TodoItem', () => {
  let wrapper, toggleDone;

  const INCOMPLETE_TODO = {
    id: '1',
    description: 'Sample',
    done: false,
  };

  const COMPLETE_TODO = {
    id: '1',
    description: 'Sample',
    done: true,
  };

  beforeAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    toggleDone = jest.fn(todo => Promise.resolve());
    wrapper = render(
      <MockedProvider value={{toggleDone}}>
        <TodoItem item={INCOMPLETE_TODO} />
      </MockedProvider>,
    );
  });

  test('Snapshot - Incomplete', () => {
    const {toJSON} = wrapper;
    expect(toJSON()).toMatchSnapshot();
  });

  test('Snapshot - Done', () => {
    const {toJSON} = render(
      <MockedProvider value={{toggleDone}}>
        <TodoItem item={COMPLETE_TODO} />
      </MockedProvider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('Toggle Done', async () => {
    const {getByTestId, toJSON} = wrapper;

    const toggleButton = getByTestId('toggleDone');
    fireEvent.press(toggleButton);

    await waitFor(() => {
      expect(toggleDone).toHaveBeenCalledWith(INCOMPLETE_TODO);
    });
  });
});
