package ToDo.ToDosList.dal;

import ToDo.ToDosList.Model.User;
import ToDo.ToDosList.Model.UserDTO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserDal extends MongoRepository<User, String> {
    @Query(value = "{}", fields = "{ 'id': 1, 'name': 1}")
    List<UserDTO> findAllProjectedByIdAndName();

    @Query(value = "{'_id': ?0}", fields = "{'toDos': 1}")
    Optional<User> findUserToDosById(String userId);

}