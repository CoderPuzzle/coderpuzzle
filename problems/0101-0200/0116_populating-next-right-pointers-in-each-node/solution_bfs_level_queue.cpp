class Solution {
  public:
    NodeWithNext *connect(NodeWithNext *root) {
        if (root == nullptr)
            return nullptr;
        queue<NodeWithNext *> q;
        q.push(root);
        while (!q.empty()) {
            // Snapshot the width now: children pushed below belong to the
            // next level, so draining exactly this many nodes walks one
            // level per round.
            int width = static_cast<int>(q.size());
            NodeWithNext *previous = nullptr;
            for (int i = 0; i < width; i++) {
                NodeWithNext *node = q.front();
                q.pop();
                // The node dequeued just before this one is exactly its
                // right-hand neighbor; the level's last node finds no
                // successor and keeps its empty `next`.
                if (previous != nullptr)
                    previous->next = node;
                previous = node;
                if (node->left != nullptr)
                    q.push(node->left);
                if (node->right != nullptr)
                    q.push(node->right);
            }
        }
        return root;
    }
};
