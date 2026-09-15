class Solution {
  public:
    int goodNodes(TreeNode *root) { return dfs(root, root->val); }

  private:
    // maxSoFar is the largest value on the current root path
    int dfs(TreeNode *node, int maxSoFar) {
        if (node == nullptr) {
            return 0;
        }
        int count = 0;
        // non-strict: a value equal to the path max is still good; raising
        // maxSoFar here means children see the true maximum of their path
        if (node->val >= maxSoFar) {
            count = 1;
            maxSoFar = node->val;
        }
        return count + dfs(node->left, maxSoFar) + dfs(node->right, maxSoFar);
    }
};
