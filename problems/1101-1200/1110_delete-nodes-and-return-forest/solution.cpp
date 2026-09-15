class Solution {
  public:
    vector<TreeNode *> delNodes(TreeNode *root, vector<int> &to_delete) {
        unordered_set<int> deleted(to_delete.begin(), to_delete.end());
        vector<TreeNode *> forest;
        TreeNode *remaining = dfs(root, deleted, forest);
        // The one surviving root no deletion created is the original root.
        if (remaining != nullptr)
            forest.push_back(remaining);
        return forest;
    }

  private:
    TreeNode *dfs(TreeNode *node, unordered_set<int> &deleted, vector<TreeNode *> &forest) {
        if (node == nullptr)
            return nullptr;
        // Recurse into both children first; the pruned results reattach
        // below, so deletions deep in the tree are already settled.
        node->left = dfs(node->left, deleted, forest);
        node->right = dfs(node->right, deleted, forest);
        if (deleted.count(node->val)) {
            // This node vanishes; whichever children survived are cut
            // loose here and become new tree roots.
            if (node->left != nullptr)
                forest.push_back(node->left);
            if (node->right != nullptr)
                forest.push_back(node->right);
            return nullptr;
        }
        return node;
    }
};
