import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import firebase from 'firebase/app';

import {useCollectionData} from 'react-firebase-hooks/firestore';
import {ListContext} from './Lists';

export type Todo = {
  id: string;
  description: string;
  done: boolean;
  date?: Date;
};

const defaultState = {
  todos: [],
  selectedTodo: null,
};

const defaultActions = {
  addTodo: async (_newTodo: string) => {},
  toggleDone: async (_todo: Todo) => {},
  saveTodo: async (_todo: Todo) => {},
  deleteTodo: async (_todo: Todo) => {},
  setSelected: (_todo: Todo) => {},
};

export const TodoContext = createContext({
  isLoading: false,
  ...defaultState,
  ...defaultActions,
});

const TodoProvider: React.FC = ({children}) => {
  const {selectedList} = useContext(ListContext);

  const [selectedTodo, setSelected] = useState(null);

  const TodosCollection = useMemo(
    () =>
      firebase
        .firestore()
        .collection('todoLists')
        .doc(selectedList.id)
        .collection('todos'),
    [selectedList],
  );

  const [todos, isLoading, error] = useCollectionData(TodosCollection, {
    idField: 'id',
  });

  const addTodo = useCallback(
    async newTodo => {
      if (newTodo.length) {
        try {
          await TodosCollection.add({
            description: newTodo,
            done: false,
          });
        } catch ({message}) {
          console.error(message);
        }
      }
    },
    [TodosCollection],
  );

  const toggleDone = useCallback(
    async ({id, done}: Todo) => {
      try {
        await TodosCollection.doc(id).update({done: !done});
      } catch (e) {
        console.error(e);
      }
    },
    [TodosCollection],
  );

  const saveTodo = useCallback(
    async ({id, description, done, date}: Todo) => {
      try {
        await TodosCollection.doc(id).update({
          description,
          done,
          date: firebase.firestore.Timestamp.fromDate(date),
        });
      } catch (e) {
        console.error(e);
      }
    },
    [TodosCollection],
  );

  const deleteTodo = useCallback(
    async ({id}: Todo) => {
      try {
        await TodosCollection.doc(id).delete();
      } catch (e) {
        console.error(e);
      }
    },
    [TodosCollection],
  );

  return (
    <TodoContext.Provider
      value={{
        todos,
        isLoading,
        error: error?.message,
        addTodo,
        toggleDone,
        selectedTodo,
        setSelected,
        saveTodo,
        deleteTodo,
      }}
      children={children}
    />
  );
};

export const MockedProvider: React.FC = props => (
  <TodoContext.Provider {...props} />
);

export default TodoProvider;
