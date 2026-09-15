class Solution {
  public:
    int rob(TreeNode *root) {
        pair<int, int> best = bestTake(root);
        return max(best.first, best.second);
    }

  private:
    // Returns {best if this node is taken, best if it is skipped};
    // pairing the two values means each subtree is evaluated once.
    pair<int, int> bestTake(TreeNode *node) {
        if (node == nullptr) {
            return {0, 0};
        }
        pair<int, int> left = bestTake(node->left);
        pair<int, int> right = bestTake(node->right);
        // Taking here forbids both children: use their skip values.
        int takeHere = node->val + left.second + right.second;
        // Skipping leaves each child free to do its better option.
        int skipHere = max(left.first, left.second) + max(right.first, right.second);
        return {takeHere, skipHere};
    }
};
