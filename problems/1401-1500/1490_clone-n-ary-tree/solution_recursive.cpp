class Solution {
  public:
    Node *cloneTree(Node *root) {
        if (root == nullptr)
            return nullptr;
        Node *clone = new Node(root->val);
        for (Node *child : root->children)
            clone->children.push_back(cloneTree(child));
        return clone;
    }
};
