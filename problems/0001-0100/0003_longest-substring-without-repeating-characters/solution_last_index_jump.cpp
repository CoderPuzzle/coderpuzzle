class Solution {
  public:
    int lengthOfLongestSubstring(string s) {
        // last[c] holds the most recent index of byte c; -1 means never seen,
        // which folds the membership check into the guard below.
        vector<int> last(256, -1);
        int start = 0, best = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            unsigned char c = s[i];
            // The >= start guard ignores occurrences left of the window;
            // without it start could be dragged backwards.
            if (last[c] >= start) {
                // The window can no longer include that older occurrence, so
                // start leaps over the conflict instead of shrinking by one.
                start = last[c] + 1;
            }
            last[c] = i;
            // Window s[start..i] is duplicate-free again: record its length.
            best = max(best, i - start + 1);
        }
        return best;
    }
};
