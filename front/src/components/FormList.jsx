import React, {useContext, useState, useRef, Fragment} from 'react'
import { HOST_API } from './Reducer.jsx';
import { Store } from './Store.jsx';


const FormList = () => {
    const formRef = useRef(null);
    const { dispatch, state: { lists } } = useContext(Store);
    const item = lists.item;
    const [state, setState] = useState(item);
    const [isDisabled, setIsDisabled] = useState(true)
    const [hasWritten, sethasWritten] = useState(false)
  
    const onAdd = (event) => {
      event.preventDefault();
      setIsDisabled(true)
      sethasWritten(false)
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
  
  
    return <Fragment>
    <form ref={formRef}>
      <input
        type="text"
        name="name"
        placeholder="Nombre de tu lista"
        defaultValue={item.name}
        className="AddToDo"
        onChange={(event) => {
          sethasWritten(true)
          setIsDisabled(event.target.value.length > 3 ? false : true)
          setState({ ...state, name: event.target.value })
        }}  ></input>
      {!item.id && <button disabled={isDisabled} className='CreateButton' onClick={onAdd}>Crear</button>}
    </form>
     {isDisabled && hasWritten && <span className="MinimunLength">Minimo 4 caracteres</span>}
    </Fragment>
}
 
export default FormList;