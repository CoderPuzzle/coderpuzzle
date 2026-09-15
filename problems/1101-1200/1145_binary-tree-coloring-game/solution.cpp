class Solution {
  public:
    bool btreeGameWinningMove(TreeNode *root, int n, int x) {
        TreeNode *target = find(root, x);
        int left = count(target->left);
        int right = count(target->right);
        int above = n - left - right - 1;
        // Grabbing the largest of the three regions wins iff it alone holds
        // the majority of all nodes.
        return max({left, right, above}) * 2 > n;
    }

  private:
    TreeNode *find(TreeNode *node, int x) {
        if (node == nullptr || node->val == x)
            return node;
        TreeNode *hit = find(node->left, x);
        return hit ? hit : find(node->right, x);
    }

    int count(TreeNode *node) {
        if (node == nullptr)
            return 0;
        return 1 + count(node->left) + count(node->right);
    }
};
