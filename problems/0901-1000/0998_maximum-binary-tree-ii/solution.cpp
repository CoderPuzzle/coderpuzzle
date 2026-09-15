class Solution {
  public:
    TreeNode *insertIntoMaxTree(TreeNode *root, int val) {
        // Appending val to the end of the original array can only disturb
        // the tree's right spine: every node off that spine is the max of a
        // subarray that lies entirely before the appended value, so it and
        // its whole subtree are untouched. If val beats everything on the
        // spine (including an empty tree), it becomes the new overall
        // maximum, so it is the new root with the old tree hanging as its
        // left child.
        if (root == nullptr || val > root->val) {
            TreeNode *node = new TreeNode(val);
            node->left = root;
            return node;
        }
        // Otherwise walk down the spine while it still dominates val. The
        // walk stops at the first spine node whose right child is either
        // absent or smaller than val — exactly where val belongs: it takes
        // over that child slot, and whatever used to sit there (still all
        // smaller than val, by construction of the spine) becomes val's own
        // left subtree.
        TreeNode *node = root;
        while (node->right != nullptr && node->right->val > val) {
            node = node->right;
        }
        TreeNode *newNode = new TreeNode(val);
        newNode->left = node->right;
        node->right = newNode;
        return root;
    }
};
