class Solution {
  public:
    TreeNode *lcaDeepestLeaves(TreeNode *root) {
        if (root == nullptr)
            return nullptr;
        // A pre-order stack walk lists parents before children, so the
        // reversed list settles every child's height before its parent.
        vector<TreeNode *> order;
        vector<TreeNode *> stack;
        stack.push_back(root);
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            order.push_back(node);
            if (node->right != nullptr)
                stack.push_back(node->right);
            if (node->left != nullptr)
                stack.push_back(node->left);
        }
        unordered_map<TreeNode *, int> height;
        for (int i = (int)order.size() - 1; i >= 0; --i) {
            TreeNode *node = order[i];
            int best = -1;
            if (node->left != nullptr)
                best = max(best, height[node->left]);
            if (node->right != nullptr)
                best = max(best, height[node->right]);
            height[node] = best + 1;
        }
        // Descend toward the taller child; a tie means both sides reach the
        // deepest leaves, so this node is their lowest common ancestor.
        TreeNode *node = root;
        while (true) {
            int left_h = node->left == nullptr ? -1 : height[node->left];
            int right_h = node->right == nullptr ? -1 : height[node->right];
            if (left_h > right_h)
                node = node->left;
            else if (right_h > left_h)
                node = node->right;
            else
                return node;
        }
    }
};
