class Solution {
  public:
    Node *findRoot(vector<Node *> tree) {
        // Indegree zero: every node except the root appears exactly once as
        // someone's child. Collect all the nodes, then discard every node
        // seen as a child — the one survivor is the root.
        unordered_set<Node *> survivors(tree.begin(), tree.end());
        for (Node *node : tree) {
            for (Node *child : node->children) {
                survivors.erase(child);
            }
        }
        return *survivors.begin();
    }
};
