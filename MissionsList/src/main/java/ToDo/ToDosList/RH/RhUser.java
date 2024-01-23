package ToDo.ToDosList.RH;

import ToDo.ToDosList.Model.ToDo;
import ToDo.ToDosList.Model.UserDTO;
import ToDo.ToDosList.bl.UserBl;
import ToDo.ToDosList.customsErrors.ToDoNotFoundException;

import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;



@CrossOrigin(origins = "*",allowedHeaders = "*")
@RequestMapping("/users")
@RestController
public class RhUser {

    @Autowired
    private UserBl userBl;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        try {
            List<UserDTO> users = userBl.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{userId}/ToDos")
    public ResponseEntity<List<ToDo>> getToDosByUserId(@PathVariable String userId) {
        try {
            Optional<List<ToDo>> toDos = userBl.getToDosByUserId(userId);

            return toDos.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/{userId}/ToDos")
    public ResponseEntity<String> addToDoByUserId(
            @PathVariable String  userId,
            @RequestBody JsonNode JsonDesc
    ) {
        try {
            userBl.addToDoByUserId(userId, JsonDesc.get("desc").asText());
            return new ResponseEntity<>("ToDo added successfully", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("User not found with ID: " + userId, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding ToDo", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PatchMapping("/{userId}/ToDos/{toDoId}")
    public ResponseEntity<String> updateToDoDesc(
            @PathVariable String userId,
            @PathVariable int toDoId,
            @RequestParam String newDesc
    ) {
        try {
            userBl.updateToDoDesc(userId, toDoId, newDesc);
            return new ResponseEntity<>("ToDo description updated successfully", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("User not found with ID: " + userId, HttpStatus.NOT_FOUND);
        } catch (ToDoNotFoundException e) {
            return new ResponseEntity<>("ToDo not found with ID: " + toDoId, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating ToDo description", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/{userId}/ToDos/{toDoId}")
    public ResponseEntity<String> deleteToDo(
            @PathVariable String userId,
            @PathVariable int toDoId
    ) {
        try {
            userBl.deleteToDo(userId, toDoId);
            return new ResponseEntity<>("ToDo deleted successfully", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("User not found with ID: " + userId, HttpStatus.NOT_FOUND);
        } catch (ToDoNotFoundException e) {
            return new ResponseEntity<>("ToDo not found with ID: " + toDoId, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting ToDo", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PatchMapping("/{userId}/ToDos/{toDoId}/toggle")
    public ResponseEntity<String> toggleToDoStatus(
            @PathVariable String userId,
            @PathVariable int toDoId
    ) {
        try {
            userBl.toggleToDoStatus(userId, toDoId);
            return new ResponseEntity<>("ToDo status toggled successfully", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("User not found with ID: " + userId, HttpStatus.NOT_FOUND);
        } catch (ToDoNotFoundException e) {
            return new ResponseEntity<>("ToDo not found with ID: " + toDoId, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error toggling ToDo status", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
