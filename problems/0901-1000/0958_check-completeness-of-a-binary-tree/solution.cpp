#include <vector>

class Solution {
  public:
    bool isCompleteTree(TreeNode *root) {
        // Number the positions the way a heap numbers them — root at 1,
        // children of slot i at 2i and 2i+1. Reading the queue front-first
        // surfaces nodes in exactly slot order (absent children ride
        // along as nullptr placeholders), so the first nullptr read is
        // the first unoccupied slot, and any real node after it sits
        // beyond a hole that completeness cannot afford.
        vector<TreeNode *> pending{root};
        size_t head = 0;
        bool gap_seen = false;
        while (head < pending.size()) {
            TreeNode *node = pending[head++];
            if (node == nullptr) {
                gap_seen = true;
            } else if (gap_seen) {
                return false;
            } else {
                pending.push_back(node->left);
                pending.push_back(node->right);
            }
        }
        return true;
    }
};
