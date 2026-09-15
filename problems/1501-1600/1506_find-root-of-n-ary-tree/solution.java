import java.util.List;

class Solution {

    public Node findRoot(List<Node> tree) {
        // Value cancellation: every non-root appears exactly once as
        // someone's child, so summing every node's value and subtracting
        // every child's value cancels everything except the root's value.
        // A second scan turns that surviving value back into its node — no
        // extra collection is kept at any point. The running total spans
        // 5·10⁴ int values, so it accumulates in a long.
        long total = 0;
        for (Node node : tree) {
            total += node.val;
            for (Node child : node.children) {
                total -= child.val;
            }
        }
        for (Node node : tree) {
            if (node.val == total) {
                return node;
            }
        }
        return null;
    }
}
