import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';

import {Divider, List} from '@ui-kitten/components';
import TodoItem from './TodoItem';
import {TodoContext} from '../context/Todos';

const styles = StyleSheet.create({
  fullList: {flex: 1},
});

export default () => {
  const {data} = useContext(TodoContext);

  return (
    <List
      style={styles.fullList}
      data={data}
      renderItem={props => <TodoItem {...props} />}
      ItemSeparatorComponent={Divider}
    />
  );
};
