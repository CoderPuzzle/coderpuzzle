class Solution {

    public int kthSmallest(TreeNode root, int k) {
        // In-order traversal of a BST visits values in ascending order, so
        // the kth visit is the kth smallest. k travels as state[0] and is
        // counted down; state[1] records the kth visit's value.
        int[] state = { k, -1 };
        // Recursion depth is bounded by the tree height h (worst case n on
        // a chain), which is why the iterative twin exists.
        inorder(root, state);
        return state[1];
    }

    private void inorder(TreeNode node, int[] state) {
        // Early stop: once the answer is recorded, the unvisited remainder
        // of the tree is never touched.
        if (node == null || state[0] == 0) return;
        inorder(node.left, state);
        state[0]--;
        if (state[0] == 0) {
            state[1] = node.val;
            return;
        }
        inorder(node.right, state);
    }
}
