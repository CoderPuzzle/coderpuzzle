#include <string>
#include <vector>

// Two tries, one word list per node: a prefix trie spelling every word
// forward and a suffix trie spelling every word reversed, so a suffix
// reads down it front to back. Words are inserted in index order, so
// every node's list ascends, and f() walks pref down the first
// trie and suff reversed down the second, then merges the two hit nodes'
// lists from their tails -- the first equal pair is the largest shared
// index, and a walk that falls off its trie means no word matches that
// half, answering -1.
class WordFilter {
  public:
    WordFilter(vector<string> words) {
        for (int index = 0; index < (int)words.size(); ++index) {
            const string &word = words[index];
            Node *node = &prefixes;
            for (char character : word) {
                node = node->step(character);
                node->indices.push_back(index);
            }
            node = &suffixes;
            for (int position = (int)word.size() - 1; position >= 0; --position) {
                node = node->step(word[position]);
                node->indices.push_back(index);
            }
        }
    }

    int f(string pref, string suff) {
        const Node *forward = walk(pref);
        if (forward == nullptr) {
            return -1;
        }
        const Node *backward = walkReversed(suff);
        if (backward == nullptr) {
            return -1;
        }
        const vector<int> &front = forward->indices;
        const vector<int> &back = backward->indices;
        int i = (int)front.size() - 1;
        int j = (int)back.size() - 1;
        while (i >= 0 && j >= 0) {
            if (front[i] == back[j]) {
                return front[i];
            }
            if (front[i] > back[j]) {
                --i;
            } else {
                --j;
            }
        }
        return -1;
    }

  private:
    struct Node {
        Node *children[26] = {};
        vector<int> indices;

        // Returns the child slot for character, creating it on first use.
        Node *step(char character) {
            Node *&slot = children[character - 'a'];
            if (slot == nullptr) {
                slot = new Node;
            }
            return slot;
        }
    };

    // Walks pref down the prefix trie; nullptr as soon as a slot is empty.
    const Node *walk(const string &pref) const {
        const Node *node = &prefixes;
        for (char character : pref) {
            node = node->children[character - 'a'];
            if (node == nullptr) {
                return nullptr;
            }
        }
        return node;
    }

    // Walks suff down the suffix trie, whose edges spell the reversed
    // words, so the characters are consumed from the end; nullptr as soon
    // as a slot is empty.
    const Node *walkReversed(const string &suff) const {
        const Node *node = &suffixes;
        for (int index = (int)suff.size() - 1; index >= 0; --index) {
            node = node->children[suff[index] - 'a'];
            if (node == nullptr) {
                return nullptr;
            }
        }
        return node;
    }

    Node prefixes;
    Node suffixes;
};
