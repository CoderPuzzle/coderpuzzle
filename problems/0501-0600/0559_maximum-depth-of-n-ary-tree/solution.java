import java.util.ArrayList;
import java.util.List;

class Solution {

    public int maxDepth(Node root) {
        if (root == null) return 0;
        int depth = 0;
        List<Node> level = new ArrayList<>();
        level.add(root);
        while (!level.isEmpty()) {
            depth += 1;
            List<Node> next = new ArrayList<>();
            for (Node node : level) {
                next.addAll(node.children);
            }
            level = next;
        }
        return depth;
    }
}
