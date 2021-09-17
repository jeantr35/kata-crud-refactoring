import React, {useContext, useEffect} from 'react'
import Form from './Form.jsx';
import { HOST_API } from './Reducer.jsx';
import { Store } from './Store.jsx';

const List = () => {
const { dispatch, state: { todo, lists } } = useContext(Store);
const currentTodos = todo.list;
const currentList = lists.list;


  useEffect(() => {
    fetch(HOST_API + "/todos")
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: "update-list", list })
      })
  }, [dispatch]);


  const onDelete = (id) => {
    fetch(HOST_API + "/" + id + "/todo", {
      method: "DELETE"
    }).then((list) => {
      dispatch({ type: "delete-item", id })
    })
  };

  const onEdit = (todo) => {
    dispatch({ type: "edit-item", item: todo })
  };

  const onChange = (event, todo, listId) => {
    const request = {
      name: todo.name,
      id: todo.id,
      completed: event.target.checked,
      groupListId: listId
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
      });
  };

  
  useEffect(() => {
    fetch(HOST_API + "/todoLists")
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: "update-listOfList", list })
      })
  }, [dispatch]);


  const onDeleteList = (id) => {
    fetch(HOST_API + "/" + id + "/todoList", {
      method: "DELETE"
    }).then((list) => {
      dispatch({ type: "delete-list", id })
    })
  };

  const decorationDone = {
    textDecoration: 'line-through'
  };

  return <div>
    <table >
      <tbody>
        {currentList.map((list) => {
          return <div>
          <tr>
            <td>{list.name}</td>
            <td><button onClick={() => onDeleteList(list.id)}>Eliminar</button></td>
          </tr>
          <tr><td><Form groupListId={list.id}/></td></tr>
      <div>
        <table >
          <thead>
            <tr>
              <td>ID</td>
              <td>Tarea</td>
              <td>¿Completado?</td>
            </tr>
          </thead>
          <tbody>
            {currentTodos.map((todo) => {
              if (todo.groupListId === list.id) {
                return<tr key={todo.id} style={todo.completed ? decorationDone : {}}>
                <td>{todo.id}</td>
                <td>{todo.name}</td>
                <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
                <td><button onClick={() => onDelete(todo.id)}>Eliminar</button></td>
                <td><button onClick={() => onEdit(todo, list.id)}>Editar</button></td>
              </tr>  
              }
              return <tr key={todo.id} style={todo.completed ? decorationDone : {}}></tr>
            })}
          </tbody>
        </table>
      </div>
      </div>
        })}
      </tbody>
    </table>
  </div>
}
export default List;