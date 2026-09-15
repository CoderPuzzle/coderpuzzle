class Solution {
  public:
    NodeWithNext *connect(NodeWithNext *root) {
        if (root == nullptr)
            return nullptr;
        NodeWithNext *level = root;
        while (level->left != nullptr) {
            for (NodeWithNext *head = level; head != nullptr; head = head->next) {
                head->left->next = head->right;
                if (head->next != nullptr)
                    head->right->next = head->next->left;
            }
            level = level->left;
        }
        return root;
    }
};
