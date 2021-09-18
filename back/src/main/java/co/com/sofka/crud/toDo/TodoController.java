package co.com.sofka.crud.toDo;

import co.com.sofka.crud.DTO.TodoDTO;
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
    public Iterable<TodoDTO> list(){
        return service.list();
    }
    
    @PostMapping(value = "api/todo")
    public TodoDTO save(@RequestBody TodoDTO todoDTO){
            return service.save(todoDTO);
    }

    @PutMapping(value = "api/todo")
    public TodoDTO update(@RequestBody TodoDTO todoDTO){
        if(service.existInDb(todoDTO.getId())) {
            return service.save(todoDTO);
        }
        throw new RuntimeException("No existe el id en la base de datos");
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
