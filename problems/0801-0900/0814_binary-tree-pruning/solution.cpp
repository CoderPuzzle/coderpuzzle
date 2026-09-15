class Solution {
  public:
    TreeNode *pruneTree(TreeNode *root) {
        // A node's subtree is the node plus everything below it, so the
        // keep decision at a node needs its subtrees decided first —
        // the walk is post-order: children before the node.
        if (root == nullptr) {
            return nullptr;
        }
        root->left = pruneTree(root->left);
        root->right = pruneTree(root->right);
        // Keep the node exactly when it is a 1 itself or at least one
        // pruned child survives. A 0 node dropped here takes a subtree
        // with no 1 anywhere in it with it; an all-zero tree unwinds
        // to nullptr. Depth is bounded — at most 200 nodes, so a chain
        // nests at most 201 frames, no strain on the call stack.
        if (root->val == 1 || root->left != nullptr || root->right != nullptr) {
            return root;
        }
        return nullptr;
    }
};
