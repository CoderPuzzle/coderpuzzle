class Solution {
  public:
    TreeNode *buildTree(vector<int> &preorder, vector<int> &inorder) {
        if (preorder.empty()) {
            return nullptr;
        }
        TreeNode *root = new TreeNode(preorder[0]);
        // The spine: every node whose left side is (possibly still) growing
        // and whose right child is still pending. Preorder's next value is
        // either the spine top's left child, or the right child of whatever
        // portion of the spine inorder has already finished.
        vector<TreeNode *> spine = {root};
        size_t cursor = 0; // next inorder entry awaiting its turn
        for (size_t i = 1; i < preorder.size(); ++i) {
            int value = preorder[i];
            if (spine.back()->val != inorder[cursor]) {
                // The top is not due yet, so the value keeps descending left.
                TreeNode *node = new TreeNode(value);
                spine.back()->left = node;
                spine.push_back(node);
            } else {
                // The top is due in inorder: its whole left side is settled,
                // so pop it (and any ancestors also due) -- the new value is
                // the right child of the deepest node popped.
                TreeNode *last = spine.back();
                spine.pop_back();
                cursor++;
                while (!spine.empty() && spine.back()->val == inorder[cursor]) {
                    last = spine.back();
                    spine.pop_back();
                    cursor++;
                }
                TreeNode *node = new TreeNode(value);
                last->right = node;
                spine.push_back(node);
            }
        }
        return root;
    }
};
