class Solution {
  public:
    vector<int> closestKValues(TreeNode *root, double target, int k) {
        // One descent from the root sorts the tree around target. A node at
        // or below target is a candidate predecessor and anything nearer to
        // target on that side lives in its right subtree, so the walk steps
        // right after pushing it; a node above target mirrors onto the
        // successor stack and steps left. Each stack ends with its side's
        // nearest value on top, the rest of the side ordered underneath.
        vector<TreeNode *> predecessors;
        vector<TreeNode *> successors;
        TreeNode *node = root;
        while (node != nullptr) {
            if (node->val <= target) {
                predecessors.push_back(node);
                node = node->right;
            } else {
                successors.push_back(node);
                node = node->left;
            }
        }
        // Each pick pops the nearer top — a tie goes to the predecessor,
        // which holds the smaller value — then restores its stack by pushing
        // the popped node's inner spine: the right edge of a predecessor's
        // left subtree, the left edge of a successor's right subtree. Each
        // side sweeps outward from target one value at a time, so picks come
        // out ordered exactly as the statement pins them.
        vector<int> result;
        result.reserve(k);
        for (int i = 0; i < k; ++i) {
            bool take_predecessor =
                successors.empty() || (!predecessors.empty() &&
                                       abs(predecessors.back()->val - target) <= abs(successors.back()->val - target));
            if (take_predecessor) {
                TreeNode *picked = predecessors.back();
                predecessors.pop_back();
                result.push_back(picked->val);
                for (TreeNode *child = picked->left; child != nullptr; child = child->right) {
                    predecessors.push_back(child);
                }
            } else {
                TreeNode *picked = successors.back();
                successors.pop_back();
                result.push_back(picked->val);
                for (TreeNode *child = picked->right; child != nullptr; child = child->left) {
                    successors.push_back(child);
                }
            }
        }
        return result;
    }
};
