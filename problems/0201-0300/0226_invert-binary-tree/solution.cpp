class Solution {
  public:
    TreeNode *invertTree(TreeNode *root) {
        // A mirror is self-similar: to invert a tree, invert both subtrees
        // and cross them at the root. The recursion bottoms out at nullptr,
        // the empty tree, which is its own mirror.
        if (root == nullptr) {
            return nullptr;
        }
        // Each call returns a subtree already mirrored end-to-end, so the
        // two finished results only need to trade places at this node.
        TreeNode *left = invertTree(root->left);
        TreeNode *right = invertTree(root->right);
        root->left = right;
        root->right = left;
        return root;
    }
};
