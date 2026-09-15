class Solution {
  public:
    int minimumFlips(TreeNode *root, bool result) {
        if (root == nullptr)
            return 0;
        vector<TreeNode *> order;
        deque<TreeNode *> queue;
        queue.push_back(root);
        while (!queue.empty()) {
            TreeNode *node = queue.front();
            queue.pop_front();
            order.push_back(node);
            if (node->left)
                queue.push_back(node->left);
            if (node->right)
                queue.push_back(node->right);
        }
        int n = (int)order.size();
        unordered_map<TreeNode *, int> idx;
        for (int i = 0; i < n; i++)
            idx[order[i]] = i;
        // t[i] / f[i] = min flips to make subtree i true / false; the pair is
        // the whole DP state, and reverse BFS order finalizes children first
        vector<int> t(n, 0), f(n, 0);
        for (int i = n - 1; i >= 0; i--) {
            TreeNode *node = order[i];
            int v = node->val;
            if (node->left == nullptr && node->right == nullptr) {
                // leaf base: (0, 1) if already true, (1, 0) if already false
                if (v == 1) {
                    t[i] = 0;
                    f[i] = 1;
                } else {
                    t[i] = 1;
                    f[i] = 0;
                }
            } else if (v == 5) {
                // NOT: swap the single child's two costs
                TreeNode *child = node->left ? node->left : node->right;
                int ci = idx[child];
                t[i] = f[ci];
                f[i] = t[ci];
            } else {
                int li = idx[node->left];
                int ri = idx[node->right];
                int lt = t[li], lf = f[li], rt = t[ri], rf = f[ri];
                if (v == 2) {
                    // OR: true if either child is true; false only if both are
                    t[i] = min(lt, rt);
                    f[i] = lf + rf;
                } else if (v == 3) {
                    // AND: mirror of OR - true needs both children true
                    t[i] = lt + rt;
                    f[i] = min(lf, rf);
                } else {
                    // XOR: true when the children differ, false when they match
                    t[i] = min(lt + rf, lf + rt);
                    f[i] = min(lt + rt, lf + rf);
                }
            }
        }
        int rootIdx = idx[root];
        return result ? t[rootIdx] : f[rootIdx];
    }
};
