class Solution {

    public int rob(TreeNode root) {
        int[] best = best(root);
        return Math.max(best[0], best[1]);
    }

    // Returns {take, skip} for the subtree; pairing the two values
    // means each subtree is evaluated exactly once (post-order).
    private int[] best(TreeNode node) {
        if (node == null) {
            return new int[] { 0, 0 };
        }
        int[] left = best(node.left);
        int[] right = best(node.right);
        // Taking here forbids both children: use their skip values.
        int takeHere = node.val + left[1] + right[1];
        // Skipping leaves each child free to do its better option.
        int skipHere = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        return new int[] { takeHere, skipHere };
    }
}
