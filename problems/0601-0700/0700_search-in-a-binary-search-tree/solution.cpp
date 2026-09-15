class Solution {
  public:
    TreeNode *searchBST(TreeNode *root, int val) {
        // A BST orders the search path itself: every value in a node's
        // left subtree is below the node's value, every value in its
        // right subtree above it, so one comparison per node settles
        // which side — if either — can still hold val. Walk that one
        // path: left while val is smaller, right while it is larger,
        // stop at equality — the node and everything under it are
        // exactly the subtree to return — or at a null child, which
        // proves val is absent (the empty tree on the wire). The walk
        // is a loop, not recursion: a 5000-node tree may be a single
        // chain, whose 5000 nested calls would sit needlessly at the
        // mercy of the runtime call stack.
        while (root != nullptr && root->val != val) {
            root = root->val > val ? root->left : root->right;
        }
        return root;
    }
};
