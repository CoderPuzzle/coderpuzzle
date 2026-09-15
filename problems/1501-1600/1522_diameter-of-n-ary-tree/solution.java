class Solution {

    private int best;

    public int diameter(Node root) {
        if (root == null) return 0;
        // best tracks the widest bend seen anywhere: the two tallest child
        // arms through some node plus the two edges that join them.
        best = 0;
        height(root);
        return best;
    }

    // Returns the node's height -- its longest downward arm in edges --
    // folding the bend through each node into best on the way out.
    private int height(Node node) {
        int first = -1,
            second = -1;
        for (Node child : node.children) {
            int arm = height(child);
            if (arm > first) {
                second = first;
                first = arm;
            } else if (arm > second) {
                second = arm;
            }
        }
        best = Math.max(best, first + second + 2);
        return first + 1;
    }
}
