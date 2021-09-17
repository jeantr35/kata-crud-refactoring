import React, {useContext, useState, useRef} from 'react'
import { HOST_API } from './Reducer.jsx';
import { Store } from './Store.jsx';


const FormList = () => {
    const formRef = useRef(null);
    const { dispatch, state: { lists } } = useContext(Store);
    const item = lists.item;
    const [state, setState] = useState(item);
  
    const onAdd = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: null,
      };
  
  
      fetch(HOST_API + "/todoList", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((list) => {
          dispatch({ type: "add-list", item: list });
          setState({ name: "" });
          formRef.current.reset();
        });
    }
  
  
    return <form ref={formRef}>
      <input
        type="text"
        name="name"
        placeholder="Nombre de tu lista"
        defaultValue={item.name}
        className="AddToDo"
        onChange={(event) => {
          setState({ ...state, name: event.target.value })
        }}  ></input>
      {!item.id && <button className='CreateButton' onClick={onAdd}>Crear</button>}
    </form>
}
 
export default FormList;