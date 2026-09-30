class Solution {
  public:
    TreeNode *balanceBST(TreeNode *root) {
        // phase 1: fold the tree into a descending "vine" — a left-only
        // chain in decreasing value order — via left rotations. A dummy
        // head lets the vine's own root be rotated without a special case.
        TreeNode dummy(0);
        dummy.left = root;
        TreeNode *tail = &dummy;
        TreeNode *rest = dummy.left;
        while (rest != nullptr) {
            if (rest->right != nullptr) {
                TreeNode *child = rest->right;
                rest->right = child->left;
                child->left = rest;
                rest = child;
                tail->left = child;
            } else {
                tail = rest;
                rest = rest->left;
            }
        }

        int size = 0;
        for (TreeNode *node = dummy.left; node != nullptr; node = node->left) {
            size++;
        }

        // phase 2: compress the vine into a complete tree with right
        // rotations, working from the leaves inward. The first round
        // trims the vine down to the largest 2**k - 1 size (its "extra"
        // leaves); every following round halves what remains, exactly
        // like the book DSW algorithm mirrored end for end.
        int power = 1;
        while (power * 2 <= size + 1) {
            power *= 2;
        }
        compress(&dummy, size + 1 - power);
        size = power - 1;
        while (size > 1) {
            compress(&dummy, size / 2);
            size /= 2;
        }

        return dummy.left;
    }

  private:
    void compress(TreeNode *dummy, int count) {
        TreeNode *scanner = dummy;
        for (int i = 0; i < count; i++) {
            TreeNode *child = scanner->left;
            TreeNode *grandchild = child->left;
            scanner->left = grandchild;
            child->left = grandchild->right;
            grandchild->right = child;
            scanner = grandchild;
        }
    }
};
