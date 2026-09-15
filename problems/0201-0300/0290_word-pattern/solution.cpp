class Solution {
  public:
    bool wordPattern(string pattern, string s) {
        // The pattern holds under a bijection: each letter names exactly one
        // word, and no two letters share a word. Each clause is one map,
        // checked together in a single pass over letter/word pairs.
        vector<string> words;
        string word;
        for (char ch : s) {
            // Words are separated by a single space, so each space ends a word.
            if (ch == ' ') {
                words.push_back(word);
                word.clear();
            } else {
                word += ch;
            }
        }
        words.push_back(word);
        if (pattern.size() != words.size())
            // With counts different, letters and words cannot pair one-to-one.
            return false;
        unordered_map<char, string> letterToWord;
        unordered_map<string, char> wordToLetter;
        for (int index = 0; index < (int)words.size(); ++index) {
            char letter = pattern[index];
            const string &current = words[index];
            // One branch per direction: the letter already names a different
            // word, or the word is already claimed by a different letter.
            auto bound = letterToWord.find(letter);
            if (bound != letterToWord.end() && bound->second != current)
                return false;
            auto owner = wordToLetter.find(current);
            if (owner != wordToLetter.end() && owner->second != letter)
                return false;
            letterToWord[letter] = current;
            wordToLetter[current] = letter;
        }
        return true;
    }
};
