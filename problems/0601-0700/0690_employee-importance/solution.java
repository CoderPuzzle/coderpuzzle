import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int getImportance(List<Employee> employees, int id) {
        Map<Integer, Employee> byId = new HashMap<>();
        for (Employee employee : employees) byId.put(employee.id, employee);
        int total = 0;
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(id);
        while (!stack.isEmpty()) {
            Employee employee = byId.get(stack.pop());
            total += employee.importance;
            for (int subordinate : employee.subordinates) stack.push(subordinate);
        }
        return total;
    }
}
