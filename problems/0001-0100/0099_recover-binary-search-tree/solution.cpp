class Solution {
  public:
    TreeNode *recoverTree(TreeNode *root) {
        stack<TreeNode *> st;
        TreeNode *node = root;
        TreeNode *prev = nullptr;
        TreeNode *first = nullptr;
        TreeNode *second = nullptr;
        // Loop invariant: `st` holds the ancestors whose left subtrees are
        // still being descended into; `node` is the next subtree to process
        // (nullptr means it is time to pop back up instead). Inorder of a
        // healthy BST is strictly ascending, so a predecessor greater than its
        // successor marks a misplaced pair: the node before the FIRST descent
        // and after the LAST descent are the two swapped nodes.
        while (node != nullptr || !st.empty()) {
            // Descend the left spine, remembering every node on it.
            while (node != nullptr) {
                st.push(node);
                node = node->left;
            }
            node = st.top();
            st.pop();
            if (prev != nullptr && prev->val > node->val) {
                if (first == nullptr) {
                    first = prev;
                }
                second = node;
            }
            prev = node;
            node = node->right;
        }
        // Swap only values: nodes and links stay put ("without changing its
        // structure"), and the repaired root flows back to the judge.
        int temp = first->val;
        first->val = second->val;
        second->val = temp;
        return root;
    }
};
