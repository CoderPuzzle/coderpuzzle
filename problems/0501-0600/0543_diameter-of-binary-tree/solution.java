class Solution {

    public int diameterOfBinaryTree(TreeNode root) {
        int[] diameter = { 0 };
        height(root, diameter);
        return diameter[0];
    }

    private int height(TreeNode node, int[] diameter) {
        if (node == null) {
            return 0;
        }
        int left = height(node.left, diameter);
        int right = height(node.right, diameter);
        // The longest path anchored at this node joins its two subtree
        // heights (in edges); the best anchor may bypass the root, so
        // every node contributes a candidate.
        if (left + right > diameter[0]) {
            diameter[0] = left + right;
        }
        // Return the one-sided height — what the parent's candidate
        // needs, deliberately distinct from the two-sided diameter.
        return 1 + Math.max(left, right);
    }
}
