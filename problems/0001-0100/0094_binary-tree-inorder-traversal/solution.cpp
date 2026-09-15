class Solution {
  public:
    vector<int> inorderTraversal(TreeNode *root) {
        vector<int> result;
        stack<TreeNode *> st;
        TreeNode *node = root;
        // Loop invariant: `st` holds the ancestors whose left subtrees are
        // still being descended into; `node` is the next subtree to process
        // (nullptr means it is time to pop back up instead).
        while (node != nullptr || !st.empty()) {
            // Descend the left spine, remembering every node on it.
            while (node != nullptr) {
                st.push(node);
                node = node->left;
            }
            // The stack top is now the leftmost unvisited node of the
            // current subtree — the next value in inorder order.
            node = st.top();
            st.pop();
            result.push_back(node->val);
            // The popped node's left subtree is done; traverse its right
            // subtree in full before any ancestor below it is visited.
            node = node->right;
        }
        return result;
    }
};
