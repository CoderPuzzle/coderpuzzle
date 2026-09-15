#include <algorithm>
#include <string>

class Solution {
  public:
    string reversePrefix(string word, string ch) {
        // Find the first occurrence of ch; if it is absent the word is
        // returned unchanged. Otherwise flip word[0..i] in place (word
        // is a by-value copy) and return it.
        size_t i = word.find(ch);
        if (i == string::npos) {
            return word;
        }
        reverse(word.begin(), word.begin() + (long)i + 1);
        return word;
    }
};
