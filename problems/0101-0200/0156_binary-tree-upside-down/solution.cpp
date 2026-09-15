class Solution {
  public:
    TreeNode *upsideDownBinaryTree(TreeNode *root) {
        TreeNode *node = root;
        TreeNode *parent = nullptr;
        TreeNode *sibling = nullptr;
        // Loop invariant: `node` walks the original left spine, `parent` is
        // its original parent and `sibling` its original right sibling; every
        // spine node already passed is fully relinked into its flipped
        // orientation, so the loop only ever reads original edges ahead of it.
        while (node != nullptr) {
            // Save both links before overwriting: `next` continues the spine
            // walk, `rightSave` is the sibling of the next spine node.
            TreeNode *next = node->left;
            TreeNode *rightSave = node->right;
            // The original right sibling becomes the new left child.
            node->left = sibling;
            // The original parent becomes the new right child.
            node->right = parent;
            parent = node;
            sibling = rightSave;
            node = next;
        }
        // The walk ends past the leftmost node; `parent` is that node — the
        // new root.
        return parent;
    }
};
