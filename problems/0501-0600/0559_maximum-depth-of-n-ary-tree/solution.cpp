class Solution {
  public:
    int maxDepth(Node *root) {
        if (root == nullptr)
            return 0;
        int depth = 0;
        vector<Node *> level{root};
        while (!level.empty()) {
            depth += 1;
            vector<Node *> next;
            for (Node *node : level) {
                for (Node *child : node->children)
                    next.push_back(child);
            }
            level = next;
        }
        return depth;
    }
};
