class Solution {
  public:
    int maxLevelSum(TreeNode *root) {
        vector<TreeNode *> frontier{root};
        int best_level = 1;
        // Level sums reach 1e9 at the constraint limits: 64-bit accumulator.
        long long best_sum = root->val;
        int level = 1;
        while (!frontier.empty()) {
            long long total = 0;
            for (TreeNode *node : frontier)
                total += node->val;
            // Strict > keeps the SMALLEST level on ties.
            if (total > best_sum) {
                best_sum = total;
                best_level = level;
            }
            vector<TreeNode *> next;
            for (TreeNode *node : frontier) {
                if (node->left != nullptr)
                    next.push_back(node->left);
                if (node->right != nullptr)
                    next.push_back(node->right);
            }
            frontier = move(next);
            level++;
        }
        return best_level;
    }
};
