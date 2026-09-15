class Solution {
  public:
    TreeNode *buildTree(vector<int> &preorder, vector<int> &inorder) {
        // Value -> inorder index: makes each split lookup O(1) instead of a
        // linear scan. Values are unique, so a hit is exactly one split point.
        unordered_map<int, int> index;
        for (int i = 0; i < (int)inorder.size(); i++) {
            index[inorder[i]] = i;
        }
        // Single shared cursor consuming preorder strictly left to right,
        // one value per recursive call (passed by reference).
        int position = 0;
        return build(preorder, index, position, 0, inorder.size());
    }

  private:
    TreeNode *build(vector<int> &preorder, unordered_map<int, int> &index, int &position, int low, int high) {
        // Empty inorder range <=> missing child, so base cases need no
        // special casing.
        if (low >= high) {
            return nullptr;
        }
        // The first unconsumed preorder value is the root of this subtree:
        // preorder lists root, then the whole left subtree, then the right
        // -- exactly the order the recursion asks for root values.
        int value = preorder[position];
        position++;
        TreeNode *node = new TreeNode(value);
        int mid = index[value];
        // Inorder visits left, root, right: [low, mid) is the left
        // subtree and [mid + 1, high) the right.
        node->left = build(preorder, index, position, low, mid);
        node->right = build(preorder, index, position, mid + 1, high);
        return node;
    }
};
