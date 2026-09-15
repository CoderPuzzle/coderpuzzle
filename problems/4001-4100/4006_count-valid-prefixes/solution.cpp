class Solution {
  public:
    int countValidPrefixes(string s) {
        // A prefix rearranges into an alternating string exactly when its counts
        // of '0' and '1' differ by at most one, so track both running counts
        // through one pass and count the prefixes whose balance stays within one.
        int zeros = 0, ones = 0, valid = 0;
        for (int i = 0; i < (int)s.size(); ++i) {
            if (s[i] == '0') {
                ++zeros;
            } else {
                ++ones;
            }
            if (abs(zeros - ones) <= 1)
                ++valid;
        }
        return valid;
    }
};
