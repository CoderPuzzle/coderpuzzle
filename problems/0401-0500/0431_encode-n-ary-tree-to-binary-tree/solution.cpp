class Solution {
  public:
    TreeNode *encode(Node *root) {
        if (root == nullptr)
            return nullptr;
        TreeNode *broot = new TreeNode(root->val);
        vector<pair<Node *, TreeNode *>> queue{{root, broot}};
        size_t qi = 0;
        while (qi < queue.size()) {
            Node *node = queue[qi].first;
            TreeNode *bnode = queue[qi].second;
            qi += 1;
            TreeNode *prev = nullptr;
            for (Node *child : node->children) {
                TreeNode *bchild = new TreeNode(child->val);
                if (prev == nullptr) {
                    bnode->left = bchild;
                } else {
                    prev->right = bchild;
                }
                prev = bchild;
                queue.push_back({child, bchild});
            }
        }
        return broot;
    }
};
