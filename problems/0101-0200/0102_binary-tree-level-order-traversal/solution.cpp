class Solution {
  public:
    vector<vector<int>> levelOrder(TreeNode *root) {
        // Handle the empty tree up front, before the queue exists.
        if (root == nullptr) {
            return {};
        }
        vector<vector<int>> result;
        queue<TreeNode *> q;
        q.push(root);
        // Loop invariant: at the top of each round the queue holds exactly
        // one level's nodes and nothing else.
        while (!q.empty()) {
            // Snapshot the size now: children enqueued below belong to the
            // NEXT level, so draining exactly `size` nodes keeps levels
            // separated without any sentinel markers.
            int size = static_cast<int>(q.size());
            vector<int> level;
            level.reserve(size);
            for (int i = 0; i < size; i++) {
                TreeNode *node = q.front();
                q.pop();
                level.push_back(node->val);
                // Skipping null children on enqueue keeps the invariant;
                // left-then-right order preserves reading order.
                if (node->left != nullptr) {
                    q.push(node->left);
                }
                if (node->right != nullptr) {
                    q.push(node->right);
                }
            }
            result.push_back(std::move(level));
        }
        return result;
    }
};
