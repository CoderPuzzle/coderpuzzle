#include <memory>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
  public:
    string convertNumber(string s) {
        // Trie over the ten digit words: nodes own a child map keyed by
        // letter plus the digit whose word ends there ("" when none). No
        // word is a prefix of another, so a walk from any position crosses
        // at most one terminal, and the first terminal reached is exactly
        // where the word ends.
        struct TrieNode {
            unordered_map<char, unique_ptr<TrieNode>> children;
            string digit;
        };
        TrieNode root;
        const pair<const char *, const char *> words[10] = {{"zero", "0"},  {"one", "1"},  {"two", "2"}, {"three", "3"},
                                                            {"four", "4"},  {"five", "5"}, {"six", "6"}, {"seven", "7"},
                                                            {"eight", "8"}, {"nine", "9"}};
        for (const auto &[word, digit] : words) {
            TrieNode *node = &root;
            for (const char *ch = word; *ch != '\0'; ++ch) {
                auto &child = node->children[*ch];
                if (!child) {
                    child = make_unique<TrieNode>();
                }
                node = child.get();
            }
            node->digit = digit;
        }
        string digits;
        int n = s.size();
        int i = 0;
        while (i < n) {
            TrieNode *node = &root;
            int j = i;
            string hit;
            while (j < n) {
                auto it = node->children.find(s[j]);
                if (it == node->children.end()) {
                    break;
                }
                node = it->second.get();
                ++j;
                if (!node->digit.empty()) {
                    hit = node->digit;
                    break;
                }
            }
            if (hit.empty()) {
                ++i;
            } else {
                digits += hit;
                i = j;
            }
        }
        return digits;
    }
};
