class Solution {
  public:
    int minDepth(TreeNode *root) {
        // Loop invariant: `frontier` holds exactly one level's nodes, and
        // every node above them is internal, so the first leaf met in
        // level order sits at the minimum depth.
        if (root == nullptr)
            return 0;
        int depth = 0;
        vector<TreeNode *> frontier;
        frontier.push_back(root);
        while (!frontier.empty()) {
            ++depth;
            vector<TreeNode *> next;
            for (TreeNode *node : frontier) {
                if (node->left == nullptr && node->right == nullptr) {
                    // A leaf at this depth ends the search: BFS never
                    // visits below the minimum depth, which is the point.
                    return depth;
                }
                if (node->left != nullptr)
                    next.push_back(node->left);
                if (node->right != nullptr)
                    next.push_back(node->right);
            }
            frontier = next;
        }
        return depth;
    }
};
