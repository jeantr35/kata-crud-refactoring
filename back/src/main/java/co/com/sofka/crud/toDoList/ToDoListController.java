package co.com.sofka.crud.toDoList;

import co.com.sofka.crud.DTO.TodoListDTO;
import co.com.sofka.crud.toDo.Todo;
import co.com.sofka.crud.toDo.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ToDoListController {

    @Autowired
    private ToDoListService service;

    @GetMapping(value = "api/todoLists")
    public Iterable<TodoListDTO> list(){
        return service.listOfList();
    }

    @PostMapping(value = "api/todoList")
    public TodoListDTO save(@RequestBody TodoListDTO todoListDTO){
        if (!todoListDTO.getName().isEmpty() && todoListDTO.getName().length() > 3){
            return service.saveList(todoListDTO);
        }
        throw new RuntimeException("Por favor ingrese un nombre de al menos 4 caracteres");
    }

    @PutMapping(value = "api/todoList")
    public TodoListDTO update(@RequestBody TodoListDTO todoListDTO){
        if(todoListDTO.getId() != null && todoListDTO.getName().length() > 3){
            return service.saveList(todoListDTO);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "api/{id}/todoList")
    public void delete(@PathVariable("id")Long id){
        if (service.existListInDb(id)){
            service.deleteList(id);
        }
        throw new RuntimeException("No existe el id para borrar");

    }

    @GetMapping(value = "api/{id}/todoList")
    public ToDoList get(@PathVariable("id") Long id){
        if (service.existListInDb(id)){
            return service.getList(id);
        }
        throw new RuntimeException("No existe el id en la base de datos");
    }

}
