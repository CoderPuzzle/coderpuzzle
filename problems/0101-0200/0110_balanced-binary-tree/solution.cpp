class Solution {
  public:
    bool isBalanced(TreeNode *root) {
        if (root == nullptr)
            return true;
        // Bottom-up height check: `heights` maps each node to its subtree
        // height, or to -1 once an imbalance is found anywhere inside it.
        unordered_map<TreeNode *, int> heights;
        // Explicit post-order stack: a node is settled only after both of
        // its children's heights are known — no recursion, so a 5000-node
        // skewed chain cannot overflow any call stack.
        vector<TreeNode *> stack;
        stack.push_back(root);
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            TreeNode *left = node->left, *right = node->right;
            bool leftReady = left == nullptr || heights.count(left) > 0;
            bool rightReady = right == nullptr || heights.count(right) > 0;
            if (leftReady && rightReady) {
                stack.pop_back();
                int leftHeight = left == nullptr ? 0 : heights[left];
                int rightHeight = right == nullptr ? 0 : heights[right];
                // -1 propagates: a subtree that contains an imbalance can
                // never regain balance higher up, so it fails every ancestor.
                if (leftHeight == -1 || rightHeight == -1 || abs(leftHeight - rightHeight) > 1)
                    heights[node] = -1;
                else
                    heights[node] = 1 + max(leftHeight, rightHeight);
            } else {
                if (left != nullptr && heights.count(left) == 0)
                    stack.push_back(left);
                if (right != nullptr && heights.count(right) == 0)
                    stack.push_back(right);
            }
        }
        return heights[root] != -1;
    }
};
