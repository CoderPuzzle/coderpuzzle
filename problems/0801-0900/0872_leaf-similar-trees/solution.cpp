class Solution {
  public:
    bool leafSimilar(TreeNode *root1, TreeNode *root2) {
        // Two trees are leaf-similar exactly when their leaf value
        // sequences agree, so the whole question is writing each sequence
        // down and comparing them.
        return leafValues(root1) == leafValues(root2);
    }

  private:
    // The walk carries an explicit stack: pop a node, record its value
    // when both children are missing — that node is a leaf — otherwise
    // push the right child and then the left, so the left subtree is
    // always the next to pop and the values come out in left-to-right
    // order. Only leaves are recorded, so internal values and the shapes
    // above the leaves never enter the comparison; an exhausted stack
    // means the sequence is complete.
    vector<int> leafValues(TreeNode *root) {
        vector<int> values;
        vector<TreeNode *> pending{root};
        while (!pending.empty()) {
            TreeNode *node = pending.back();
            pending.pop_back();
            if (node->left == nullptr && node->right == nullptr) {
                values.push_back(node->val);
                continue;
            }
            if (node->right != nullptr)
                pending.push_back(node->right);
            if (node->left != nullptr)
                pending.push_back(node->left);
        }
        return values;
    }
};
