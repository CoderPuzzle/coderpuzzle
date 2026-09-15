class Solution {
    pair<int, int> go(TreeNode *n) {
        if (!n)
            return {-1, 0};
        auto a = go(n->left), b = go(n->right);
        int m = max(n->val, max(a.first, b.first));
        return {m, a.second + b.second + (n->val == m)};
    }

  public:
    int countDominantNodes(TreeNode *root) { return go(root).second; }
};
