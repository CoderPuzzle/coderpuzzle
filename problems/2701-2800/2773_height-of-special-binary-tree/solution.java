class Solution {

    public int heightOfTree(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return height(root);
    }

    // A leaf of the special tree is the one node the display cannot mark:
    // the ring gives every leaf both children, and the previous leaf's
    // right child points back at the leaf itself.
    private boolean isLeaf(TreeNode node) {
        return node.left != null && node.left.right == node;
    }

    // Returns the subtree's height -- its longest downward path in edges
    // -- stopping at the ring-wired leaves.
    private int height(TreeNode node) {
        if (node == null || isLeaf(node)) {
            return 0;
        }
        int left = node.left != null ? height(node.left) : 0;
        int right = node.right != null ? height(node.right) : 0;
        return 1 + Math.max(left, right);
    }
}
