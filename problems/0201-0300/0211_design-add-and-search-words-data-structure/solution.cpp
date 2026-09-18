class WordDictionary {
  public:
    WordDictionary() : rootNode(new Node()) {}

    void addWord(string word) {
        Node *node = rootNode;
        for (char letter : word) {
            int slot = letter - 'a';
            if (node->children[slot] == nullptr) {
                node->children[slot] = new Node();
            }
            node = node->children[slot];
        }
        node->end = true;
    }

    bool search(string word) {
        query = word;
        return match(rootNode, 0);
    }

  private:
    // One trie node: 26 child slots indexed by c - 'a' plus a whole-word
    // terminator flag.
    struct Node {
        Node *children[26] = {};
        bool end = false;
    };

    // A letter descends its single slot; a dot tries every non-empty slot.
    bool match(Node *node, int index) const {
        if (node == nullptr) {
            return false;
        }
        if (index == (int)query.size()) {
            return node->end;
        }
        char letter = query[index];
        if (letter == '.') {
            for (Node *child : node->children) {
                if (match(child, index + 1)) {
                    return true;
                }
            }
            return false;
        }
        return match(node->children[letter - 'a'], index + 1);
    }

    Node *rootNode;
    string query;
};
