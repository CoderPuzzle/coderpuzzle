#include <unordered_map>

// A trie whose nodes each count the inserted instances ending at the
// node (word_count) and passing through it (prefix_count). insert walks
// the word creating children on demand, bumping prefix_count along the
// path and word_count at the terminal; the two count queries walk their
// string as far as nodes exist and read the matching counter, answering
// 0 when the walk falls off the trie. erase — guaranteed by the
// constraints to name a present word — confirms a live instance with a
// first walk, then decrements the same counters on a second; nodes left
// at zero stay in place, since no live instance crosses them anymore.
class Trie {
  public:
    Trie() : root_(new Node) {}

    void insert(string word) {
        Node *node = root_;
        for (char character : word) {
            Node *&child = node->children[character];
            if (child == nullptr) {
                child = new Node;
            }
            node = child;
            node->prefix_count++;
        }
        node->word_count++;
    }

    int countWordsEqualTo(string word) {
        Node *node = root_;
        for (char character : word) {
            node = node->children[character];
            if (node == nullptr) {
                return 0;
            }
        }
        return node->word_count;
    }

    int countWordsStartingWith(string prefix) {
        Node *node = root_;
        for (char character : prefix) {
            node = node->children[character];
            if (node == nullptr) {
                return 0;
            }
        }
        return node->prefix_count;
    }

    void erase(string word) {
        Node *node = root_;
        for (char character : word) {
            node = node->children[character];
            if (node == nullptr) {
                return;
            }
        }
        if (node->word_count == 0) {
            return;
        }
        node = root_;
        for (char character : word) {
            node = node->children[character];
            node->prefix_count--;
        }
        node->word_count--;
    }

  private:
    struct Node {
        unordered_map<char, Node *> children;
        int word_count = 0;
        int prefix_count = 0;
    };

    Node *root_;
};
