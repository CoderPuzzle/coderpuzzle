class Solution {
  public:
    string replaceWords(vector<string> &dictionary, string sentence) {
        // The trie stores every root once; a node's `end` marks that a root
        // stops exactly there. Walking a word's own letters visits its
        // prefixes shortest first, so the first `end` on the path is the
        // shortest matching root — no per-length retries, and no length cap:
        // the tree has no branches deeper than the longest root anyway.
        Node trie;
        for (const string &root : dictionary) {
            Node *node = &trie;
            for (char letter : root) {
                int slot = letter - 'a';
                if (node->children[slot] == nullptr) {
                    node->children[slot] = new Node();
                }
                node = node->children[slot];
            }
            node->end = true;
        }
        // A walk that falls off the tree, or finishes without ever reaching
        // an `end`, found no root prefix — the word stands for itself.
        string result;
        string word;
        istringstream stream(sentence);
        bool first = true;
        while (stream >> word) {
            Node *node = &trie;
            for (int index = 0; index < (int)word.size(); index++) {
                node = node->children[word[index] - 'a'];
                if (node == nullptr) {
                    break;
                }
                if (node->end) {
                    word.resize(index + 1);
                    break;
                }
            }
            if (!first) {
                result += ' ';
            }
            first = false;
            result += word;
        }
        return result;
    }

  private:
    struct Node {
        Node *children[26] = {};
        bool end = false;
    };
};
