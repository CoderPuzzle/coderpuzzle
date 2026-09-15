class Solution {
  public:
    double maximumAverageSubtree(TreeNode *root) {
        // Pre-order listing: each descendant appears after its ancestor, so
        // the reversed list settles both subtrees before the node above them.
        vector<TreeNode *> order;
        vector<TreeNode *> stack;
        if (root != nullptr)
            stack.push_back(root);
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            order.push_back(node);
            // Push right first so left is visited first in the listing.
            if (node->right != nullptr)
                stack.push_back(node->right);
            if (node->left != nullptr)
                stack.push_back(node->left);
        }
        // 64-bit sums: 1e4 nodes of value 1e5 reach 1e9, past int range.
        unordered_map<TreeNode *, pair<long long, long long>> aggregate;
        double best = 0.0;
        for (int i = (int)order.size() - 1; i >= 0; --i) {
            TreeNode *node = order[i];
            long long total = node->val;
            long long size = 1;
            if (node->left != nullptr) {
                total += aggregate[node->left].first;
                size += aggregate[node->left].second;
            }
            if (node->right != nullptr) {
                total += aggregate[node->right].first;
                size += aggregate[node->right].second;
            }
            aggregate[node] = {total, size};
            best = max(best, (double)total / (double)size);
        }
        return best;
    }
};
