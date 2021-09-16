package co.com.sofka.crud.toDoList;

import co.com.sofka.crud.toDo.Todo;

import javax.persistence.*;

@Entity
@Table(name="todoList")
public class ToDoList {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
