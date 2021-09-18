package co.com.sofka.crud.toDoList;

import co.com.sofka.crud.DTO.TodoDTO;
import co.com.sofka.crud.DTO.TodoListDTO;
import co.com.sofka.crud.toDo.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ToDoListService {

    @Autowired
    private ToDoListRepository repository;

    public Iterable<TodoListDTO> listOfList(){
        Iterable<ToDoList> list = repository.findAll();
        List<TodoListDTO> listDTO = new ArrayList<TodoListDTO>();
        list.forEach(todoELement -> {
            listDTO.add(entityToDTO(todoELement));
        });
        Iterable<TodoListDTO> iterableDTO = listDTO;
        return listDTO;
    }

    public TodoListDTO saveList(TodoListDTO todoListDTO){
        ToDoList toDoList = mapToEntity(todoListDTO);
        if(toDoList.getName().length() > 3) {
            toDoList = repository.save(toDoList);
        }
        todoListDTO.setId(toDoList.getId());
        return todoListDTO;
    }

    public void deleteList(Long id){
        repository.delete(getList(id));
    }

    public ToDoList getList(Long id){
        return repository.findById(id).orElseThrow();
    }

    public boolean existListInDb(Long id){
        return repository.existsById(id);
    }

    private ToDoList mapToEntity(TodoListDTO todoListDTO){
        ToDoList toDoList = new ToDoList();
        toDoList.setId(todoListDTO.getId());
        toDoList.setName(todoListDTO.getName());
        return toDoList;
    }

    private TodoListDTO entityToDTO(ToDoList toDoList){
        TodoListDTO todoListDTO = new TodoListDTO();
        todoListDTO.setId(toDoList.getId());
        todoListDTO.setName(toDoList.getName());
        return todoListDTO;
    }


}
