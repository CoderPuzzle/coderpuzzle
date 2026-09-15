class Solution {
  public:
    vector<double> averageOfLevels(TreeNode *root) {
        vector<double> averages;
        queue<TreeNode *> q;
        if (root != nullptr) {
            q.push(root);
        }
        while (!q.empty()) {
            // One round drains exactly one level: the nodes sitting in the
            // queue when the round starts. Children appended during the round
            // belong to the next level, and the count is fixed up front. The
            // sum runs in long long — 10^4 values of magnitude 2^31 stay far
            // inside it — so the only rounding anywhere is the single
            // division that closes the round.
            long long total = 0;
            int remaining = (int)q.size();
            for (int i = 0; i < remaining; ++i) {
                TreeNode *node = q.front();
                q.pop();
                total += node->val;
                if (node->left != nullptr)
                    q.push(node->left);
                if (node->right != nullptr)
                    q.push(node->right);
            }
            averages.push_back((double)total / remaining);
        }
        return averages;
    }
};
