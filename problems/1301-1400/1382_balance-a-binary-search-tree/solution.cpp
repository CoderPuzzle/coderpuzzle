class Solution {
  public:
    TreeNode *balanceBST(TreeNode *root) {
        // phase 1: iterative in-order walk flattens the BST into sorted
        // values (explicit stack dodges recursion limits on chain inputs)
        vector<int> values;
        vector<TreeNode *> stack;
        TreeNode *current = root;
        while (!stack.empty() || current != nullptr) {
            while (current != nullptr) {
                stack.push_back(current);
                current = current->left;
            }
            current = stack.back();
            stack.pop_back();
            values.push_back(current->val);
            current = current->right;
        }
        return build(values, 0, static_cast<int>(values.size()) - 1);
    }

  private:
    // midpoint as root leaves at most half the range per side, so subtree
    // depths differ by <= 1 (build recursion is O(log n) deep)
    TreeNode *build(vector<int> &values, int lo, int hi) {
        if (lo > hi) {
            return nullptr;
        }
        int mid = lo + (hi - lo) / 2;
        TreeNode *node = new TreeNode(values[mid]);
        node->left = build(values, lo, mid - 1);
        node->right = build(values, mid + 1, hi);
        return node;
    }
};
