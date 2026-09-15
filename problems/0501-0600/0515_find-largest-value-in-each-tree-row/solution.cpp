class Solution {
  public:
    vector<int> largestValues(TreeNode *root) {
        vector<int> largest;
        queue<TreeNode *> q;
        if (root != nullptr) {
            q.push(root);
        }
        while (!q.empty()) {
            // One round drains exactly one level: the nodes sitting in the
            // queue when the round starts. A level always holds at least one
            // node, so its first value seeds the running maximum — no
            // sentinel, which matters when a whole row sits at -2^31.
            int best = q.front()->val;
            int remaining = (int)q.size();
            for (int i = 0; i < remaining; ++i) {
                TreeNode *node = q.front();
                q.pop();
                if (node->val > best) {
                    best = node->val;
                }
                if (node->left != nullptr)
                    q.push(node->left);
                if (node->right != nullptr)
                    q.push(node->right);
            }
            largest.push_back(best);
        }
        return largest;
    }
};
