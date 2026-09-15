class Solution {
  public:
    string tree2str(TreeNode *root) {
        // The answer is a preorder walk written under two paren rules: a node
        // with any child opens a group for it, and a group is dropped only
        // when the child is absent — except that an absent left child beside
        // a present right one leaves its "()" placeholder so the two groups
        // stay tell-apart. The stack interleaves those literal parens with
        // the pending nodes in exactly the order they must be written, so one
        // pop-and-emit loop produces the whole string.
        // Iterative on purpose: the 10'000-node chain the constraints allow
        // is far deeper than any of the judge's runtimes may recurse; the
        // explicit stack is one entry per pending node or paren and never
        // nests a call.
        string result;
        // A frame is a node to write (marker 0) or a literal paren; the node
        // pointer is null exactly when the marker is real.
        vector<pair<TreeNode *, char>> stack;
        stack.push_back({root, 0});
        while (!stack.empty()) {
            auto [node, marker] = stack.back();
            stack.pop_back();
            if (node == nullptr) {
                result.push_back(marker);
                continue;
            }
            result += to_string(node->val);
            if (node->left != nullptr || node->right != nullptr) {
                if (node->right != nullptr) {
                    // The right group is written second, so it is pushed
                    // first and pops after the left group is finished.
                    stack.push_back({nullptr, ')'});
                    stack.push_back({node->right, 0});
                    stack.push_back({nullptr, '('});
                    if (node->left == nullptr) {
                        // A right child with no left one: the empty pair
                        // marks where the left group would have been.
                        result += "()";
                    }
                }
                if (node->left != nullptr) {
                    stack.push_back({nullptr, ')'});
                    stack.push_back({node->left, 0});
                    stack.push_back({nullptr, '('});
                }
            }
        }
        return result;
    }
};
