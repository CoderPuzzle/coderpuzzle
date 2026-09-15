class Solution {
  public:
    int sumOfLeftLeaves(TreeNode *root) { return collect(root, false); }

  private:
    // Pre-order carrying each node's side: when the walk enters a leaf it
    // already knows whether that leaf is the left child of another node, so
    // its value is settled on the spot and no parent is revisited. The root
    // is nobody's child, so it enters flagged as a right child.
    int collect(TreeNode *node, bool isLeft) {
        if (node == nullptr) {
            return 0;
        }
        // A leaf contributes only when it hangs off a parent's left.
        if (node->left == nullptr && node->right == nullptr) {
            return isLeft ? node->val : 0;
        }
        return collect(node->left, true) + collect(node->right, false);
    }
};
