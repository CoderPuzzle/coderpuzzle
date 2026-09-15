import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class ThroneInheritance {

    // An n-ary tree keyed by name: children maps a name to its kids in
    // birth order, and dead holds everyone marked deceased. king is
    // remembered as the traversal root.
    private final String king;
    private final Map<String, List<String>> children = new HashMap<>();
    private final Set<String> dead = new HashSet<>();

    public ThroneInheritance(String kingName) {
        king = kingName;
        children.put(kingName, new ArrayList<>());
    }

    public void birth(String parentName, String childName) {
        children.get(parentName).add(childName);
        children.put(childName, new ArrayList<>());
    }

    public void death(String name) {
        dead.add(name);
    }

    public String[] getInheritanceOrder() {
        // Iterative pre-order DFS (explicit stack, so depth never risks
        // the call stack — the tree can chain up to 1e5 generations
        // deep). Children go on the stack in reverse so the oldest child
        // is popped, and therefore visited, first.
        List<String> order = new ArrayList<>();
        Deque<String> stack = new ArrayDeque<>();
        stack.push(king);
        while (!stack.isEmpty()) {
            String name = stack.pop();
            if (!dead.contains(name)) {
                order.add(name);
            }
            List<String> kids = children.get(name);
            for (int i = kids.size() - 1; i >= 0; i--) {
                stack.push(kids.get(i));
            }
        }
        return order.toArray(new String[0]);
    }
}
