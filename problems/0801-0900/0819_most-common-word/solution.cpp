class Solution {
  public:
    string mostCommonWord(string paragraph, vector<string> &banned) {
        unordered_set<string> bannedSet(banned.begin(), banned.end());
        unordered_map<string, int> counts;
        string bestWord;
        int bestCount = 0;
        // The trailing space closes a word still open when the paragraph
        // ends, so the loop never needs a separate flush.
        paragraph += ' ';
        string word;
        for (char c : paragraph) {
            // ASCII puts every uppercase letter 32 codes above its
            // lowercase twin, so one range check + 32 folds the case;
            // every other character matches neither range and cuts the
            // word instead of joining it.
            if (c >= 'A' && c <= 'Z') {
                word += char(c + 32);
            } else if (c >= 'a' && c <= 'z') {
                word += c;
            } else if (!word.empty()) {
                if (bannedSet.find(word) == bannedSet.end()) {
                    int count = ++counts[word];
                    // Strictly greater keeps the earlier word on equal
                    // counts; the statement guarantees the answer is
                    // unique, so no tie ever reaches this comparison.
                    if (count > bestCount) {
                        bestCount = count;
                        bestWord = word;
                    }
                }
                word.clear();
            }
        }
        return bestWord;
    }
};
