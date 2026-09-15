#include <queue>

class Solution {
  public:
    TreeNode *findNearestRightNode(TreeNode *root, int u) {
        // Level-order BFS: drain the queue one level at a time, left child
        // before right, so a level's nodes come out in left-to-right order.
        // The node right after the one matching u is the answer.
        if (root == nullptr) {
            return nullptr;
        }
        std::queue<TreeNode *> queue;
        queue.push(root);
        while (!queue.empty()) {
            int size = static_cast<int>(queue.size());
            bool found = false;
            for (int i = 0; i < size; i++) {
                TreeNode *node = queue.front();
                queue.pop();
                if (found) {
                    return node;
                }
                if (node->val == u) {
                    found = true;
                }
                if (node->left != nullptr) {
                    queue.push(node->left);
                }
                if (node->right != nullptr) {
                    queue.push(node->right);
                }
            }
            if (found) {
                return nullptr;
            }
        }
        return nullptr;
    }
};
