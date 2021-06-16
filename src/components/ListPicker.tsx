import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet} from 'react-native';

import {
  Button,
  Card,
  Divider,
  Input,
  Layout,
  List,
  ListItem,
  Modal,
} from '@ui-kitten/components';

import {ListContext} from '../context/Lists';

export default ({visible, closeModal}) => {
  const {lists, selectList, addList} = useContext(ListContext);

  const [inputValue, setInput] = useState('');

  const createList = useCallback(async () => {
    try {
      const list = await addList({name: inputValue});
      const result = await list.get();
      selectList({id: list.id, ...result.data()});
      setInput('');
      closeModal();
    } catch (e) {
      console.error(e);
    }
  }, [addList, closeModal, inputValue, selectList]);

  const chooseList = useCallback(
    item => {
      selectList(item);
      closeModal();
    },
    [closeModal, selectList],
  );

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={closeModal}>
      <Card>
        <Card style={styles.listCard}>
          <List
            data={lists}
            renderItem={({item}) => (
              <ListItem title={item.name} onPress={() => chooseList(item)} />
            )}
            ItemSeparatorComponent={Divider}
          />
        </Card>
        <Layout style={styles.container}>
          <Input
            label="New List"
            style={styles.input}
            size="large"
            value={inputValue}
            onChangeText={setInput}
            onSubmitEditing={createList}
          />

          <Button onPress={createList} style={styles.button}>
            Add
          </Button>
        </Layout>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 200,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
    marginTop: 18,

    marginBottom: 15,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  deleteButton: {marginRight: 10},
  input: {
    flex: 1,
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
  listCard: {marginBottom: 10},
});
