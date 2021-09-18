import React from 'react';
import List from './components/List.jsx'
import Form from './components/Form.jsx';
import { StoreProvider } from './components/StoreProvider';
import FormList from './components/FormList.jsx';
import "./components/Styles.css"


function App() {
  return <StoreProvider>
    <h3 className="Title">To-Do List</h3>
    <div className="GlobalDiv">
    <FormList />
    </div>
    <div className="GlobalDiv">
    <List />
    </div>
  </StoreProvider>
}

export default App;
