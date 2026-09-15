#include <vector>

class Solution {
  public:
    TreeNode *constructMaximumBinaryTree(vector<int> &nums) {
        // The half-built tree's right spine holds exactly the still-open
        // maxima — values strictly decreasing from the root down — so it
        // lives on a stack. A new value dominates every smaller top: each
        // popped subtree is finished and can only hang left of it, and the
        // last one out (the run's largest) is its left child.
        vector<TreeNode *> stack;
        for (int value : nums) {
            TreeNode *node = new TreeNode(value);
            TreeNode *last = nullptr;
            while (!stack.empty() && stack.back()->val < value) {
                last = stack.back();
                stack.pop_back();
            }
            node->left = last;
            if (!stack.empty()) {
                // Whatever survives is larger, so the new node is its right
                // child — this link is rewritten only after the previous
                // child was popped and re-hung one level down.
                stack.back()->right = node;
            }
            stack.push_back(node);
        }
        // The bottom of the stack is the largest value ever seen: the root.
        return stack.front();
    }
};
