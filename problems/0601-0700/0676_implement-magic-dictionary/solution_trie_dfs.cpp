#include <string>

// The dictionary spelled down a trie; each buildDict REPLACES the previous
// tree, so search only ever sees the latest call's words. The child
// holding the query's own letter continues for free, any other child spends
// the single change, and success means a flagged node at the query's end
// with the change spent.
class MagicDictionary {
  public:
    MagicDictionary() {}

    void buildDict(vector<string> dictionary) {
        root = TrieNode();
        for (const string &word : dictionary) {
            TrieNode *node = &root;
            for (char letter : word) {
                int slot = letter - 'a';
                if (node->children[slot] == nullptr) {
                    node->children[slot] = new TrieNode();
                }
                node = node->children[slot];
            }
            node->end = true;
        }
    }

    bool search(string searchWord) { return descend(&root, searchWord, 0, 1); }

  private:
    struct TrieNode {
        TrieNode *children[26] = {};
        bool end = false;
    };

    bool descend(const TrieNode *node, const string &word, size_t index, int editsLeft) const {
        if (index == word.size()) {
            return node->end && editsLeft == 0;
        }
        int wanted = word[index] - 'a';
        for (int slot = 0; slot < 26; ++slot) {
            const TrieNode *child = node->children[slot];
            if (child == nullptr) {
                continue;
            }
            int remaining = editsLeft;
            if (slot != wanted) {
                --remaining;
            }
            if (remaining >= 0 && descend(child, word, index + 1, remaining)) {
                return true;
            }
        }
        return false;
    }

    TrieNode root;
};
