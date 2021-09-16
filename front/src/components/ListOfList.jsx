import React, {useContext, useEffect} from 'react'
import { HOST_API } from './Reducer.jsx';
import { Store } from './Store.jsx';

const ListOfList = () => {
    const { dispatch, state: { lists } } = useContext(Store);
    const currentList = lists.list;

  useEffect(() => {
    fetch(HOST_API + "/todoLists")
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: "update-listOfList", list })
      })
  }, [dispatch]);


  const onDelete = (id) => {
    fetch(HOST_API + "/" + id + "/todoList", {
      method: "DELETE"
    }).then((list) => {
      dispatch({ type: "delete-list", id })
    })
  };


  const onChange = (event, todo) => {
    const request = {
      name: todo.name,
      id: todo.id,
    };
    fetch(HOST_API + "/todoList", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: "update-list", item: list });
      });
  };


  return <div>
    <table >
      <thead>
        <tr>
          <td>Nombre</td>
        </tr>
      </thead>
      <tbody>
        {currentList.map((lists) => {
          return <tr>
            <td>{lists.name}</td>
            <td><button onClick={() => onDelete(lists.id)}>Eliminar</button></td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}
 
export default ListOfList;