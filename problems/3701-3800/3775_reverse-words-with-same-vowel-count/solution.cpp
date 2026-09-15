class Solution {
  public:
    string reverseWords(string s) {
        // The first word only fixes the target vowel count; each later
        // word matching it is reversed in place, everything else (word
        // order, separators) stays as-is.
        istringstream in(s);
        vector<string> words;
        string word;
        while (in >> word) {
            words.push_back(word);
        }
        auto countVowels = [](const string &w) {
            int count = 0;
            for (char c : w) {
                if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                    ++count;
                }
            }
            return count;
        };
        int target = countVowels(words[0]);
        for (size_t i = 1; i < words.size(); ++i) {
            if (countVowels(words[i]) == target) {
                reverse(words[i].begin(), words[i].end());
            }
        }
        string result = words[0];
        for (size_t i = 1; i < words.size(); ++i) {
            result += ' ';
            result += words[i];
        }
        return result;
    }
};
