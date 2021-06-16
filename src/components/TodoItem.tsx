import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {formatDistance, compareAsc} from 'date-fns';
import {ListItem, Icon, Text, Layout} from '@ui-kitten/components';

import {Todo, TodoContext} from '../context/Todos';

const styles = StyleSheet.create({
  icon: {margin: 0},
  strikethrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});

export default ({item}: {item: Todo}) => {
  const {id, done, date, description} = item;
  const {toggleDone, setSelected} = useContext(TodoContext);

  return (
    <ListItem
      onPress={() => setSelected(item)}
      testID="todoItem"
      title={() => (
        <Text key={id} style={[done && styles.strikethrough]}>
          {description}
        </Text>
      )}
      description={() =>
        date ? (
          <Layout style={{flexDirection: 'row'}}>
            <Text style={[done && styles.strikethrough, {marginRight: 10}]}>
              {formatDistance(date.toDate(), new Date(), {addSuffix: true})}
            </Text>
            <Text style={[done && styles.strikethrough, {color: 'red'}]}>
              {compareAsc(date.toDate(), new Date()) < 1 ? 'OVERDUE' : ''}
            </Text>
          </Layout>
        ) : (
          <></>
        )
      }
      accessoryRight={props => (
        <TouchableOpacity onPress={() => toggleDone(item)} testID="toggleDone">
          <Icon
            name={done ? 'checkmark-square-outline' : 'square-outline'}
            style={[props?.style, styles.icon]}
          />
        </TouchableOpacity>
      )}
    />
  );
};
