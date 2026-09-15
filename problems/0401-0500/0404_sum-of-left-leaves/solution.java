class Solution {

    public int sumOfLeftLeaves(TreeNode root) {
        return collect(root, false);
    }

    // Pre-order carrying each node's side: when the walk enters a leaf it
    // already knows whether that leaf is the left child of another node, so
    // its value is settled on the spot and no parent is revisited. The root
    // is nobody's child, so it enters flagged as a right child.
    private int collect(TreeNode node, boolean isLeft) {
        if (node == null) {
            return 0;
        }
        // A leaf contributes only when it hangs off a parent's left.
        if (node.left == null && node.right == null) {
            return isLeft ? node.val : 0;
        }
        return collect(node.left, true) + collect(node.right, false);
    }
}
