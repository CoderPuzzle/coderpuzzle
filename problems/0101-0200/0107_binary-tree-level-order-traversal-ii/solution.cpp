class Solution {
  public:
    vector<vector<int>> levelOrderBottom(TreeNode *root) {
        vector<vector<int>> levels;
        queue<TreeNode *> q;
        if (root != nullptr) {
            q.push(root);
        }
        while (!q.empty()) {
            // One round of the outer loop consumes exactly one level: the
            // nodes sitting in the queue when the round starts.
            vector<int> level;
            int remaining = (int)q.size();
            for (int i = 0; i < remaining; ++i) {
                TreeNode *node = q.front();
                q.pop();
                level.push_back(node->val);
                if (node->left != nullptr)
                    q.push(node->left);
                if (node->right != nullptr)
                    q.push(node->right);
            }
            levels.push_back(level);
        }
        // Levels were collected root-first; the statement wants leaf-first.
        reverse(levels.begin(), levels.end());
        return levels;
    }
};
