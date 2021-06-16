import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {
  Button,
  Card,
  CheckBox,
  Datepicker,
  Icon,
  Input,
  Layout,
  Modal,
} from '@ui-kitten/components';

import {TodoContext} from '../context/Todos';

const TrashIcon = props => <Icon {...props} name="trash-2-outline" />;
const CalendarIcon = props => <Icon {...props} name="calendar" />;

export default () => {
  const {selectedTodo, setSelected, saveTodo, deleteTodo} =
    useContext(TodoContext);

  const [inputValue, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(null);
  useEffect(() => {
    if (selectedTodo) {
      setInput(selectedTodo.description);
      setChecked(selectedTodo.done);
      selectedTodo.date && setDate(selectedTodo.date.toDate());
    }
  }, [selectedTodo]);

  const closeModal = useCallback(() => setSelected(null), [setSelected]);

  const saveAndClose = useCallback(async () => {
    try {
      const {id, done, description, date: todoDate} = selectedTodo;

      if (inputValue !== description || checked !== done || todoDate !== date) {
        await saveTodo({id, description: inputValue, done: checked, date});
      }

      closeModal();
    } catch (e) {
      console.error(e);
    }
  }, [selectedTodo, inputValue, checked, date, closeModal, saveTodo]);

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
            value={inputValue}
            onChangeText={setInput}
            onSubmitEditing={saveAndClose}
          />

          <Layout style={styles.checkboxRow}>
            <Datepicker
              label="Due Date"
              placeholder="Pick Date"
              date={date}
              onSelect={nextDate => setDate(nextDate)}
              accessoryRight={CalendarIcon}
              style={styles.flex}
            />
          </Layout>

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
