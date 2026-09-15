class Solution {
  public:
    int longestCommonPrefix(string s, string t) {
        int n = s.size();
        int m = t.size();
        // Walk to the first mismatch (or whichever string ends first).
        int i = 0;
        while (i < n && i < m && s[i] == t[i]) {
            ++i;
        }
        // Removing s[i] is the only deletion worth trying: an earlier one
        // shifts the alignment for no gain, a later one cannot repair the
        // mismatch at i.
        int j = i + 1;
        int k = i;
        while (j < n && k < m && s[j] == t[k]) {
            ++j;
            ++k;
        }
        return k;
    }
};
