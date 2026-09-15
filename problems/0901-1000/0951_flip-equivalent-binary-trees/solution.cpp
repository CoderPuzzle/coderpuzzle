class Solution {
  public:
    bool flipEquiv(TreeNode *root1, TreeNode *root2) {
        // Flip equivalence is a question of pairing: some way of walking
        // the trees together, committing at each paired node to the
        // straight or the swapped alignment of children, must run out of
        // nodes without a disagreement. The stack carries the pairs.
        vector<pair<TreeNode *, TreeNode *>> pending{{root1, root2}};
        while (!pending.empty()) {
            auto [a, b] = pending.back();
            pending.pop_back();
            if (a == nullptr && b == nullptr)
                continue;
            if (a == nullptr || b == nullptr || a->val != b->val)
                return false;
            if (aligned(a->left, b->left) && aligned(a->right, b->right)) {
                pending.push_back({a->left, b->left});
                pending.push_back({a->right, b->right});
            } else if (aligned(a->left, b->right) && aligned(a->right, b->left)) {
                pending.push_back({a->left, b->right});
                pending.push_back({a->right, b->left});
            } else {
                return false;
            }
        }
        return true;
    }

  private:
    // Values are unique within each tree, which is what makes the
    // commitment above exhaustive: both alignments can line up at a node
    // only when they coincide, so testing the straight one first and
    // falling back to the swapped one covers every flip choice.
    bool aligned(TreeNode *a, TreeNode *b) {
        if (a == nullptr || b == nullptr)
            return a == b;
        return a->val == b->val;
    }
};
