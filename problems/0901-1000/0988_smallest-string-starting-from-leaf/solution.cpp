class Solution {
  public:
    string smallestFromLeaf(TreeNode *root) {
        // Every root-to-leaf path, read backwards, is one candidate, and
        // the answer is the smallest of them — plain lexicographic order,
        // in which a strict prefix counts as smaller ("ab" < "aba"). One
        // shared path buffer holds a character per active root->node
        // frame: descending appends, unwinding pops, so no frame ever
        // carries a copy of its parent's path, and the buffer is reversed
        // into a candidate string only at a leaf. std::string's `<` does
        // the comparing — character by character, strict prefix smaller —
        // which is exactly the statement's rule.
        // Iterative on purpose: the 8500-node chain the constraints allow
        // is far deeper than any of the judge's runtimes may recurse; the
        // explicit stack is one entry per node or unwind marker and never
        // nests a call.
        string best; // empty doubles as "no candidate yet" — no real candidate is ever empty
        string path; // one character per active frame, root -> node
        // A stack entry is a node to descend into, or an unwind marker;
        // the pointer is null exactly when the entry unwinds.
        vector<pair<TreeNode *, char>> pending;
        pending.push_back({root, 0});
        while (!pending.empty()) {
            auto [node, marker] = pending.back();
            pending.pop_back();
            if (node == nullptr) {
                path.pop_back();
                continue;
            }
            path.push_back(char('a' + node->val));
            if (node->left == nullptr && node->right == nullptr) {
                string candidate(path.rbegin(), path.rend());
                if (best.empty() || candidate < best) {
                    best = candidate;
                }
                path.pop_back(); // a leaf unwinds its own character
                continue;
            }
            pending.push_back({nullptr, 0}); // unwinds once both subtrees finish
            if (node->right != nullptr)
                pending.push_back({node->right, 0});
            if (node->left != nullptr)
                pending.push_back({node->left, 0});
        }
        return best;
    }
};
