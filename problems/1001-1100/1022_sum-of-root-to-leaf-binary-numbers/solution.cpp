class Solution {
  public:
    int sumRootToLeaf(TreeNode *root) {
        // The node range [1, 1000] guarantees a root, so the walk starts at
        // the first bit with no empty-tree case. The running value and the
        // total are carried in `long long` rather than `int`: nothing in
        // the statement caps how deep a path runs before it must fit the
        // promised 32-bit answer, so a wide accumulator removes any risk
        // of intermediate overflow while a long prefix is still being
        // walked.
        long long total = 0;
        // Loop invariant: the stack holds (node, running) pairs where
        // running is the value formed by the bits from the root down to
        // (but excluding) `node`; appending node->val extends it by one
        // bit.
        vector<pair<TreeNode *, long long>> pending;
        pending.push_back({root, 0});
        while (!pending.empty()) {
            TreeNode *node = pending.back().first;
            long long value = pending.back().second * 2 + node->val;
            pending.pop_back();
            if (node->left == nullptr && node->right == nullptr) {
                // The path ends here, so its value is complete and joins
                // the total — the only place a value is ever summed.
                total += value;
            } else {
                // An internal node never sums on its own: its bit only
                // matters inside the values of the leaves below it.
                if (node->left != nullptr)
                    pending.push_back({node->left, value});
                if (node->right != nullptr)
                    pending.push_back({node->right, value});
            }
        }
        // The statement guarantees the answer fits a 32-bit integer.
        return static_cast<int>(total);
    }
};
