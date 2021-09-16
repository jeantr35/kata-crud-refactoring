package co.com.sofka.crud.toDoList;

import co.com.sofka.crud.toDo.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ToDoListService {

    @Autowired
    private ToDoListRepository repository;

    public Iterable<ToDoList> listOfList(){
        return repository.findAll();
    }

    public ToDoList saveList(ToDoList todoList){
        return repository.save(todoList);
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


}
