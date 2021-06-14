import React from 'react';
import TodoListScreen from './src/TodoList';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';

import * as eva from '@eva-design/eva';

import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import {EvaIconsPack} from '@ui-kitten/eva-icons';

const styles = StyleSheet.create({
  safeArea: {flex: 1},
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
        <SafeAreaView style={styles.safeArea}>
          <TodoListScreen />
        </SafeAreaView>
      </ApplicationProvider>
    </>
  );
};

export default App;
