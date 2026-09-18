#include <string>

class Trie {
  public:
    Trie() {}

    void insert(std::string word) {
        Node *node = &root;
        // One trie node: 26 child slots indexed by c - 'a' plus a
        // whole-word terminator flag; nodes appear lazily on insert.
        for (char letter : word) {
            int slot = letter - 'a';
            if (node->children[slot] == nullptr) {
                node->children[slot] = new Node();
            }
            node = node->children[slot];
        }
        node->end = true;
    }

    bool search(std::string word) {
        Node *node = walk(word);
        return node != nullptr && node->end;
    }

    bool startsWith(std::string prefix) { return walk(prefix) != nullptr; }

  private:
    struct Node {
        Node *children[26] = {};
        bool end = false;
    };

    // Walks one node per character; nullptr as soon as a slot is empty.
    Node *walk(const std::string &text) {
        Node *node = &root;
        for (std::size_t index = 0; index < text.size() && node != nullptr; index++) {
            node = node->children[text[index] - 'a'];
        }
        return node;
    }

    Node root;
};
