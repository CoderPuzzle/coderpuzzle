class Solution {
  public:
    TreeNode *recoverFromPreorder(string traversal) {
        // Parse the string into (depth, value) pairs: a run of dashes gives
        // the depth, then a run of digits gives the value (values are
        // guaranteed positive, so no '-' ever appears inside a digit run).
        int n = traversal.size();
        int i = 0;
        vector<TreeNode *> stack;
        while (i < n) {
            int depth = 0;
            while (i < n && traversal[i] == '-') {
                depth++;
                i++;
            }
            int j = i;
            while (j < n && isdigit(traversal[j])) {
                j++;
            }
            int value = stoi(traversal.substr(i, j - i));
            i = j;
            // The node at this depth replaces everything deeper than it on
            // the current path; whatever remains on top is its parent.
            while ((int)stack.size() > depth) {
                stack.pop_back();
            }
            TreeNode *node = new TreeNode(value);
            if (!stack.empty()) {
                TreeNode *parent = stack.back();
                if (parent->left == nullptr) {
                    parent->left = node;
                } else {
                    parent->right = node;
                }
            }
            stack.push_back(node);
        }
        return stack.empty() ? nullptr : stack[0];
    }
};
