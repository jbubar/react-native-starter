import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet} from 'react-native';

import {Input, Layout, Button} from '@ui-kitten/components';

import {TodoContext} from '../context/Todos';

const styles = StyleSheet.create({
  inputRow: {flexDirection: 'row', padding: 10},
  messageInput: {flex: 1},
  addButton: {marginLeft: 10},
});

export default () => {
  const {addTodo} = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState('');

  const submit = useCallback(async () => {
    await addTodo(newTodo);
    setNewTodo('');
  }, [addTodo, newTodo]);

  return (
    <Layout style={styles.inputRow}>
      <Input
        style={styles.messageInput}
        size="large"
        placeholder="Add a todo..."
        value={newTodo}
        onChangeText={setNewTodo}
        onSubmitEditing={submit}
        testID="todoInput"
      />
      <Button onPress={submit} style={styles.addButton} testID="addButton">
        +
      </Button>
    </Layout>
  );
};
