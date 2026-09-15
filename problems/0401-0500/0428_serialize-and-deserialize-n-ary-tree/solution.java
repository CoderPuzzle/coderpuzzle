import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public String serialize(Node root) {
        if (root == null) return "[]";
        List<String> tokens = new ArrayList<>();
        tokens.add(Integer.toString(root.val));
        tokens.add("null");
        Deque<Node> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            Node node = queue.poll();
            for (Node child : node.children) {
                tokens.add(Integer.toString(child.val));
                queue.add(child);
            }
            tokens.add("null");
        }
        while (tokens.get(tokens.size() - 1).equals("null")) {
            tokens.remove(tokens.size() - 1);
        }
        return "[" + String.join(",", tokens) + "]";
    }
}
