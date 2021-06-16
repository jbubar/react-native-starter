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
  date: {marginRight: 10},
  overdue: {color: 'red'},
  descriptionRow: {flexDirection: 'row'},
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
          <Layout style={styles.descriptionRow}>
            <Text style={[done && styles.strikethrough, styles.date]}>
              {formatDistance(date.toDate(), new Date(), {addSuffix: true})}
            </Text>
            <Text style={[done && styles.strikethrough, styles.overdue]}>
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
