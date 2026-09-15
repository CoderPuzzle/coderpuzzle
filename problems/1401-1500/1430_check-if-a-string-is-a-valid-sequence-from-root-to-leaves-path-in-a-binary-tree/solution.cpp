#include <utility>
#include <vector>

class Solution {
  public:
    bool isValidSequence(TreeNode *root, std::vector<int> &arr) {
        if (root == nullptr) {
            return false;
        }
        int n = (int)arr.size();
        // Explicit stack of (node, index): a chain thousands deep must not
        // recurse, so the walk keeps its own frame list.
        std::vector<std::pair<TreeNode *, int>> stack;
        stack.push_back({root, 0});
        while (!stack.empty()) {
            auto [node, i] = stack.back();
            stack.pop_back();
            if (node->val != arr[i]) {
                continue;
            }
            if (i == n - 1) {
                // The array is consumed: valid only at a leaf.
                if (node->left == nullptr && node->right == nullptr) {
                    return true;
                }
                continue;
            }
            if (node->left != nullptr) {
                stack.push_back({node->left, i + 1});
            }
            if (node->right != nullptr) {
                stack.push_back({node->right, i + 1});
            }
        }
        return false;
    }
};
