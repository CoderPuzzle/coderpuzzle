class Solution {
  public:
    int countSubstrings(string s, string t) {
        // same[j] = length of the exact-match run ending at s[i-1], t[j-1].
        // diff[j] = length of the run ending there with exactly one
        // mismatch, counted directly: the mismatch count along a fixed pair
        // of starts is monotone non-decreasing, so this length is exact.
        int n = s.size();
        int m = t.size();
        vector<int> samePrev(m + 1, 0);
        vector<int> diffPrev(m + 1, 0);
        long long total = 0;
        for (int i = 1; i <= n; i++) {
            vector<int> sameCurr(m + 1, 0);
            vector<int> diffCurr(m + 1, 0);
            for (int j = 1; j <= m; j++) {
                if (s[i - 1] == t[j - 1]) {
                    // A matching pair of last characters carries the
                    // diagonal counts forward unchanged.
                    sameCurr[j] = samePrev[j - 1] + 1;
                    diffCurr[j] = diffPrev[j - 1];
                } else {
                    // This position is the single mismatch, so it can only
                    // extend back through a run that matched perfectly.
                    sameCurr[j] = 0;
                    diffCurr[j] = samePrev[j - 1] + 1;
                }
                total += diffCurr[j];
            }
            samePrev = sameCurr;
            diffPrev = diffCurr;
        }
        return static_cast<int>(total);
    }
};
