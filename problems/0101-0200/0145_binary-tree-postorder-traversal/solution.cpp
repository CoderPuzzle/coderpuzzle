class Solution {
  public:
    vector<int> postorderTraversal(TreeNode *root) {
        vector<int> result;
        if (root == nullptr) {
            return result;
        }
        stack<TreeNode *> st;
        st.push(root);
        // Loop invariant: `st` holds nodes still to be expanded; each is
        // emitted the moment it is popped. Children are pushed left first,
        // so the right child is always expanded before the left one.
        while (!st.empty()) {
            TreeNode *node = st.top();
            st.pop();
            result.push_back(node->val);
            // Left first, right on top: the emits so far read root, right,
            // left — preorder with the two children swapped.
            if (node->left != nullptr) {
                st.push(node->left);
            }
            if (node->right != nullptr) {
                st.push(node->right);
            }
        }
        // Root-right-left read backwards is left-right-root: postorder.
        reverse(result.begin(), result.end());
        return result;
    }
};
