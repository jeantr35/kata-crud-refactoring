import React, {Fragment, useContext, useEffect} from 'react'
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

  const onChange = (event, todo, groupListId) => {
    const request = {
      name: todo.name,
      id: todo.id,
      completed: event.target.checked,
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

    const deleteAllListItem = todo.list.map((item) => {
      if(item.groupListId === id){
        onDelete(item.id);
      }
    });

    fetch(HOST_API + "/" + id + "/todoList", {
      method: "DELETE"
    }).then((list) => {
      dispatch({ type: "delete-list", id })
    })
  };

  const decorationDone = {
    textDecoration: 'line-through'
  };

  return <Fragment>
    <table >
      <tbody>
        {currentList.map((list) => {
          return <Fragment key={list.id}>
          <tr className="ListTime">
            <td>{list.name}</td>
            <td><button className="DeleteButton" onClick={() => onDeleteList(list.id)}>Eliminar</button></td>
          </tr>
          <tr ><td><Form groupListId={list.id}/></td></tr>
            <tr className="ItemDiv">
              <td className="ID">ID</td>
              <td>Tarea</td>
              <td>¿Completado?</td>
            </tr>
            {currentTodos.map((todo) => {
              if (todo.groupListId === list.id) {
                return<tr className="todoList" key={todo.id} style={todo.completed ? decorationDone : {}}>
                <td className="ID">{todo.id}</td>
                <td>{todo.name}</td>
                <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo, list.id)}></input></td>
                <td><button className="DeleteButton" onClick={() => onDelete(todo.id)}>Eliminar</button></td>
                <td><button className="EditButton"onClick={() => onEdit(todo)}>Editar</button></td>
              </tr>  
              }
              return;
            })}
        </Fragment>
        })}
      </tbody>
    </table>
  </Fragment>
}
export default List;