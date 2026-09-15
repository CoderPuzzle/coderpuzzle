class Solution {
  public:
    bool isOneEditDistance(string s, string t) {
        // Swap so s is the shorter (or equal) string: a delete on one side
        // is an insert on the other, so one orientation covers both.
        if (s.size() > t.size())
            swap(s, t);
        size_t m = s.size(), n = t.size();
        // No single edit changes the length by more than one.
        if (n - m > 1)
            return false;
        for (size_t i = 0; i < m; ++i) {
            if (s[i] != t[i]) {
                if (m == n) {
                    // Replace: both tails after the first divergence must agree.
                    return s.compare(i + 1, m - i - 1, t, i + 1, n - i - 1) == 0;
                }
                // Insert t[i] into s: s from here must match t from the next slot.
                return s.compare(i, m - i, t, i + 1, n - i - 1) == 0;
            }
        }
        // s is a prefix of t: identical strings are zero edits apart, so exactly
        // one edit remains only if t has one character more.
        return n - m == 1;
    }
};
