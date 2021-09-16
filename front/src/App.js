import React from 'react';
import List from './components/List.jsx'
import Form from './components/Form.jsx';
import { StoreProvider } from './components/Reducer.jsx';


function App() {
  return <StoreProvider>
    <h3>To-Do List</h3>
    <Form />
    <List />
  </StoreProvider>
}

export default App;
