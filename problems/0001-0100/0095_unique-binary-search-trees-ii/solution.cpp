class Solution {
  public:
    vector<TreeNode *> generateTrees(int n) { return build(1, n); }

  private:
    vector<TreeNode *> build(int lo, int hi) {
        // An empty range still offers one choice: the null subtree.
        if (lo > hi)
            return {nullptr};
        vector<TreeNode *> trees;
        for (int root = lo; root <= hi; ++root) {
            vector<TreeNode *> lefts = build(lo, root - 1);
            vector<TreeNode *> rights = build(root + 1, hi);
            // Left choices vary slower than right choices, so the loop
            // nesting emits the trees in the order the statement pins.
            for (TreeNode *left : lefts) {
                for (TreeNode *right : rights) {
                    TreeNode *node = new TreeNode(root);
                    node->left = left;
                    node->right = right;
                    trees.push_back(node);
                }
            }
        }
        return trees;
    }
};
