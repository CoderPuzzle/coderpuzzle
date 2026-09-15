class Solution {
  public:
    vector<int> boundaryOfBinaryTree(TreeNode *root) {
        auto isLeaf = [](TreeNode *node) { return node->left == nullptr && node->right == nullptr; };

        // Left boundary: start at the root's left child and keep descending,
        // left child when present and otherwise the right child, stopping
        // before any leaf — the leftmost leaf prints in the leaves alone.
        vector<int> boundary{root->val};
        TreeNode *node = root->left;
        while (node != nullptr && !isLeaf(node)) {
            boundary.push_back(node->val);
            node = node->left != nullptr ? node->left : node->right;
        }

        // Leaves left to right: an explicit-stack pre-order seeded with the
        // root's children (the root is never a leaf here, and being skipped
        // at the seed it cannot print twice), right child pushed first so
        // pops run left to right. The stack replaces recursion, so a
        // 10^4-deep chain costs no call stack.
        vector<TreeNode *> stack;
        if (root->right != nullptr) {
            stack.push_back(root->right);
        }
        if (root->left != nullptr) {
            stack.push_back(root->left);
        }
        while (!stack.empty()) {
            node = stack.back();
            stack.pop_back();
            if (isLeaf(node)) {
                boundary.push_back(node->val);
                continue;
            }
            if (node->right != nullptr) {
                stack.push_back(node->right);
            }
            if (node->left != nullptr) {
                stack.push_back(node->left);
            }
        }

        // Right boundary: the mirror walk from the root's right child —
        // right child preferred, stopped before its leaf — collected on the
        // way down and emitted reversed.
        vector<int> right;
        node = root->right;
        while (node != nullptr && !isLeaf(node)) {
            right.push_back(node->val);
            node = node->right != nullptr ? node->right : node->left;
        }
        boundary.insert(boundary.end(), right.rbegin(), right.rend());
        return boundary;
    }
};
