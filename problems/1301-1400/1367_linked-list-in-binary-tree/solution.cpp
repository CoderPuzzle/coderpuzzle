#include <vector>

// Bundle-provided types (assembled with this submission):
//   ListNode:  { int val; ListNode* next; }
//   TreeNode:  { int val; TreeNode* left; TreeNode* right; }

class Solution {
  public:
    bool isSubPath(ListNode *head, TreeNode *root) {
        // Flatten the list once so matching works with plain indices.
        std::vector<int> values;
        for (ListNode *node = head; node != nullptr; node = node->next) {
            values.push_back(node->val);
        }
        if (root == nullptr)
            return false;

        // Walk the whole tree; from every node that starts a match, follow it
        // downward with an explicit (node, index) stack.
        std::vector<TreeNode *> stack{root};
        while (!stack.empty()) {
            TreeNode *treeNode = stack.back();
            stack.pop_back();
            if (matchFrom(treeNode, values))
                return true;
            if (treeNode->left != nullptr)
                stack.push_back(treeNode->left);
            if (treeNode->right != nullptr)
                stack.push_back(treeNode->right);
        }
        return false;
    }

  private:
    bool matchFrom(TreeNode *start, const std::vector<int> &values) {
        if (values.empty() || start->val != values[0])
            return false;
        std::vector<std::pair<TreeNode *, int>> stack{{start, 0}};
        while (!stack.empty()) {
            auto [node, index] = stack.back();
            stack.pop_back();
            if (index + 1 == static_cast<int>(values.size()))
                return true;
            int next = values[index + 1];
            if (node->left != nullptr && node->left->val == next) {
                stack.push_back({node->left, index + 1});
            }
            if (node->right != nullptr && node->right->val == next) {
                stack.push_back({node->right, index + 1});
            }
        }
        return false;
    }
};
