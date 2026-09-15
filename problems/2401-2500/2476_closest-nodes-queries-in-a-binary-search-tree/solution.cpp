class Solution {
  public:
    vector<vector<int>> closestNodes(TreeNode *root, vector<int> &queries) {
        vector<int> values;
        TreeNode *current = root;
        vector<TreeNode *> stack;
        // A BST's inorder traversal is sorted: flatten once and each
        // query becomes two binary searches; the iterative walk dodges
        // recursion depth on a skewed tree.
        while (current || !stack.empty()) {
            while (current) {
                stack.push_back(current);
                current = current->left;
            }
            current = stack.back();
            stack.pop_back();
            values.push_back(current->val);
            current = current->right;
        }

        vector<vector<int>> answer;
        answer.reserve(queries.size());
        for (int query : queries) {
            // upper_bound sits one past the last occurrence of query, so
            // the answer is the pair of neighbours around that slot.
            auto lower = lower_bound(values.begin(), values.end(), query);
            auto upper = upper_bound(values.begin(), values.end(), query);
            int minimum = upper > values.begin() ? *(upper - 1) : -1;
            // first value >= query, -1 when none exists; a present
            // query converges both to [q, q].
            int maximum = lower < values.end() ? *lower : -1;
            answer.push_back({minimum, maximum});
        }
        return answer;
    }
};
