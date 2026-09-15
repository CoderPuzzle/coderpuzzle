class Solution {
  public:
    TreeNode *flatten(TreeNode *root) {
        TreeNode *node = root;
        // Loop invariant: every node already passed hangs on a single right
        // spine — the flattened pre-order prefix, all left pointers null —
        // so `node` is always the next pre-order node awaiting its splice.
        while (node != nullptr) {
            if (node->left != nullptr) {
                // The rightmost node of the left subtree ends that subtree's
                // pre-order, so it is the last node visited before the old
                // right subtree: let it adopt that subtree, then swing the
                // whole left subtree across to the right.
                TreeNode *tail = node->left;
                while (tail->right != nullptr) {
                    tail = tail->right;
                }
                tail->right = node->right;
                node->right = node->left;
                node->left = nullptr;
            }
            node = node->right;
        }
        return root;
    }
};
