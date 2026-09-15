class Solution {
  public:
    int mirrorDistance(int n) {
        // Peel digits least-significant first to build the reversal; any
        // trailing zeros of n simply never materialize as leading zeros.
        // Both sides stay below 10^9 < 2^31, so int arithmetic is exact.
        int original = n, reversed = 0;
        while (n > 0) {
            reversed = reversed * 10 + n % 10;
            n /= 10;
        }
        return abs(original - reversed);
    }
};
