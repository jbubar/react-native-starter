import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {ListItem, Icon, Text} from '@ui-kitten/components';

import {Todo, TodoContext} from '../context/Todos';

const styles = StyleSheet.create({
  icon: {margin: 0},
  strikethrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});

export default ({item}: {item: Todo}) => {
  const {toggleDone} = useContext(TodoContext);

  return (
    <ListItem
      testID="todoItem"
      title={() => (
        <Text key={item.id} style={[item.done && styles.strikethrough]}>
          {item.description}
        </Text>
      )}
      accessoryRight={props => (
        <TouchableOpacity onPress={() => toggleDone(item)} testID="toggleDone">
          <Icon
            name={item.done ? 'checkmark-square-outline' : 'square-outline'}
            style={[props?.style, styles.icon]}
          />
        </TouchableOpacity>
      )}
    />
  );
};
