class Solution {
  public:
    // Consistency depends only on which letters a word uses, so fold allowed
    // into one 26-bit mask: bit i means 'a' + i may appear.
    int countConsistentStrings(string allowed, vector<string> &words) {
        int allowedMask = 0;
        for (char ch : allowed) {
            allowedMask |= 1 << (ch - 'a');
        }
        int count = 0;
        for (const string &word : words) {
            int mask = 0;
            for (char ch : word) {
                mask |= 1 << (ch - 'a');
            }
            // the word is consistent exactly when its mask holds no bit
            // outside allowedMask — one AND answers the subset question
            if ((mask & ~allowedMask) == 0) {
                ++count;
            }
        }
        return count;
    }
};
