class Solution {
  public:
    int maxDepth(TreeNode *root) {
        // Loop invariant: `level` holds exactly one level's nodes, so one
        // full round of rebuilding it counts exactly one level of depth.
        int depth = 0;
        vector<TreeNode *> level;
        if (root != nullptr)
            level.push_back(root);
        while (!level.empty()) {
            ++depth;
            // Collect only the real children, so nodes of two levels never
            // mix inside one frontier and a leaf contributes nothing.
            vector<TreeNode *> next;
            for (TreeNode *node : level) {
                if (node->left != nullptr)
                    next.push_back(node->left);
                if (node->right != nullptr)
                    next.push_back(node->right);
            }
            level = next;
        }
        return depth;
    }
};
