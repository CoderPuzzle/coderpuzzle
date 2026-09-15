class Solution {
  public:
    // A length-3 window is good iff its three characters are pairwise
    // distinct; slide the center and count.
    int countGoodSubstrings(string s) {
        int n = s.size();
        int count = 0;
        for (int i = 1; i + 1 < n; i++) {
            if (s[i - 1] != s[i] && s[i] != s[i + 1] && s[i - 1] != s[i + 1]) {
                count++;
            }
        }
        return count;
    }
};
