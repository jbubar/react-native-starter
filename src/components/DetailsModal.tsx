import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  Card,
  CheckBox,
  Icon,
  Input,
  Layout,
  Modal,
} from '@ui-kitten/components';
import {TodoContext} from '../context/Todos';

const TrashIcon = props => <Icon {...props} name="trash-2-outline" />;

export default () => {
  const {selectedTodo, setSelected, saveTodo, deleteTodo} =
    useContext(TodoContext);

  const [inputValue, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (selectedTodo) {
      setInput(selectedTodo.description);
      setChecked(selectedTodo.done);
    }
  }, [selectedTodo]);

  const closeModal = useCallback(() => setSelected(null), [setSelected]);

  const saveAndClose = useCallback(async () => {
    try {
      const {id, done, description} = selectedTodo;

      if (inputValue !== description || checked !== done) {
        await saveTodo({id, description: inputValue, done: checked});
      }

      closeModal();
    } catch (e) {
      console.error(e);
    }
  }, [selectedTodo, inputValue, checked, closeModal, saveTodo]);

  const deleteAndClose = useCallback(async () => {
    try {
      await deleteTodo(selectedTodo);
      closeModal();
    } catch (e) {
      console.error(e);
    }
  }, [closeModal, deleteTodo, selectedTodo]);

  return (
    <Modal visible={!!selectedTodo} backdropStyle={styles.backdrop}>
      <Card>
        <Layout style={styles.container}>
          <Input
            label="Todo"
            style={styles.input}
            size="large"
            placeholder="Large"
            value={inputValue}
            onChangeText={setInput}
            onSubmitEditing={saveAndClose}
          />
          <Layout style={styles.checkboxRow}>
            <CheckBox checked={checked} onChange={setChecked}>
              Done?
            </CheckBox>
          </Layout>

          <Layout style={styles.buttonRow}>
            <Button
              onPress={deleteAndClose}
              style={styles.deleteButton}
              status="danger"
              accessoryLeft={TrashIcon}
            />
            <Button onPress={closeModal} style={styles.flex}>
              Cancel
            </Button>
          </Layout>
          <Button onPress={saveAndClose} status="success" style={styles.flex}>
            Save
          </Button>
        </Layout>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {minWidth: 200, justifyContent: 'space-between'},
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  deleteButton: {marginRight: 10},
  input: {
    marginBottom: 15,
  },
  flex: {
    flex: 1,
  },
  buttonRow: {flexDirection: 'row', marginBottom: 10},
  checkboxRow: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'center',
  },
});
