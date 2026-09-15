class Solution {
  public:
    bool checkEquivalence(TreeNode *root1, TreeNode *root2) {
        // The only operator is '+', commutative and associative, so two
        // expression trees agree on every variable assignment exactly
        // when they carry the same multiset of leaf variables, whatever
        // their shape. -1 marks an operator node (always 2 children);
        // 0-25 marks a leaf's encoded letter (always 0 children).
        return leafCounts(root1) == leafCounts(root2);
    }

  private:
    array<int, 26> leafCounts(TreeNode *root) {
        array<int, 26> counts{};
        vector<TreeNode *> stack;
        if (root != nullptr)
            stack.push_back(root);
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            if (node->left == nullptr && node->right == nullptr) {
                counts[node->val]++;
            } else {
                stack.push_back(node->left);
                stack.push_back(node->right);
            }
        }
        return counts;
    }
};
