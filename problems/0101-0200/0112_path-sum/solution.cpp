class Solution {
  public:
    bool hasPathSum(TreeNode *root, int targetSum) {
        // The empty tree has no root-to-leaf path at all, so no
        // targetSum — not even 0 — can be matched.
        if (root == nullptr)
            return false;
        // Loop invariant: the stack holds (node, remaining) pairs where
        // remaining is targetSum minus the sum of the values strictly
        // above `node`, so a leaf settles its whole path in one compare.
        vector<pair<TreeNode *, int>> pending;
        pending.push_back({root, targetSum});
        while (!pending.empty()) {
            TreeNode *node = pending.back().first;
            int rest = pending.back().second;
            pending.pop_back();
            if (node->left == nullptr && node->right == nullptr) {
                // The path ends here, so it qualifies exactly when the
                // leaf itself covers what is still owed.
                if (rest == node->val)
                    return true;
            } else {
                // An internal node never decides: only leaves can match,
                // even when the running sum already equals targetSum.
                if (node->left != nullptr)
                    pending.push_back({node->left, rest - node->val});
                if (node->right != nullptr)
                    pending.push_back({node->right, rest - node->val});
            }
        }
        return false;
    }
};
