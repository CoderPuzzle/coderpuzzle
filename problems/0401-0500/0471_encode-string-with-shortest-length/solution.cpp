class Solution {
  public:
    string encode(string s) {
        int n = (int)s.size();
        // dp[i][j] = shortest encoding of s[i..j]; growing interval lengths
        // guarantee every subinterval is solved before it is needed.
        vector<vector<string>> dp(n, vector<string>(n));
        for (int length = 1; length <= n; length++) {
            for (int i = 0; i + length <= n; i++) {
                int j = i + length - 1;
                string substr = s.substr(i, length);
                // Candidate 1: keep the substring verbatim.
                string best = substr;
                // Candidate 2: split in two, concatenate optimal encodings.
                for (int k = i; k < j; k++) {
                    string candidate = dp[i][k] + dp[k + 1][j];
                    if ((int)candidate.size() < (int)best.size()) {
                        best = candidate;
                    }
                }
                string compression;
                bool hasCompression = false;
                // Candidate 3: k[pattern] when a period divides the
                // interval. Embedding the pattern's own encoding (not raw
                // text) gives nested forms like 4[2[a]] for free.
                for (int p = 1; p < length; p++) {
                    if (length % p == 0) {
                        string pattern = s.substr(i, p);
                        string repeated;
                        for (int t = 0; t < length / p; t++) {
                            repeated += pattern;
                        }
                        if (repeated == substr) {
                            string encoded = to_string(length / p) + "[" + dp[i][i + p - 1] + "]";
                            if (!hasCompression || (int)encoded.size() < (int)compression.size()) {
                                compression = encoded;
                                hasCompression = true;
                            }
                        }
                    }
                }
                // Encode only if strictly shorter — or tied against an
                // already-encoded best; a tie with the raw text keeps the
                // text ("aaa" stays "aaa", "aaaaa" becomes "5[a]").
                if (hasCompression) {
                    if ((int)compression.size() < (int)best.size() ||
                        ((int)compression.size() == (int)best.size() && best != substr)) {
                        best = compression;
                    }
                }
                dp[i][j] = best;
            }
        }
        return dp[0][n - 1];
    }
};
