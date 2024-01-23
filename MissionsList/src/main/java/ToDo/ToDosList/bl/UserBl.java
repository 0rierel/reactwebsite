package ToDo.ToDosList.bl;
import ToDo.ToDosList.Model.User;


import ToDo.ToDosList.Model.ToDo;
import ToDo.ToDosList.Model.UserDTO;
import ToDo.ToDosList.customsErrors.ToDoNotFoundException;
import ToDo.ToDosList.dal.UserDal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserBl {

    @Autowired
    private UserDal userDal;

    public List<UserDTO> getAllUsers() {
        return userDal.findAllProjectedByIdAndName();
    }
    public Optional<List<ToDo>> getToDosByUserId(String userId) {
        return userDal.findUserToDosById(userId).map(User::getToDos);
    }
    public void addToDoByUserId(String  userId, String toDoDesc) {
        User user = userDal.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + userId));

        ToDo newtoDo = new ToDo();
        newtoDo.setDesc(toDoDesc);
        newtoDo.setFinished(false);

        int lastToDoId = user.getToDos().stream()
                .mapToInt(ToDo::getId)
                .max()
                .orElse(0);

        newtoDo.setId(lastToDoId + 1);

        user.getToDos().add(newtoDo);

        userDal.save(user);
    }
    public void updateToDoDesc(String userId, int toDoId, String newDesc) {
        User user = userDal.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + userId));

        ToDo toDo = user.getToDos().stream()
                .filter(m -> m.getId() == toDoId)
                .findFirst()
                .orElseThrow(() -> new ToDoNotFoundException("toDo not found with ID: " + toDoId));

        toDo.setDesc(newDesc);

        userDal.save(user);
    }
    public void deleteToDo(String userId, int toDoId) {
        User user = userDal.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + userId));

        boolean toDoRemoved = user.getToDos().removeIf(toDo -> toDo.getId() == toDoId);

        if (!toDoRemoved) {
            throw new ToDoNotFoundException("toDo not found with ID: " + toDoId);
        }

        userDal.save(user);
    }
    public void toggleToDoStatus(String userId, int toDoId) {
        User user = userDal.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + userId));

        ToDo toDo = user.getToDos().stream()
                .filter(m -> m.getId() == toDoId)
                .findFirst()
                .orElseThrow(() -> new ToDoNotFoundException("toDo not found with ID: " + toDoId));

        toDo.setFinished(!toDo.isFinished());

        userDal.save(user);
    }



}