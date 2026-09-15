#include <vector>

class Solution {
  public:
    std::vector<int> getLonelyNodes(TreeNode *root) {
        std::vector<int> result;
        if (root == nullptr) {
            return result;
        }
        // Explicit stack: a 1000-deep chain must not recurse.
        std::vector<TreeNode *> stack;
        stack.push_back(root);
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            if (node->left != nullptr && node->right == nullptr) {
                result.push_back(node->left->val);
            } else if (node->right != nullptr && node->left == nullptr) {
                result.push_back(node->right->val);
            }
            if (node->left != nullptr) {
                stack.push_back(node->left);
            }
            if (node->right != nullptr) {
                stack.push_back(node->right);
            }
        }
        return result;
    }
};
