class Solution {
  public:
    vector<int> preorderTraversal(TreeNode *root) {
        vector<int> result;
        if (root == nullptr)
            return result;
        stack<TreeNode *> st;
        st.push(root);
        // Loop invariant: `st` holds exactly the discovered-but-unvisited
        // nodes, in the order preorder wants them next.
        while (!st.empty()) {
            TreeNode *node = st.top();
            st.pop();
            // Preorder visits a node before either of its subtrees.
            result.push_back(node->val);
            // Push right before left: the stack pops from the top, so the
            // left child (and its entire subtree) is traversed first.
            if (node->right != nullptr)
                st.push(node->right);
            if (node->left != nullptr)
                st.push(node->left);
        }
        return result;
    }
};
