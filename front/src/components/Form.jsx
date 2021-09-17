import React, {useContext, useState, useRef} from 'react'
import { HOST_API } from './Reducer.jsx';
import { Store } from './Store.jsx';

const Form = ({groupListId}) => {
  const formRef = useRef(null);
  const { dispatch, state: { todo } } = useContext(Store);
  const item = todo.item;
  const [state, setState] = useState(item);
  const [isDisabled, setIsDisabled] = useState(true)

  const onAdd = (event) => {
    event.preventDefault();
    setIsDisabled(true)

    const request = {
      name: state.name,
      id: null,
      completed: false,
      groupListId: groupListId
    };


    fetch(HOST_API + "/todo", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: "add-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  }

  const onEdit = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: item.id,
      isCompleted: item.isCompleted,
      groupListId: groupListId
    };


    fetch(HOST_API + "/todo", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: "update-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  }

  return <form ref={formRef}>
    <input
      type="text"
      name="name"
      placeholder="¿Qué piensas hacer hoy?"
      defaultValue={item.groupListId === groupListId ? item.name : ""}
      className="AddList"
      onChange={(event) => {
        setIsDisabled(event.target.value.length > 3 ? false : true)
        setState({ ...state, name: event.target.value })
      }} />
    {item.id && item.groupListId === groupListId && <button onClick={onEdit}>Actualizar</button>}
    {!item.id && <button disabled={isDisabled} className='CreateButton' onClick={onAdd}>Crear</button>}
  </form>
}
 
export default Form;