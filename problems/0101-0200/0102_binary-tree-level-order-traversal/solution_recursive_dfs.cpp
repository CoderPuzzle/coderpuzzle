class Solution {
  public:
    vector<vector<int>> levelOrder(TreeNode *root) {
        // One list per depth, appended to the first time the walk reaches
        // that depth; afterwards it already exists for every later arrival.
        vector<vector<int>> grouped;
        visit(root, 0, grouped);
        return grouped;
    }

  private:
    // Pre-order: record the value before descending, so arrivals at each
    // depth happen left to right.
    void visit(TreeNode *node, int depth, vector<vector<int>> &grouped) {
        if (node == nullptr) {
            return;
        }
        if ((int)grouped.size() == depth) {
            grouped.push_back({});
        }
        grouped[depth].push_back(node->val);
        visit(node->left, depth + 1, grouped);
        visit(node->right, depth + 1, grouped);
    }
};
