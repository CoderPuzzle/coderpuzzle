#include <algorithm>
#include <climits>
#include <vector>

class Solution {
  public:
    int getMinimumDifference(TreeNode *root) {
        // An inorder walk of a BST emits values in ascending order, and a
        // sorted sequence keeps its closest pair next to each other: for any
        // two values with a third between them, that middle value is closer
        // to one end than the outer pair is wide. The minimum absolute
        // difference is therefore always a gap between consecutively visited
        // values, and one pass holding just the previously emitted value
        // sees every candidate. The traversal carries its own stack of
        // nodes: the tree may be a single 10^4-node chain, whose walk would
        // nest 10000 calls — needlessly at the mercy of the runtime call
        // stack.
        int best = INT_MAX;
        int prev = 0;
        bool hasPrev = false;
        vector<TreeNode *> stack;
        TreeNode *current = root;
        while (current != nullptr || !stack.empty()) {
            // Descend the left spine stacking every node, then visit each
            // popped node and descend its right child.
            while (current != nullptr) {
                stack.push_back(current);
                current = current->left;
            }
            current = stack.back();
            stack.pop_back();
            if (hasPrev) {
                best = std::min(best, current->val - prev);
            }
            hasPrev = true;
            prev = current->val;
            current = current->right;
        }
        return best;
    }
};
