class Solution {
  public:
    vector<int> closestKValues(TreeNode *root, double target, int k) {
        // Explicit-stack inorder: the BST flattened to its sorted values, with
        // no recursion that a 10^4-node chain could overflow.
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
        // Over sorted values the distance to target is V-shaped, so the k
        // closest form one window: start at the split and grow it, each step
        // taking the nearer frontier. A tie goes left — the smaller value —
        // so the picks come out in the statement's pinned order directly.
        int left = 0;
        while (left < (int)values.size() && values[left] < target) {
            ++left;
        }
        int right = left;
        --left;
        vector<int> result;
        result.reserve(k);
        for (int i = 0; i < k; ++i) {
            if (right == (int)values.size() ||
                (left >= 0 && abs(values[left] - target) <= abs(values[right] - target))) {
                result.push_back(values[left--]);
            } else {
                result.push_back(values[right++]);
            }
        }
        return result;
    }
};
