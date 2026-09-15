#include <vector>

class Solution {
  public:
    TreeNode *increasingBST(TreeNode *root) {
        // The required tree's values, read from its root down its only
        // right links, are ascending — exactly the order an in-order
        // walk of a binary search tree visits. So the answer is that
        // walk, relinked: the leftmost node (visited first) becomes the
        // root, every left link is severed, every right link points at
        // the next visited node. The traversal carries its own stack of
        // deferred nodes rather than recursing, so no runtime call stack
        // is touched at all: the stack holds the current left spine only.
        vector<TreeNode *> nodes;
        vector<TreeNode *> stack;
        TreeNode *current = root;
        while (current != nullptr || !stack.empty()) {
            // Descend one left spine, deferring every node on it.
            while (current != nullptr) {
                stack.push_back(current);
                current = current->left;
            }
            // The stack top is now the leftmost unvisited node: visit it
            // and continue the walk in its right subtree.
            TreeNode *node = stack.back();
            stack.pop_back();
            nodes.push_back(node);
            current = node->right;
        }
        // Relink the visit order into the spine: the last node keeps no
        // right child, and no node keeps a left child.
        for (size_t i = 0; i < nodes.size(); i++) {
            nodes[i]->left = nullptr;
            nodes[i]->right = i + 1 < nodes.size() ? nodes[i + 1] : nullptr;
        }
        return nodes.empty() ? nullptr : nodes[0];
    }
};
