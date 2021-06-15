// test-utils.js

import React, {ReactElement} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import {render, RenderOptions} from '@testing-library/react-native';

const styles = StyleSheet.create({
  safeArea: {flex: 1},
});

const AllTheProviders: React.FC = ({children}) => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
      </ApplicationProvider>
    </>
  );
};

const customRender = (ui: ReactElement, options: RenderOptions) =>
  render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
