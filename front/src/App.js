import React from 'react';
import List from './components/List.jsx'
import Form from './components/Form.jsx';
import { StoreProvider } from './components/StoreProvider';
import FormList from './components/FormList.jsx';
import ListOfList from './components/ListOfList.jsx';


function App() {
  return <StoreProvider>
    <h3>To-Do List</h3>
    <FormList />
    <ListOfList />
    <Form />
    <List />
  </StoreProvider>
}

export default App;
