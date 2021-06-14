import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import firebase from 'firebase/app';

import {Input, Layout, Button} from '@ui-kitten/components';

import {Config} from 'react-native-config';
const {SINGLE_LIST_ID} = Config;

const styles = StyleSheet.create({
  inputRow: {flexDirection: 'row', padding: 10},
  messageInput: {flex: 1},
  addButton: {marginLeft: 10},
});

export default () => {
  const [newTodo, setNewTodo] = useState('');

  const addTodo = async () => {
    if (newTodo.length) {
      try {
        await firebase
          .firestore()
          .collection('todoLists')
          .doc(SINGLE_LIST_ID)
          .collection('todos')
          .add({
            description: newTodo,
            done: false,
          });

        setNewTodo('');
      } catch ({message}) {
        console.error(message);
      }
    }
  };

  return (
    <Layout style={styles.inputRow}>
      <Input
        style={styles.messageInput}
        size="large"
        placeholder="Add a todo..."
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <Button onPress={addTodo} style={styles.addButton}>
        +
      </Button>
    </Layout>
  );
};
