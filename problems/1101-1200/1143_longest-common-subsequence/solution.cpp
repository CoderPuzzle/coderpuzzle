class Solution {
  public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size();
        int n = text2.size();
        // dp row for the empty prefix of text1 (all zeros); each new row only
        // reads the row above, so two rows suffice
        vector<int> prev(n + 1, 0), curr(n + 1, 0);
        for (int i = 1; i <= m; i++) {
            char c = text1[i - 1];
            for (int j = 1; j <= n; j++) {
                if (c == text2[j - 1]) {
                    // aligning matching last chars is always safe: extend
                    // the LCS of both shorter prefixes
                    curr[j] = prev[j - 1] + 1;
                } else {
                    // an optimal LCS discards at least one of the two
                    // characters, so take the better of dropping either
                    curr[j] = max(prev[j], curr[j - 1]);
                }
            }
            // curr becomes the previous row for the next i
            swap(prev, curr);
        }
        return prev[n];
    }
};
