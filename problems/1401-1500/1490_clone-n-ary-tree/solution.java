import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public Node cloneTree(Node root) {
        if (root == null) {
            return null;
        }
        // Level-order copy: every original node gets exactly one fresh
        // clone, and the registry records which clone belongs to it, so
        // each original child link is replayed through the registry.
        Map<Node, Node> clones = new HashMap<>();
        clones.put(root, new Node(root.val, new ArrayList<>()));
        Deque<Node> queue = new ArrayDeque<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            Node node = queue.poll();
            for (Node child : node.children) {
                clones.put(child, new Node(child.val, new ArrayList<>()));
                clones.get(node).children.add(clones.get(child));
                queue.offer(child);
            }
        }
        return clones.get(root);
    }
}
