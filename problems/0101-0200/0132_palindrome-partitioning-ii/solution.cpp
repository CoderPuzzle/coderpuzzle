class Solution {
  public:
    int minCut(string s) {
        int n = (int)s.size();
        // cut[i] = minimum cuts for the prefix of length i; cut[0] = -1 is a
        // sentinel making a prefix that is itself one palindrome cost 0, and
        // i - 1 is the all-single-characters fallback upper bound.
        vector<int> cut(n + 1);
        for (int i = 0; i <= n; ++i) {
            cut[i] = i - 1;
        }
        for (int c = 0; c < n; ++c) {
            // Odd-length palindromes expand from (c, c): each still-matching
            // step exposes s[l..r] and relaxes cut[r + 1] with cut[l] + 1.
            // Left-to-right centers keep every cut[l] read already final.
            for (int l = c, r = c; l >= 0 && r < n && s[l] == s[r]; --l, ++r) {
                cut[r + 1] = min(cut[r + 1], cut[l] + 1);
            }
            // Even-length palindromes expand from (c, c + 1).
            for (int l = c, r = c + 1; l >= 0 && r < n && s[l] == s[r]; --l, ++r) {
                cut[r + 1] = min(cut[r + 1], cut[l] + 1);
            }
        }
        return cut[n];
    }
};
