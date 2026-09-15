#include <vector>

class Solution {
  public:
    bool isUnivalTree(TreeNode *root) {
        // The root's value is the one every node must carry, so a single
        // reference value is all the scan needs. It reads the tree level
        // by level — a queue seeded with the root, drained front-first,
        // children appended left before right — and answers false at the
        // first node that disagrees; a queue that drains clean leaves
        // every node vouched for, which is true. The queue, not the call
        // stack, carries the walk — a hundred-node chain of one value is
        // within the constraints, and no frame ever nests.
        if (root == nullptr) {
            return true;
        }
        vector<TreeNode *> pending{root};
        size_t head = 0;
        while (head < pending.size()) {
            TreeNode *node = pending[head++];
            if (node->val != root->val) {
                return false;
            }
            if (node->left != nullptr)
                pending.push_back(node->left);
            if (node->right != nullptr)
                pending.push_back(node->right);
        }
        return true;
    }
};
