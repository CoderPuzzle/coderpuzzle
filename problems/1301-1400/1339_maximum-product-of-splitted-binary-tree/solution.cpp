class Solution {
  public:
    int maxProduct(TreeNode *root) {
        // Iterative post-order computes every subtree sum; each non-root sum
        // s scores the cut s * (total - s), maximized before the modulo.
        unordered_map<TreeNode *, long long> sums;
        vector<pair<TreeNode *, bool>> stack;
        stack.push_back({root, false});
        while (!stack.empty()) {
            auto [cur, done] = stack.back();
            stack.pop_back();
            if (cur == nullptr) {
                continue;
            }
            if (done) {
                long long left = cur->left ? sums[cur->left] : 0;
                long long right = cur->right ? sums[cur->right] : 0;
                sums[cur] = cur->val + left + right;
            } else {
                stack.push_back({cur, true});
                stack.push_back({cur->left, false});
                stack.push_back({cur->right, false});
            }
        }
        long long total = sums[root];
        long long best = 0;
        for (const auto &[node, part] : sums) {
            if (node != root) {
                best = max(best, part * (total - part));
            }
        }
        return (int)(best % 1000000007LL);
    }
};
