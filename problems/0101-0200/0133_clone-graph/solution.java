import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public GraphNode cloneGraph(GraphNode node) {
        if (node == null) return null;
        Map<GraphNode, GraphNode> clones = new HashMap<>();
        clones.put(node, new GraphNode(node.val));
        Deque<GraphNode> stack = new ArrayDeque<>();
        stack.push(node);
        while (!stack.isEmpty()) {
            GraphNode current = stack.pop();
            for (GraphNode neighbor : current.neighbors) {
                if (!clones.containsKey(neighbor)) {
                    clones.put(neighbor, new GraphNode(neighbor.val));
                    stack.push(neighbor);
                }
                clones.get(current).neighbors.add(clones.get(neighbor));
            }
        }
        return clones.get(node);
    }
}
