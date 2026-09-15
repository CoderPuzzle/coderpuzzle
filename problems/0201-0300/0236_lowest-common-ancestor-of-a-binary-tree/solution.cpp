class Solution {
  public:
    // Both targets exist and are distinct, so the root call always yields
    // a node whose value is the answer.
    int lowestCommonAncestor(TreeNode *root, int p, int q) { return find(root, p, q)->val; }

  private:
    // find answers a narrower question per subtree: does it hold p or q?
    // It returns the found target node itself, or null if neither is there.
    TreeNode *find(TreeNode *node, int p, int q) {
        // A node counts as a descendant of itself, so a value match is
        // itself a successful find and we return immediately.
        if (node == nullptr || node->val == p || node->val == q) {
            return node;
        }
        TreeNode *left = find(node->left, p, q);
        TreeNode *right = find(node->right, p, q);
        // Each side found a target: they meet at this node for the first
        // time — everything below saw at most one — so this is the LCA.
        if (left && right) {
            return node;
        }
        // Otherwise propagate the lone non-null sighting upward.
        return left ? left : right;
    }
};
