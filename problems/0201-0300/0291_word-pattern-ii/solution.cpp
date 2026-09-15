class Solution {
  public:
    bool wordPatternMatch(string pattern, string s) {
        // Depth-first walk over pattern positions with a two-way map:
        // forward (char -> word) keeps every later occurrence of the char
        // honest, backward (word -> char) enforces the bijection.
        unordered_map<char, string> charToWord;
        unordered_map<string, char> wordToChar;
        return match(pattern, s, 0, 0, charToWord, wordToChar);
    }

  private:
    bool match(const string &pattern, const string &s, int pi, int si, unordered_map<char, string> &charToWord,
               unordered_map<string, char> &wordToChar) {
        if (pi == (int)pattern.size()) {
            // Every char placed: a match only when s is fully consumed.
            return si == (int)s.size();
        }
        if (si == (int)s.size()) {
            // Chars remain but s is exhausted; mappings are non-empty.
            return false;
        }
        char letter = pattern[pi];
        auto found = charToWord.find(letter);
        if (found != charToWord.end()) {
            // A char already mapped must reproduce its word exactly.
            const string &word = found->second;
            return s.compare(si, word.size(), word) == 0 &&
                   match(pattern, s, pi + 1, si + word.size(), charToWord, wordToChar);
        }
        for (int end = si + 1; end <= (int)s.size(); end++) {
            string word = s.substr(si, end - si);
            // Bijection: the word is already another char's image.
            if (wordToChar.count(word))
                continue;
            charToWord[letter] = word;
            wordToChar[word] = letter;
            if (match(pattern, s, pi + 1, end, charToWord, wordToChar))
                return true;
            charToWord.erase(letter);
            wordToChar.erase(word);
        }
        return false;
    }
};
