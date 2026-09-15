class Solution {
  public:
    TreeNode *bstToGst(TreeNode *root) {
        // Running sum of every value the reverse in-order has visited.
        int total = 0;
        reverseInorder(root, total);
        return root;
    }

  private:
    void reverseInorder(TreeNode *current, int &total) {
        if (current == nullptr) {
            return;
        }
        // Right subtree first: reversed in-order walks keys largest to smallest.
        reverseInorder(current->right, total);
        // On arrival every strictly greater key is already in `total`, so
        // the overwrite yields this key plus the sum of all greater keys.
        total += current->val;
        current->val = total;
        // Left subtree sees the accumulated total of all larger values.
        reverseInorder(current->left, total);
    }
};
