class Solution {

    public int maxPathSum(TreeNode root) {
        // A path must contain at least one node, so start at -inf, not 0;
        // the array gives the recursive helper a mutable cell.
        long[] best = { Long.MIN_VALUE };
        gain(root, best);
        return (int) best[0];
    }

    // Best path that starts at `node` and descends into at most one child.
    private long gain(TreeNode node, long[] best) {
        if (node == null) {
            return 0;
        }
        // Clamp each child's gain at 0: a negative branch is better left unvisited.
        long left = Math.max(gain(node.left, best), 0);
        long right = Math.max(gain(node.right, best), 0);
        // The path bending through this node is a candidate for the global answer.
        best[0] = Math.max(best[0], (long) node.val + left + right);
        // The parent may only extend the path through one side.
        return node.val + Math.max(left, right);
    }
}
