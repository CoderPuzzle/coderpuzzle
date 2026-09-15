class Solution {
  public:
    int rob(TreeNode *root) {
        pair<int, int> best = bestRob(root);
        return max(best.first, best.second);
    }

  private:
    // Returns {best if this node is robbed, best if it is skipped};
    // pairing the two values means each subtree is evaluated once.
    pair<int, int> bestRob(TreeNode *node) {
        if (node == nullptr) {
            return {0, 0};
        }
        pair<int, int> left = bestRob(node->left);
        pair<int, int> right = bestRob(node->right);
        // Robbing here forbids both children: take their skip values.
        int robHere = node->val + left.second + right.second;
        // Skipping leaves each child free to do its better option.
        int skipHere = max(left.first, left.second) + max(right.first, right.second);
        return {robHere, skipHere};
    }
};
