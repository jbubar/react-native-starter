import React from 'react';

import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

import TodosProvider from './context/Todos';
import DetailsModal from './components/DetailsModal';

const TodoListScreen = () => (
  <TodosProvider>
    <DetailsModal />
    <Navbar title="Todos Interview" />
    <TodoList />
    <AddTodo />
  </TodosProvider>
);

export default TodoListScreen;
