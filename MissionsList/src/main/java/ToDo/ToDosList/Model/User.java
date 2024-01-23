package ToDo.ToDosList.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class User {

    @Id
    private String id;
    private String name;
    private List<ToDo> toDos;

    public User() {
    }

    public User(String name, List<ToDo> ToDos) {
        this.name = name;
        this.toDos = ToDos;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ToDo> getToDos() {
        return toDos;
    }

    public void setToDos(List<ToDo> ToDos) {
        this.toDos = ToDos;
    }
}
