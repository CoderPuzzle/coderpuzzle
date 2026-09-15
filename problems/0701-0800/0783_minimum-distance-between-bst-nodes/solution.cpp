#include <algorithm>
#include <vector>

class Solution {
  public:
    int minDiffInBST(TreeNode *root) {
        // An inorder walk of a BST visits the values in ascending order, so
        // the closest pair in the whole tree appears as two consecutive
        // visits — any two values with a third between them sit farther
        // apart than that third sits from one of them. The walk keeps only
        // the previously visited value and folds in the smallest difference
        // to the current one.
        int best = 1 << 30;
        int prev = -1;
        // The stack, not the call stack, drives the descent to each
        // leftmost node and the step back up — the tree may legally be a
        // single 100-node chain.
        vector<TreeNode *> stack;
        TreeNode *node = root;
        while (node != nullptr || !stack.empty()) {
            while (node != nullptr) {
                stack.push_back(node);
                node = node->left;
            }
            node = stack.back();
            stack.pop_back();
            // Values are never negative, so prev < 0 marks the very first
            // visit; at least two nodes exist, so best is always set.
            if (prev >= 0) {
                best = min(best, node->val - prev);
            }
            prev = node->val;
            node = node->right;
        }
        return best;
    }
};
