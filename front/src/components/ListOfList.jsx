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


  return <div>
    <table >
      <tbody>
        {currentList.map((lists) => {
          return <div>
          <tr>
            <td>{lists.name}</td>
            <td><button onClick={() => onDelete(lists.id)}>Eliminar</button></td>
          </tr>
          </div>
        })}
      </tbody>
    </table>
  </div>
}
 
export default ListOfList;