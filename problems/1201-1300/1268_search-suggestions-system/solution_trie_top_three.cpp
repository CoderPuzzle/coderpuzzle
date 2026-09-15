class Solution {
  public:
    vector<vector<string>> suggestedProducts(vector<string> &products, string searchWord) {
        // one trie node: 26 child slots indexed by c - 'a'; word is set when a
        // products word ends here, top caches the best three words through it
        struct Node {
            Node *children[26] = {};
            const string *word = nullptr;
            vector<const string *> top;
        };
        Node root;
        // spell every word down the tree; nodes appear only where needed
        for (const string &word : products) {
            Node *node = &root;
            for (char letter : word) {
                int slot = letter - 'a';
                if (node->children[slot] == nullptr) {
                    node->children[slot] = new Node();
                }
                node = node->children[slot];
            }
            node->word = &word;
        }
        // merge phase, deepest nodes first: a node's best three are its own
        // word — a prefix of every other word through it, hence the smallest
        // — followed by the children's lists in letter order; every existing
        // child already holds a non-empty list, so gathering stops by the
        // third child consulted
        vector<Node *> order;
        vector<Node *> pending = {&root};
        while (!pending.empty()) {
            Node *node = pending.back();
            pending.pop_back();
            order.push_back(node);
            for (Node *child : node->children) {
                if (child != nullptr) {
                    pending.push_back(child);
                }
            }
        }
        for (auto it = order.rbegin(); it != order.rend(); ++it) {
            Node *node = *it;
            vector<const string *> top;
            if (node->word != nullptr) {
                top.push_back(node->word);
            }
            for (Node *child : node->children) {
                if (top.size() >= 3) {
                    break;
                }
                if (child != nullptr) {
                    for (const string *candidate : child->top) {
                        if (top.size() >= 3) {
                            break;
                        }
                        top.push_back(candidate);
                    }
                }
            }
            node->top = move(top);
        }
        // a keystroke is one pointer move; once a slot is empty it stays
        // empty, because prefixes only ever grow
        vector<vector<string>> result;
        Node *node = &root;
        for (char letter : searchWord) {
            if (node != nullptr) {
                node = node->children[letter - 'a'];
            }
            if (node == nullptr) {
                result.push_back({});
            } else {
                vector<string> suggestions;
                suggestions.reserve(node->top.size());
                for (const string *word : node->top) {
                    suggestions.push_back(*word);
                }
                result.push_back(move(suggestions));
            }
        }
        return result;
    }
};
