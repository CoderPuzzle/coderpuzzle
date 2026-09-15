class Solution {
  public:
    int maxPathSum(TreeNode *root) {
        // A path must contain at least one node, so start at -inf, not 0.
        long long best = numeric_limits<long long>::min();
        gain(root, best);
        return (int)best;
    }

  private:
    // Best path that starts at `node` and descends into at most one child.
    long long gain(TreeNode *node, long long &best) {
        if (node == nullptr) {
            return 0;
        }
        // Clamp each child's gain at 0: a negative branch is better left unvisited.
        long long left = max(gain(node->left, best), 0LL);
        long long right = max(gain(node->right, best), 0LL);
        // The path bending through this node is a candidate for the global answer.
        best = max(best, (long long)node->val + left + right);
        // The parent may only extend the path through one side.
        return node->val + max(left, right);
    }
};
