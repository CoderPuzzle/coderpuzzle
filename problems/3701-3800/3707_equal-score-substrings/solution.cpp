class Solution {
  public:
    bool scoreBalance(string s) {
        // The total letter score lets every split compare a running prefix
        // against the remainder: the halves balance exactly when the running
        // score reaches half the total.
        int total = 0;
        for (char ch : s) {
            total += ch - 'a' + 1;
        }
        int left = 0;
        // Sweep the split points, growing the left side one letter at a time;
        // stopping before the final character keeps both halves non-empty.
        for (int i = 0; i + 1 < (int)s.size(); i++) {
            left += s[i] - 'a' + 1;
            if (2 * left == total) {
                return true;
            }
        }
        return false;
    }
};
