package co.com.sofka.crud.toDo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService service;

    @GetMapping(value = "api/todos")
    public Iterable<Todo> list(){
        return service.list();
    }
    
    @PostMapping(value = "api/todo")
    public Todo save(@RequestBody Todo todo){
        if (!todo.getName().isEmpty() && todo.getName().length() > 3){
            return service.save(todo);
        }
        throw new RuntimeException("Por favor ingrese un nombre de al menos 4 caracteres");
    }

    @PutMapping(value = "api/todo")
    public Todo update(@RequestBody Todo todo){
        if(todo.getId() != null && todo.getName().length() > 3){
            return service.save(todo);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "api/{id}/todo")
    public ResponseEntity delete(@PathVariable("id")Long id){
        if (!service.existInDb(id)){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        service.delete(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }

    @GetMapping(value = "api/{id}/todo")
    public Todo get(@PathVariable("id") Long id){
        if (service.existInDb(id)){
            return service.get(id);
        }
        throw new RuntimeException("No existe el id en la base de datos");
    }

}
