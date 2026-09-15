class Solution {
  public:
    int sumEvenGrandparent(TreeNode *root) {
        // Each stack entry carries (node, parent value, grandparent value) so
        // the parity test needs no upward links. Explicit stack: the tree may
        // be a 10^4-node chain, beyond any recursion budget.
        struct Entry {
            TreeNode *node;
            int parent;
            int grandparent;
        };
        const int none = 1; // odd sentinel: contributes nothing
        int total = 0;
        vector<Entry> stack;
        stack.push_back({root, none, none});
        while (!stack.empty()) {
            Entry entry = stack.back();
            stack.pop_back();
            if (entry.node == nullptr) {
                continue;
            }
            if (entry.grandparent % 2 == 0) {
                total += entry.node->val;
            }
            stack.push_back({entry.node->left, entry.node->val, entry.parent});
            stack.push_back({entry.node->right, entry.node->val, entry.parent});
        }
        return total;
    }
};
