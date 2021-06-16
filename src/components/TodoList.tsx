import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';

import {Divider, List} from '@ui-kitten/components';
import DetailsModal from './DetailsModal';
import TodoItem from './TodoItem';

import {TodoContext} from '../context/Todos';

const styles = StyleSheet.create({
  fullList: {flex: 1},
});

export default () => {
  const {todos} = useContext(TodoContext);

  return (
    <>
      <DetailsModal />
      <List
        style={styles.fullList}
        data={todos}
        renderItem={props => <TodoItem {...props} />}
        ItemSeparatorComponent={Divider}
      />
    </>
  );
};
