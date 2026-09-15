import java.util.ArrayList;
import java.util.List;

class Employee {

    public int id;
    public int importance;
    public List<Integer> subordinates;

    public Employee() {
        id = 0;
        importance = 0;
        subordinates = new ArrayList<>();
    }

    public Employee(int id, int importance, List<Integer> subordinates) {
        this.id = id;
        this.importance = importance;
        this.subordinates = subordinates;
    }
}
