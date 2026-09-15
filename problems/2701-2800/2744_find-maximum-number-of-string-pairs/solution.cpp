class Solution {
  public:
    int maximumNumberOfStringPairs(vector<string> &words) {
        // A word pairs only with its reversal among earlier words: look up
        // before inserting, so a word can never pair with itself. Distinct
        // strings make each candidate partner unique, so counting every hit
        // is optimal — palindromes can never find an earlier copy at all.
        unordered_set<string> seen;
        int pairs = 0;
        for (const string &word : words) {
            string reversed(word.rbegin(), word.rend());
            if (seen.count(reversed)) {
                ++pairs;
            }
            seen.insert(word);
        }
        return pairs;
    }
};
