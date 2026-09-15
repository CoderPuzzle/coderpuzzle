class Solution {
  public:
    int heightOfTree(TreeNode *root) {
        if (root == nullptr)
            return 0;
        return height(root);
    }

  private:
    // A leaf of the special tree is the one node the display cannot mark:
    // the ring gives every leaf both children, and the previous leaf's
    // right child points back at the leaf itself.
    static bool isLeaf(TreeNode *node) { return node->left != nullptr && node->left->right == node; }

    // Returns the subtree's height -- its longest downward path in edges
    // -- stopping at the ring-wired leaves.
    static int height(TreeNode *node) {
        if (node == nullptr || isLeaf(node))
            return 0;
        int left = node->left != nullptr ? height(node->left) : 0;
        int right = node->right != nullptr ? height(node->right) : 0;
        return 1 + max(left, right);
    }
};
