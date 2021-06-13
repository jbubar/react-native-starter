/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Button,
  Divider,
  Layout,
  TopNavigation,
  List,
  ListItem,
  Input,
} from '@ui-kitten/components';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState([
    {
      title: 'Todo 1',
      done: false,
    },
    {
      title: 'Todo 2',
      done: false,
    },
    {
      title: 'Todo 3',
      done: false,
    },
  ]);

  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.length) {
      setData([...data, {title: newTodo, done: false}]);
      setNewTodo('');
    }
  };

  const renderItem: List['props']['renderItem'] = ({item}) => (
    <ListItem title={item.title} />
  );

  return (
    <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation title="Sample App" alignment="center" />
        <Divider />
        <List style={{flex: 1}} data={data} renderItem={renderItem} />
        <Layout style={{flexDirection: 'row', padding: 10}}>
          <Input
            style={{flexGrow: 1}}
            size="large"
            placeholder="Large"
            value={newTodo}
            onChangeText={setNewTodo}
          />
          <Button onPress={addTodo} style={{marginLeft: 10}}>
            +
          </Button>
        </Layout>
      </SafeAreaView>
    </ApplicationProvider>
  );
};

export default App;
