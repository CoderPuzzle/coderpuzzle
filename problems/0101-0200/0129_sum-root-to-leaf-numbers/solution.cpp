class Solution {
  public:
    int sumNumbers(TreeNode *root) {
        // The node range [1, 1000] guarantees a root, so the walk starts at
        // the first digit with no empty-tree case.
        int total = 0;
        // Loop invariant: the stack holds (node, prefix) pairs where prefix
        // is the number formed by the digits from the root down to (but
        // excluding) `node`; appending node->val extends it by one digit.
        vector<pair<TreeNode *, int>> pending;
        pending.push_back({root, 0});
        while (!pending.empty()) {
            TreeNode *node = pending.back().first;
            int number = pending.back().second * 10 + node->val;
            pending.pop_back();
            if (node->left == nullptr && node->right == nullptr) {
                // The path ends here, so its number is complete and joins
                // the total — the only place a value is ever summed.
                total += number;
            } else {
                // An internal node never sums on its own: its digit only
                // matters inside the numbers of the leaves below it.
                if (node->left != nullptr)
                    pending.push_back({node->left, number});
                if (node->right != nullptr)
                    pending.push_back({node->right, number});
            }
        }
        return total;
    }
};
