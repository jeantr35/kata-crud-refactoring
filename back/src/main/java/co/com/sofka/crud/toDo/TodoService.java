package co.com.sofka.crud.toDo;

import co.com.sofka.crud.DTO.TodoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository repository;

    public Iterable<TodoDTO> list(){
        Iterable<Todo> list = repository.findAll();
        List<TodoDTO> listDTO = new ArrayList<TodoDTO>();
        list.forEach(todoELement -> {
            listDTO.add(entityToDTO(todoELement));
        });
        Iterable<TodoDTO> iterableDTO = listDTO;
        return listDTO;
    }

    public TodoDTO save(TodoDTO todoDTO){
        Todo todo = mapToEntity(todoDTO);
        if(todo.getName().length() > 3) {
            todo = repository.save(todo);
        }
        todoDTO.setId(todo.getId());
        return todoDTO;
    }

    public void delete(Long id){
        repository.delete(get(id));
    }

    public Todo get(Long id){
         return repository.findById(id).orElseThrow();
    }

    public boolean existInDb(Long id){
        return repository.existsById(id);
    }

    private Todo mapToEntity(TodoDTO todoDTO){
        Todo todo = new Todo();
        todo.setId(todoDTO.getId());
        todo.setName(todoDTO.getName());
        todo.setCompleted(todoDTO.isCompleted());
        todo.setGroupListId(todoDTO.getGroupListId());
        return todo;
    }

    private TodoDTO entityToDTO(Todo todo){
        TodoDTO todoDTO = new TodoDTO();
        todoDTO.setId(todo.getId());
        todoDTO.setName(todo.getName());
        todoDTO.setCompleted(todo.isCompleted());
        todoDTO.setGroupListId(todo.getGroupListId());
        return todoDTO;
    }

}
