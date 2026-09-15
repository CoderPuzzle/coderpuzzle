#include <utility>
#include <vector>

class Solution {
  public:
    int longestConsecutive(TreeNode *root) {
        // For every node, the consecutive run ending there is one longer
        // than its parent's run when the step is exactly +1, and 1 when it
        // is not; the answer is the maximum over all nodes. The traversal
        // carries its own stack: the tree may be a single 3*10^4-node chain,
        // whose run nests 30000 calls — needlessly close to the runtime
        // stack limit.
        int best = 0;
        // Right children parked while the descent walks the left spine,
        // each with the run length already computed for it.
        std::vector<std::pair<TreeNode *, int>> pending;
        TreeNode *node = root;
        int length = 1;
        while (node != nullptr) {
            if (length > best) {
                best = length;
            }
            if (node->right != nullptr) {
                // Extend into the right child, or restart the run there.
                bool step = node->right->val == node->val + 1;
                pending.emplace_back(node->right, step ? length + 1 : 1);
            }
            if (node->left != nullptr) {
                // Descend left, extending or restarting the same way.
                bool step = node->left->val == node->val + 1;
                length = step ? length + 1 : 1;
                node = node->left;
            } else if (!pending.empty()) {
                auto frame = pending.back();
                pending.pop_back();
                node = frame.first;
                length = frame.second;
            } else {
                node = nullptr;
            }
        }
        return best;
    }
};
