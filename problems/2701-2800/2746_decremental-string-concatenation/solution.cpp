class Solution {
  public:
    int minimizeConcatenatedLength(vector<string> &words) {
        // dp[first][last] = shortest length of a concatenation of the words
        // processed so far starting with `first` and ending with `last`.
        const int INF = INT_MAX;
        int dp[26][26];
        for (int f = 0; f < 26; ++f) {
            for (int l = 0; l < 26; ++l) {
                dp[f][l] = INF;
            }
        }
        dp[words[0].front() - 'a'][words[0].back() - 'a'] = words[0].size();
        for (size_t i = 1; i < words.size(); ++i) {
            const string &word = words[i];
            int wordFirst = word.front() - 'a';
            int wordLast = word.back() - 'a';
            int length = word.size();
            int ndp[26][26];
            for (int f = 0; f < 26; ++f) {
                for (int l = 0; l < 26; ++l) {
                    ndp[f][l] = INF;
                }
            }
            for (int f = 0; f < 26; ++f) {
                for (int l = 0; l < 26; ++l) {
                    int current = dp[f][l];
                    if (current == INF) {
                        continue;
                    }
                    // Append on the right: seam merges when our last char
                    // equals the word's first char.
                    int appended = current + length;
                    if (l == wordFirst) {
                        --appended;
                    }
                    if (appended < ndp[f][wordLast]) {
                        ndp[f][wordLast] = appended;
                    }
                    // Prepend on the left: seam merges when the word's last
                    // char equals our first char.
                    int prepended = current + length;
                    if (wordLast == f) {
                        --prepended;
                    }
                    if (prepended < ndp[wordFirst][l]) {
                        ndp[wordFirst][l] = prepended;
                    }
                }
            }
            memcpy(dp, ndp, sizeof(dp));
        }
        int best = INF;
        for (int f = 0; f < 26; ++f) {
            for (int l = 0; l < 26; ++l) {
                best = min(best, dp[f][l]);
            }
        }
        return best;
    }
};
