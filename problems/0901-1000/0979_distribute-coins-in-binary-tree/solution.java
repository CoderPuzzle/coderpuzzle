class Solution {

    public int distributeCoins(TreeNode root) {
        int[] moves = { 0 };
        dfs(root, moves);
        return moves[0];
    }

    // Returns the net coin flow out of this subtree.
    private int dfs(TreeNode node, int[] moves) {
        if (node == null) {
            return 0;
        }
        int left = dfs(node.left, moves);
        int right = dfs(node.right, moves);
        // Each |excess| is the flow on that child edge; flows on separate
        // edges never interfere, so summing them is the total moves.
        moves[0] += Math.abs(left) + Math.abs(right);
        // Keep one coin for this node; the rest is the parent-bound flow.
        return node.val + left + right - 1;
    }
}
