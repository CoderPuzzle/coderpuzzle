class Solution {
  public:
    NodeWithNext *connect(NodeWithNext *root) {
        if (root == nullptr) {
            return nullptr;
        }
        queue<NodeWithNext *> level;
        level.push(root);
        while (!level.empty()) {
            // level.size() is this level's width; children pushed inside the
            // loop belong to the next level and never enter this round.
            int size = static_cast<int>(level.size());
            NodeWithNext *previous = nullptr;
            for (int i = 0; i < size; i++) {
                NodeWithNext *node = level.front();
                level.pop();
                // Link to whoever leaves the queue next within the same
                // level; the level's last node keeps the empty next it
                // started with.
                if (previous != nullptr)
                    previous->next = node;
                previous = node;
                if (node->left != nullptr)
                    level.push(node->left);
                if (node->right != nullptr)
                    level.push(node->right);
            }
        }
        return root;
    }
};
