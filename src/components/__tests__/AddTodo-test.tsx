/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {render, fireEvent, waitFor} from 'test-utils';

import AddTodo from '../AddTodo';
import {MockedProvider} from '../../context/Todos';

jest.mock('react-native-config', () => ({
  Config: {
    SINGLE_LIST_ID: '1',
  },
}));

describe('AddTodo', () => {
  let wrapper, addTodo;

  beforeAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    addTodo = jest.fn(todo => Promise.resolve());
    wrapper = render(
      <MockedProvider value={{addTodo}}>
        <AddTodo />
      </MockedProvider>,
    );
  });

  test('Snapshot', () => {
    const {toJSON} = wrapper;
    expect(toJSON()).toMatchSnapshot();
  });

  test('Add Todo With Button', async () => {
    const {getByTestId} = wrapper;
    fireEvent.changeText(getByTestId('todoInput'), 'new todo');
    fireEvent.press(getByTestId('addButton'));

    await waitFor(() => {
      expect(addTodo).toHaveBeenCalledWith('new todo');
    });
  });

  test('Add Todo With Return/Enter', async () => {
    const {getByTestId} = wrapper;

    const todoInput = getByTestId('todoInput');
    fireEvent.changeText(todoInput, 'new todo');
    fireEvent(todoInput, 'submitEditing');

    await waitFor(() => {
      expect(addTodo).toHaveBeenCalledWith('new todo');
    });
  });
});
