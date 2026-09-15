class Solution {
  public:
    string getSmallestString(string s) {
        // C++ strings are mutable, so this is the true in-place scan: each
        // adjacent pair is examined once and the first same-parity descent
        // is the only swap worth making — it lowers an earlier position
        // than any later legal swap could.
        for (int i = 0; i + 1 < (int)s.size(); i++) {
            if (s[i] > s[i + 1] && (s[i] - '0') % 2 == (s[i + 1] - '0') % 2) {
                // At most one swap is allowed, so stop right after it.
                swap(s[i], s[i + 1]);
                break;
            }
        }
        return s;
    }
};
