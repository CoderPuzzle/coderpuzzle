class Solution {
  public:
    int minOperations(string s) {
        // Exactly two alternating targets exist; each position matches
        // one of them, so one mismatch count against the 0101... target
        // determines both costs.
        int mismatch = 0;
        int n = (int)s.size();
        for (int i = 0; i < n; i++) {
            if ((s[i] - '0') != i % 2) {
                mismatch++;
            }
        }
        return min(mismatch, n - mismatch);
    }
};
