class Solution {
  public:
    vector<int> rightSideView(TreeNode *root) {
        // Depth-first with the right child tried first: at every depth the
        // first node popped is the rightmost one there, the node the right
        // edge sees.
        vector<int> view;
        vector<pair<TreeNode *, int>> stack;
        if (root != nullptr) {
            stack.push_back({root, 0});
        }
        while (!stack.empty()) {
            pair<TreeNode *, int> top = stack.back();
            stack.pop_back();
            // A depth earns its entry only on that first arrival; every
            // later node popped at the same depth sits further left.
            if (top.second == (int)view.size()) {
                view.push_back(top.first->val);
            }
            // Left pushed before right, so the right child pops first.
            if (top.first->left != nullptr)
                stack.push_back({top.first->left, top.second + 1});
            if (top.first->right != nullptr)
                stack.push_back({top.first->right, top.second + 1});
        }
        return view;
    }
};
