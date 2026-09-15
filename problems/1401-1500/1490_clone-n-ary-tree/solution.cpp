class Solution {
  public:
    Node *cloneTree(Node *root) {
        if (root == nullptr)
            return nullptr;
        // Level-order copy: every original node gets exactly one fresh
        // clone, and the registry records which clone belongs to it, so
        // each original child link is replayed through the registry.
        unordered_map<Node *, Node *> clones;
        clones[root] = new Node(root->val);
        queue<Node *> frontier;
        frontier.push(root);
        while (!frontier.empty()) {
            Node *node = frontier.front();
            frontier.pop();
            for (Node *child : node->children) {
                clones[child] = new Node(child->val);
                clones[node]->children.push_back(clones[child]);
                frontier.push(child);
            }
        }
        return clones[root];
    }
};
