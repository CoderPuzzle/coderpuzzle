class Solution {
  public:
    vector<int> getAllElements(TreeNode *root1, TreeNode *root2) {
        // Iterative in-order walks produce two sorted lists (no recursion, so
        // a 5000-node skewed tree cannot overflow the stack), then a merge.
        vector<int> first = inorder(root1);
        vector<int> second = inorder(root2);
        vector<int> merged;
        merged.reserve(first.size() + second.size());
        size_t i = 0;
        size_t j = 0;
        while (i < first.size() && j < second.size()) {
            if (first[i] <= second[j]) {
                merged.push_back(first[i++]);
            } else {
                merged.push_back(second[j++]);
            }
        }
        merged.insert(merged.end(), first.begin() + (long)i, first.end());
        merged.insert(merged.end(), second.begin() + (long)j, second.end());
        return merged;
    }

  private:
    vector<int> inorder(TreeNode *root) {
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
