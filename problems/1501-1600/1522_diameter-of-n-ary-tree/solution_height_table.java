import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int diameter(Node root) {
        if (root == null) return 0;

        // Pass one: every node's height -- its longest downward arm in
        // edges -- materialized into a table keyed by the node.
        Map<Node, Integer> height = new HashMap<>();
        measure(root, height);

        // Pass two: the widest bend at each node pairs its two tallest
        // child arms; absent arms read -1, so a leaf scores 0.
        int best = 0;
        Deque<Node> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            Node node = stack.pop();
            int first = -1,
                second = -1;
            for (Node child : node.children) {
                stack.push(child);
                int arm = height.get(child);
                if (arm > first) {
                    second = first;
                    first = arm;
                } else if (arm > second) {
                    second = arm;
                }
            }
            best = Math.max(best, first + second + 2);
        }
        return best;
    }

    private int measure(Node node, Map<Node, Integer> height) {
        int tallest = -1;
        for (Node child : node.children) {
            tallest = Math.max(tallest, measure(child, height));
        }
        height.put(node, tallest + 1);
        return tallest + 1;
    }
}
