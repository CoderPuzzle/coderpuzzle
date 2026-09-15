#include <deque>

class CBTInserter {
  public:
    // One level-order pass queues every node that still has a free child
    // slot. BFS visits parents left-to-right, so the queue front is always
    // the parent of the next complete position.
    CBTInserter(TreeNode *root) : root(root) {
        std::deque<TreeNode *> queue{root};
        while (!queue.empty()) {
            TreeNode *node = queue.front();
            queue.pop_front();
            if (node->left == nullptr || node->right == nullptr) {
                pending.push_back(node);
            }
            if (node->left != nullptr) {
                queue.push_back(node->left);
            }
            if (node->right != nullptr) {
                queue.push_back(node->right);
            }
        }
    }

    int insert(int v) {
        TreeNode *parent = pending.front();
        TreeNode *node = new TreeNode(v);
        if (parent->left == nullptr) {
            parent->left = node;
        } else {
            parent->right = node;
            pending.pop_front();
        }
        pending.push_back(node);
        return parent->val;
    }

    TreeNode *get_root() { return root; }

  private:
    TreeNode *root;
    std::deque<TreeNode *> pending;
};
