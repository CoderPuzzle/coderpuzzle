class Solution {
  public:
    int canBeTypedWords(string text, string brokenLetters) {
        // Broken keys form a boolean table; a word is typable only when
        // none of its letters are marked broken.
        bool broken[26] = {};
        for (char ch : brokenLetters) {
            broken[ch - 'a'] = true;
        }
        int count = 0;
        for (int i = 0; i < (int)text.size();) {
            int j = text.find(' ', i);
            if (j == string::npos) {
                j = text.size();
            }
            bool ok = true;
            for (int k = i; k < j; ++k) {
                if (broken[text[k] - 'a']) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                count++;
            }
            i = j + 1;
        }
        return count;
    }
};
