class Solution {
  public:
    vector<int> rightSideView(TreeNode *root) {
        vector<int> view;
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
            // A level was collected left to right, so its last value is the
            // one the right side sees.
            view.push_back(level.back());
        }
        return view;
    }
};
