import React, {createContext, useState, useCallback, useEffect} from 'react';
import firebase from 'firebase/app';

import {useCollectionData} from 'react-firebase-hooks/firestore';

export type Todo = {
  id: string;
  name: string;
};

const defaultState = {
  lists: [],
  selectedList: null,
};

const defaultActions = {
  addList: async (_newTodo: string) => {},
  selectList: (_todo: Todo) => {},
};

export const ListContext = createContext({
  isLoading: false,
  ...defaultState,
  ...defaultActions,
});

const ListProvider: React.FC = ({children}) => {
  const [selectedList, selectList] = useState({});

  const ListsCollection = firebase.firestore().collection('todoLists');

  const [lists, isLoading, error] = useCollectionData(ListsCollection, {
    idField: 'id',
  });
  useEffect(() => {
    if (lists) {
      selectList(lists[0]);
    }
  }, [lists]);

  const addList = useCallback(
    async ({name}) => {
      if (name.length) {
        try {
          return await ListsCollection.add({
            name,
          });
        } catch ({message}) {
          console.error(message);
        }
      }
    },
    [ListsCollection],
  );

  return (
    <ListContext.Provider
      value={{
        lists,
        isLoading,
        error: error?.message,
        addList,
        selectedList,
        selectList,
      }}
      children={children}
    />
  );
};

export const MockedProvider: React.FC = props => (
  <ListContext.Provider {...props} />
);

export default ListProvider;
