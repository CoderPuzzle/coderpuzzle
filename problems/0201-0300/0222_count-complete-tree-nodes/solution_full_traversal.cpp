class Solution {
  public:
    int countNodes(TreeNode *root) {
        // Count every node the plain way: run down each left spine, then
        // pop back for the right turns. The stack holds one node per level.
        int count = 0;
        vector<TreeNode *> stack;
        TreeNode *node = root;
        while (node != nullptr || !stack.empty()) {
            while (node != nullptr) {
                count += 1;
                stack.push_back(node);
                node = node->left;
            }
            node = stack.back()->right;
            stack.pop_back();
        }
        return count;
    }
};
