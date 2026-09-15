class Solution {
  public:
    string longestWord(vector<string> &words) {
        // The trie stores every word once; a node's `end` marks where a word
        // stops. Walking only through `end` nodes keeps every spelled prefix
        // a word, so each path the walk takes is a buildable word.
        Node root;
        for (const auto &word : words) {
            Node *node = &root;
            for (char character : word) {
                int index = character - 'a';
                if (!node->children[index]) {
                    node->children[index] = new Node();
                }
                node = node->children[index];
            }
            node->end = true;
        }
        string best;
        walk(&root, "", best);
        // Nothing buildable at all: the statement's empty-string answer.
        return best;
    }

  private:
    struct Node {
        Node *children[26] = {};
        bool end = false;
    };

    static void walk(const Node *node, const string &path, string &best) {
        // Strictly longer wins; among equal lengths the smaller word
        // wins — compared explicitly, never via child order.
        if (path.size() > best.size() || (path.size() == best.size() && path < best)) {
            best = path;
        }
        for (int index = 0; index < 26; ++index) {
            const Node *child = node->children[index];
            if (child && child->end) {
                walk(child, path + static_cast<char>('a' + index), best);
            }
        }
    }
};
