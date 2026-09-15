class Solution {
  public:
    TreeNode *deleteNode(TreeNode *root, int key) { return delete_(root, key); }

  private:
    TreeNode *delete_(TreeNode *node, int key) {
        if (node == nullptr) {
            return nullptr;
        }
        if (key < node->val) {
            // Descend by BST order, rewriting the child link so the tree
            // relinks itself on the way back up.
            node->left = delete_(node->left, key);
        } else if (key > node->val) {
            node->right = delete_(node->right, key);
        } else {
            // One-child (and leaf) cases: lift the whole remaining subtree —
            // it stays on the same side of every ancestor.
            if (node->left == nullptr) {
                return node->right;
            }
            if (node->right == nullptr) {
                return node->left;
            }
            // Two children: adopt the in-order successor's value (minimum of
            // the right subtree). It exceeds everything on the left and is
            // minimal in the right, so the ordering is preserved.
            TreeNode *successor = node->right;
            while (successor->left != nullptr) {
                successor = successor->left;
            }
            node->val = successor->val;
            // Delete the duplicate successor; that recursive call lands on a
            // node with no left child, i.e. an easy splice.
            node->right = delete_(node->right, successor->val);
        }
        return node;
    }
};
