#include <queue>

class FindElements {
  public:
    // Constructor: iterative recovery pass. The root is 0; a child of x
    // is 2x + 1 (left) or 2x + 2 (right), so one BFS fixes every value.
    FindElements(TreeNode *root) : root(root) {
        root->val = 0;
        std::queue<TreeNode *> queue;
        queue.push(root);
        while (!queue.empty()) {
            TreeNode *node = queue.front();
            queue.pop();
            if (node->left != nullptr) {
                node->left->val = 2 * node->val + 1;
                queue.push(node->left);
            }
            if (node->right != nullptr) {
                node->right->val = 2 * node->val + 2;
                queue.push(node->right);
            }
        }
    }

    // With w = target + 1, stepping left doubles w (append bit 0) and
    // stepping right doubles w and adds one (append bit 1), so the bits
    // after the leading one, read highest-first, give the moves.
    bool find(int target) {
        unsigned int path = static_cast<unsigned int>(target) + 1u;
        int top = 0;
        while ((path >> top) > 1u)
            ++top;
        TreeNode *node = root;
        for (int bit = top - 1; bit >= 0 && node != nullptr; --bit) {
            node = ((path >> bit) & 1u) == 1u ? node->right : node->left;
        }
        return node != nullptr;
    }

  private:
    TreeNode *root;
};
