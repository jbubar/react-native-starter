import React from 'react';
import {StyleSheet} from 'react-native';

import firebase from 'firebase/app';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import {List, Divider, TopNavigation} from '@ui-kitten/components';

import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';

import {Config} from 'react-native-config';
const {SINGLE_LIST_ID} = Config;

const styles = StyleSheet.create({
  flex: {flex: 1},
});

const TodoListScreen = () => {
  const [data, ,] = useCollectionData(
    firebase
      .firestore()
      .collection('todoLists')
      .doc(SINGLE_LIST_ID)
      .collection('todos'),
    {idField: 'id'},
  );

  return (
    <>
      <TopNavigation title="Todos Interview" alignment="center" />
      <Divider />
      <List
        style={styles.flex}
        data={data}
        renderItem={props => <TodoItem {...props} />}
        ItemSeparatorComponent={Divider}
      />
      <AddTodo />
    </>
  );
};

export default TodoListScreen;
