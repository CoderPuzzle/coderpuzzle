class Solution {
  public:
    int consecutiveNumbersSum(int n) {
        // A run of L consecutive positive integers starting at a sums to
        // L*a + L*(L-1)/2, so n has a length-L representation exactly when
        // n - L*(L-1)/2 is a positive multiple of L. The smallest sum of
        // L terms is 1 + 2 + ... + L = L*(L+1)/2: once that minimum passes
        // n no run fits, and below it the remainder is at least L, so
        // divisibility alone pins a >= 1. Length 1 always divides — the
        // single-term sum n = n. L*(L+1) brushes 2e9 at the bound, so the
        // loop holds its intermediates in a long long.
        int count = 0;
        for (long long length = 1; length * (length + 1) / 2 <= n; length++) {
            if ((n - length * (length - 1) / 2) % length == 0) {
                count++;
            }
        }
        return count;
    }
};
