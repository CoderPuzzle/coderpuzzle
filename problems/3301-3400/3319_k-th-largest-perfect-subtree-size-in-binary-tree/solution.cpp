class Solution {
  public:
    int kthLargestPerfectSubtree(TreeNode *root, int k) {
        // One BFS pass records the nodes; walking that vector backwards
        // visits children before parents, so sizes propagate bottom-up
        // with no recursion — a chain can run 2000 nodes deep. info
        // holds the subtree size when the subtree is perfect, else 0: a
        // perfect internal node needs both children perfect with equal
        // sizes, and a leaf is perfect with size 1.
        vector<TreeNode *> order;
        order.push_back(root);
        for (int i = 0; i < (int)order.size(); ++i) {
            if (order[i]->left)
                order.push_back(order[i]->left);
            if (order[i]->right)
                order.push_back(order[i]->right);
        }
        unordered_map<TreeNode *, int> info;
        vector<int> sizes;
        for (int i = (int)order.size() - 1; i >= 0; --i) {
            TreeNode *node = order[i];
            if (!node->left && !node->right) {
                info[node] = 1;
            } else if (node->left && node->right) {
                int left = info[node->left];
                int right = info[node->right];
                info[node] = left > 0 && left == right ? 1 + left + right : 0;
            } else {
                info[node] = 0;
            }
            if (info[node] > 0)
                sizes.push_back(info[node]);
        }
        sort(sizes.begin(), sizes.end(), greater<int>());
        return k <= (int)sizes.size() ? sizes[k - 1] : -1;
    }
};
