class Solution {
  public:
    TreeNode *bstFromPreorder(vector<int> &preorder) {
        int index = 0;
        return build(preorder, index, LLONG_MIN, LLONG_MAX);
    }

  private:
    TreeNode *build(vector<int> &preorder, int &index, long long low, long long high) {
        if (index == (int)preorder.size()) {
            return nullptr;
        }
        int value = preorder[index];
        // outside this subtree's bounds: the value belongs to some
        // ancestor's right subtree — peek but do not consume
        if (value < low || value > high) {
            return nullptr;
        }
        index++;
        TreeNode *node = new TreeNode(value);
        // preorder emits root, then the whole left subtree, then the
        // right one, so claiming left first matches the array order
        node->left = build(preorder, index, low, (long long)value - 1);
        node->right = build(preorder, index, (long long)value + 1, high);
        return node;
    }
};
