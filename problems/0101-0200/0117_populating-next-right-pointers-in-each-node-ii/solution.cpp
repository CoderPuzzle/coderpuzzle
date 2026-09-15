class Solution {
  public:
    NodeWithNext *connect(NodeWithNext *root) {
        for (NodeWithNext *level = root; level != nullptr;) {
            NodeWithNext *head = nullptr;
            NodeWithNext *tail = nullptr;
            for (NodeWithNext *node = level; node != nullptr; node = node->next) {
                for (NodeWithNext *child : {node->left, node->right}) {
                    if (child == nullptr)
                        continue;
                    if (head == nullptr)
                        head = child;
                    else
                        tail->next = child;
                    tail = child;
                }
            }
            level = head;
        }
        return root;
    }
};
