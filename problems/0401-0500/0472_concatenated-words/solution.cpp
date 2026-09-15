class Solution {
  public:
    vector<string> findAllConcatenatedWordsInADict(vector<string> &words) {
        unordered_set<string> dictionary(words.begin(), words.end());

        vector<string> result;
        for (const string &word : words) {
            if (isConcatenated(word, dictionary)) {
                result.push_back(word);
            }
        }
        return result;
    }

  private:
    bool isConcatenated(const string &word, const unordered_set<string> &dictionary) {
        int n = (int)word.size();
        // Word-break DP: dp[i] = the first i chars split entirely into
        // dictionary words (dp[0] = empty prefix).
        vector<bool> dp(n + 1, false);
        dp[0] = true;
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                // Excluding the whole-word split forces >= 2 pieces; only
                // proper substrings are looked up, so the unfiltered set of
                // all words is safe.
                if (j == 0 && i == n) {
                    continue; // the word itself does not count as a part
                }
                if (dp[j] && dictionary.count(word.substr(j, i - j))) {
                    // One valid split per position suffices.
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
};
