class Solution {
  public:
    TreeNode *sufficientSubset(TreeNode *root, int limit) {
        // Post-order with an explicit stack. Each frame is (node, remaining,
        // parent, is_left, revisited): the first visit pushes the children
        // with the budget reduced by the node's value, and the second visit
        // decides keep-or-prune once the children are pruned in place. A
        // leaf survives iff its value clears the remaining budget; an
        // internal node survives iff at least one child survived.
        struct Frame {
            TreeNode *node;
            int remaining;
            TreeNode *parent;
            bool isLeft;
            bool revisited;
        };
        vector<Frame> stack;
        stack.push_back({root, limit, nullptr, false, false});
        TreeNode *result = nullptr;
        while (!stack.empty()) {
            Frame top = stack.back();
            stack.pop_back();
            TreeNode *node = top.node;
            if (node == nullptr)
                continue;
            if (!top.revisited) {
                if (node->left == nullptr && node->right == nullptr) {
                    if (node->val < top.remaining) {
                        if (top.parent == nullptr) {
                            result = nullptr;
                        } else if (top.isLeft) {
                            top.parent->left = nullptr;
                        } else {
                            top.parent->right = nullptr;
                        }
                    } else if (top.parent == nullptr) {
                        result = node;
                    }
                    continue;
                }
                stack.push_back({node, top.remaining, top.parent, top.isLeft, true});
                stack.push_back({node->right, top.remaining - node->val, node, false, false});
                stack.push_back({node->left, top.remaining - node->val, node, true, false});
            } else if (node->left == nullptr && node->right == nullptr) {
                // Both children were pruned, so no leaf below reaches limit.
                if (top.parent == nullptr) {
                    result = nullptr;
                } else if (top.isLeft) {
                    top.parent->left = nullptr;
                } else {
                    top.parent->right = nullptr;
                }
            } else if (top.parent == nullptr) {
                result = node;
            }
        }
        return result;
    }
};
