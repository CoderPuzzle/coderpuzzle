class Solution {
  public:
    TreeNode *removeLeafNodes(TreeNode *root, int target) {
        // Post-order prune with an explicit stack (a 3000-node chain would
        // overflow any recursion budget): children are judged before the node
        // itself, so the whole cascade collapses in one pass.
        if (root == nullptr) {
            return nullptr;
        }
        struct Entry {
            TreeNode *node;
            TreeNode *parent;
            int side; // 0 = left, 1 = right
            bool expanded;
        };
        vector<Entry> stack;
        stack.push_back({root, nullptr, 0, false});
        while (!stack.empty()) {
            Entry entry = stack.back();
            stack.pop_back();
            if (!entry.expanded) {
                stack.push_back({entry.node, entry.parent, entry.side, true});
                if (entry.node->left != nullptr) {
                    stack.push_back({entry.node->left, entry.node, 0, false});
                }
                if (entry.node->right != nullptr) {
                    stack.push_back({entry.node->right, entry.node, 1, false});
                }
                continue;
            }
            TreeNode *node = entry.node;
            if (node->left == nullptr && node->right == nullptr && node->val == target) {
                if (entry.parent == nullptr) {
                    return nullptr;
                }
                if (entry.side == 0) {
                    entry.parent->left = nullptr;
                } else {
                    entry.parent->right = nullptr;
                }
            }
        }
        return root;
    }
};
