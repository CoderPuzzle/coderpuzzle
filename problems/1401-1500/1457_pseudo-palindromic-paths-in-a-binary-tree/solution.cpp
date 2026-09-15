#include <utility>

class Solution {
  public:
    int pseudoPalindromicPaths(TreeNode *root) {
        if (root == nullptr) {
            return 0;
        }
        int count = 0;
        // Explicit stack: the tree may be a chain 10^5 deep, too deep for
        // recursion under the small run-time stacks.
        std::vector<std::pair<TreeNode *, int>> stack;
        stack.push_back({root, 1 << (root->val - 1)});
        while (!stack.empty()) {
            auto [node, mask] = stack.back();
            stack.pop_back();
            if (node->left == nullptr && node->right == nullptr) {
                // At most one set bit <=> at most one odd digit count.
                if ((mask & (mask - 1)) == 0) {
                    count++;
                }
                continue;
            }
            if (node->left != nullptr) {
                stack.push_back({node->left, mask ^ (1 << (node->left->val - 1))});
            }
            if (node->right != nullptr) {
                stack.push_back({node->right, mask ^ (1 << (node->right->val - 1))});
            }
        }
        return count;
    }
};
