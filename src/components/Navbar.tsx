import React, {useContext, useState} from 'react';

import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
  TopNavigationProps,
} from '@ui-kitten/components';
import ListPicker from './ListPicker';

import {ListContext} from '../context/Lists';

const ListIcon = props => <Icon {...props} name="list-outline" />;

export default (props: TopNavigationProps) => {
  const {selectedList} = useContext(ListContext);

  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return (
    <>
      <ListPicker visible={visible} closeModal={closeModal} />
      <TopNavigation
        alignment="center"
        accessoryLeft={() => (
          <TopNavigationAction onPress={openModal} icon={ListIcon} />
        )}
        title={selectedList ? selectedList.name : ''}
        {...props}
      />
      <Divider />
    </>
  );
};
