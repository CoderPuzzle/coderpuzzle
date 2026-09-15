class Solution {

    private int count = 0;

    public int countUnivalSubtrees(TreeNode root) {
        count = 0;
        isUnival(root);
        return count;
    }

    // Post-order: each call reports whether the subtree rooted at `node` is
    // uni-value; every true is one more subtree for the count.
    private boolean isUnival(TreeNode node) {
        // The empty tree is vacuously uni-value: an absent child never breaks
        // its parent. It is never counted, so root == null yields 0.
        if (node == null) {
            return true;
        }
        // Visit both children unconditionally: counting happens inside the
        // recursion, and a skipped branch would skip its own subtrees.
        boolean left = isUnival(node.left);
        boolean right = isUnival(node.right);
        boolean uni =
            left &&
            right &&
            (node.left == null || node.left.val == node.val) &&
            (node.right == null || node.right.val == node.val);
        if (uni) {
            count++;
        }
        return uni;
    }
}
