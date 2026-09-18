#include <string>
#include <unordered_set>

class Trie {
  public:
    Trie() {}

    void insert(std::string word) {
        words.insert(word);
        // Record every beginning, the word itself included — a word begins
        // with itself, so it is its own longest prefix.
        for (std::size_t end = 1; end <= word.size(); end++) {
            prefixes.insert(word.substr(0, end));
        }
    }

    bool search(std::string word) { return words.count(word) > 0; }

    bool startsWith(std::string prefix) { return prefixes.count(prefix) > 0; }

  private:
    // One set of whole words, one set of every beginning of every word;
    // nothing is shared between words beyond accidental hash collisions.
    std::unordered_set<std::string> words;
    std::unordered_set<std::string> prefixes;
};
