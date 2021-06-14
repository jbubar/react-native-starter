import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'firebase/app';

import {ListItem, Icon, Text} from '@ui-kitten/components';

import {Config} from 'react-native-config';
const {SINGLE_LIST_ID} = Config;

const styles = StyleSheet.create({
  icon: {margin: 0},
  strikethrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});

export type Todo = {
  id: string;
  description: string;
  done: boolean;
};

export default ({item}: {item: Todo}) => {
  const toggleDone = async ({id, done}: Todo) => {
    try {
      await firebase
        .firestore()
        .collection('todoLists')
        .doc(SINGLE_LIST_ID)
        .collection('todos')
        .doc(id)
        .update({done: !done});
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ListItem
      title={() => (
        <Text key={item.id} style={[item.done && styles.strikethrough]}>
          {item.description}
        </Text>
      )}
      accessoryRight={props => (
        <TouchableOpacity onPress={() => toggleDone(item)}>
          <Icon
            name={item.done ? 'checkmark-square-outline' : 'square-outline'}
            style={[props?.style, styles.icon]}
          />
        </TouchableOpacity>
      )}
    />
  );
};
