import React from 'react';
import {
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import TodoListScreen from './src/TodoListScreen';
import * as eva from '@eva-design/eva';

import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import {EvaIconsPack} from '@ui-kitten/eva-icons';

const styles = StyleSheet.create({
  flex: {flex: 1},
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
        <SafeAreaView style={styles.flex}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.flex}>
            <TodoListScreen />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ApplicationProvider>
    </>
  );
};

export default App;
