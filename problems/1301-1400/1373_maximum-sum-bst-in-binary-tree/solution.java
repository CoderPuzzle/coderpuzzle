class Solution {

    private long best;

    public long maxSumBST(TreeNode root) {
        best = 0;
        dfs(root);
        return best;
    }

    // null = not a BST; else {min, max, sum}; an empty subtree yields
    // {Long.MAX_VALUE, Long.MIN_VALUE, 0}.
    private long[] dfs(TreeNode node) {
        if (node == null) {
            return new long[] { Long.MAX_VALUE, Long.MIN_VALUE, 0 };
        }
        long[] left = dfs(node.left);
        long[] right = dfs(node.right);
        if (left == null || right == null) {
            return null;
        }
        long v = node.val;
        if (left[1] >= v || right[0] <= v) {
            return null;
        }
        long sum = left[2] + right[2] + v;
        if (sum > best) {
            best = sum;
        }
        return new long[] { Math.min(left[0], v), Math.max(right[1], v), sum };
    }
}
