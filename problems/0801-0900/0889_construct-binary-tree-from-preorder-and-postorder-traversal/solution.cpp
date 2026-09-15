class Solution {
  public:
    TreeNode *constructFromPrePost(vector<int> &preorder, vector<int> &postorder) {
        // Value -> postorder index: makes the left subtree's size an O(1)
        // lookup instead of a scan. Values are unique, so a hit names the
        // one place the left subtree's postorder segment ends.
        unordered_map<int, int> index;
        for (int i = 0; i < (int)postorder.size(); i++) {
            index[postorder[i]] = i;
        }
        // The 30-node ceiling bounds the nesting at 30 calls, so plain
        // recursion is safe in this judge's every runtime.
        return build(preorder, index, 0, (int)preorder.size(), 0);
    }

  private:
    // Raises the subtree over the preorder range [low, high); its postorder
    // segment starts at postLow.
    TreeNode *build(vector<int> &preorder, unordered_map<int, int> &index, int low, int high, int postLow) {
        if (low >= high) {
            // An empty range is a missing subtree.
            return nullptr;
        }
        TreeNode *node = new TreeNode(preorder[low]);
        if (high - low == 1) {
            // The subtree is a lone leaf: no child split to find.
            return node;
        }
        // The value right behind the root roots the subtree that follows.
        // Postorder ends that subtree with its own root, so
        // [postLow, index[...]] is exactly the left subtree and its size
        // is one past that position.
        int leftSize = index[preorder[low + 1]] + 1 - postLow;
        node->left = build(preorder, index, low + 1, low + 1 + leftSize, postLow);
        // Whatever remains is the right subtree. When the root really has
        // one child, the left range swallowed the whole remainder and this
        // range comes back empty -- the only child stays on the left, the
        // required answer, with no branch needed.
        node->right = build(preorder, index, low + 1 + leftSize, high, postLow + leftSize);
        return node;
    }
};
