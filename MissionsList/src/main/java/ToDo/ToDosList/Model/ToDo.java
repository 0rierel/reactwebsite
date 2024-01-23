package ToDo.ToDosList.Model;



import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class ToDo {

    private int id;

    private String desc;
    private boolean finished;


    public ToDo() {
    }

    public ToDo(String desc, boolean finished, int id) {
        setDesc(desc);
        setFinished(finished);
        setId(id);

    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }
}
