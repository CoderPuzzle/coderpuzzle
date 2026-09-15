class Solution {
  public:
    bool twoSumBSTs(TreeNode *root1, TreeNode *root2, int target) {
        vector<int> a = inorder(root1);
        vector<int> b = inorder(root2);
        int i = 0, j = (int)b.size() - 1;
        while (i < (int)a.size() && j >= 0) {
            // Values reach +-1e9, so the pair sum is computed in 64 bits.
            long long total = (long long)a[i] + b[j];
            if (total == target)
                return true;
            if (total < target)
                ++i;
            else
                --j;
        }
        return false;
    }

  private:
    vector<int> inorder(TreeNode *root) {
        // Iterative in-order: a degenerate 5000-node tree would recurse past
        // the smallest judged stacks.
        vector<int> values;
        vector<TreeNode *> stack;
        TreeNode *node = root;
        while (!stack.empty() || node != nullptr) {
            while (node != nullptr) {
                stack.push_back(node);
                node = node->left;
            }
            node = stack.back();
            stack.pop_back();
            values.push_back(node->val);
            node = node->right;
        }
        return values;
    }
};
