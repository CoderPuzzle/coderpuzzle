class Solution {
  public:
    Node *moveSubTree(Node *root, Node *p, Node *q) {
        // Pass one records every node's parent in a registry keyed by value
        // (the values are unique; the root has no entry); pass two probes p's
        // subtree for q. The surgery is the same three edits either way --
        // the registry is what answers the lookups.
        unordered_map<int, Node *> parent;
        vector<Node *> stack{root};
        while (!stack.empty()) {
            Node *node = stack.back();
            stack.pop_back();
            for (Node *child : node->children) {
                parent[child->val] = node;
                stack.push_back(child);
            }
        }
        bool below = false;
        vector<Node *> probe{p};
        while (!probe.empty()) {
            Node *node = probe.back();
            probe.pop_back();
            if (node == q) {
                below = true;
                break;
            }
            probe.insert(probe.end(), node->children.begin(), node->children.end());
        }
        // p already hangs exactly where the move wants it: nothing to do.
        for (Node *child : q->children)
            if (child == p)
                return root;
        if (below) {
            Node *q_parent = parent[q->val];
            q_parent->children.erase(find(q_parent->children.begin(), q_parent->children.end(), q));
            if (!parent.count(p->val)) { // p is the root: q takes over
                q->children.push_back(p);
                return q;
            }
            Node *holder = parent[p->val];
            *find(holder->children.begin(), holder->children.end(), p) = q;
            q->children.push_back(p);
            return root;
        }
        Node *p_parent = parent[p->val];
        p_parent->children.erase(find(p_parent->children.begin(), p_parent->children.end(), p));
        q->children.push_back(p);
        return root;
    }
};
