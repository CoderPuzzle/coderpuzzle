#include <vector>

class BSTIterator {
  public:
    // Iterative in-order traversal (explicit stack, so depth never risks
    // the call stack) collects the ascending values once. index points at
    // the current value, starting at -1 for "before the first value".
    BSTIterator(TreeNode *root) {
        std::vector<TreeNode *> stack;
        TreeNode *node = root;
        while (!stack.empty() || node != nullptr) {
            while (node != nullptr) {
                stack.push_back(node);
                node = node->left;
            }
            node = stack.back();
            stack.pop_back();
            values.push_back(node->val);
            node = node->right;
        }
    }

    bool hasNext() { return index + 1 < static_cast<int>(values.size()); }

    int next() {
        index++;
        return values[index];
    }

    bool hasPrev() { return index > 0; }

    int prev() {
        index--;
        return values[index];
    }

  private:
    std::vector<int> values;
    int index = -1;
};
