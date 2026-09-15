class Solution {
  public:
    vector<vector<int>> zigzagLevelOrder(TreeNode *root) {
        vector<vector<int>> result;
        if (root == nullptr)
            return result;
        queue<TreeNode *> queue;
        queue.push(root);
        // Loop invariant: `queue` holds the part of the current level not yet
        // drained, followed by the next level's nodes gathered so far, left
        // to right; `leftToRight` says which way the level is emitted.
        bool leftToRight = true;
        while (!queue.empty()) {
            vector<int> level;
            // Drain exactly the level's worth of nodes before emitting, so
            // children pushed meanwhile cannot leak into this level.
            for (size_t remaining = queue.size(); remaining > 0; --remaining) {
                TreeNode *node = queue.front();
                queue.pop();
                level.push_back(node->val);
                if (node->left != nullptr)
                    queue.push(node->left);
                if (node->right != nullptr)
                    queue.push(node->right);
            }
            if (!leftToRight) {
                // Collected left to right, so reversing yields right to left.
                reverse(level.begin(), level.end());
            }
            result.push_back(move(level));
            leftToRight = !leftToRight;
        }
        return result;
    }
};
