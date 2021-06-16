import React from 'react';

import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

import TodosProvider from './context/Todos';
import ListsProvider from './context/Lists';

const TodoListScreen = () => (
  <ListsProvider>
    <TodosProvider>
      <Navbar />
      <TodoList />
      <AddTodo />
    </TodosProvider>
  </ListsProvider>
);

export default TodoListScreen;
