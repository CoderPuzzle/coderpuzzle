class Solution {
  public:
    Node *moveSubTree(Node *root, Node *p, Node *q) {
        // One sweep gathers the facts the rewiring needs: p's parent, q's
        // parent, and whether q sits inside p's subtree -- depth counts how
        // many levels below p the walk currently is (0 means outside).
        Node *p_parent = nullptr, *q_parent = nullptr;
        bool q_below = false;
        vector<tuple<Node *, Node *, int>> stack{{root, nullptr, 0}};
        while (!stack.empty()) {
            auto [node, parent, depth] = stack.back();
            stack.pop_back();
            if (node == p)
                p_parent = parent;
            if (node == q) {
                q_parent = parent;
                q_below = depth > 0;
            }
            int next = (depth || node == p) ? depth + 1 : 0;
            for (Node *child : node->children)
                stack.push_back({child, node, next});
        }
        // p already hangs exactly where the move wants it: nothing to do.
        for (Node *child : q->children)
            if (child == p)
                return root;
        if (q_below) {
            // Case 1: q travels inside p's subtree, so free q and re-hang it
            // where p stood -- in p's parent's children list, or at the root
            // when p is the root -- before p becomes q's last child.
            q_parent->children.erase(find(q_parent->children.begin(), q_parent->children.end(), q));
            if (p_parent == nullptr) {
                q->children.push_back(p);
                return q;
            }
            *find(p_parent->children.begin(), p_parent->children.end(), p) = q;
            q->children.push_back(p);
            return root;
        }
        // Cases 2 and 3: a plain re-attachment of p (with its subtree).
        p_parent->children.erase(find(p_parent->children.begin(), p_parent->children.end(), p));
        q->children.push_back(p);
        return root;
    }
};
