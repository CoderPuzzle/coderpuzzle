#include <vector>

class BSTIterator {
  public:
    // Push the left spine of the root: the stack top is the smallest
    // unvisited node and the stack holds exactly one root-to-node path
    // (O(h) memory).
    BSTIterator(TreeNode *root) { pushSpine(root); }

    int next() {
        TreeNode *node = stack.back();
        stack.pop_back();
        // The popped node's right subtree holds the values that come next;
        // its left spine is the front of that block.
        pushSpine(node->right);
        return node->val;
    }

    bool hasNext() { return !stack.empty(); }

  private:
    // Everything on this path is smaller than what lies below it, so the
    // last one pushed is the next value in order.
    void pushSpine(TreeNode *node) {
        while (node != nullptr) {
            stack.push_back(node);
            node = node->left;
        }
    }

    std::vector<TreeNode *> stack;
};
