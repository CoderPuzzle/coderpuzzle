class Solution {
  public:
    int minimumPartition(string s, int k) {
        // Greedy from the left: extend the current piece while its value
        // stays <= k, since splitting as late as possible is optimal. The
        // tentative value k * 10 + 9 overflows int, so widen to long long.
        int pieces = 1;
        long long value = 0;
        for (char ch : s) {
            int digit = ch - '0';
            long long candidate = value * 10 + digit;
            if (candidate <= k) {
                value = candidate;
            } else {
                // This digit must open a new piece; fail if it cannot stand
                // alone either.
                if (digit > k)
                    return -1;
                ++pieces;
                value = digit;
            }
        }
        return pieces;
    }
};
