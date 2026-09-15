class Solution {
  public:
    long long makeIntegerBeautiful(long long n, int target) {
        // Round n up to the next multiple of 10, then 100, and so on,
        // until the digit sum drops to target or below. Zeroing a suffix
        // is the only move that lowers a digit sum, and the smallest
        // beautiful value >= n is always such a round-up, so the first
        // round that fits is the minimum addition. n <= 10^12 keeps every
        // intermediate inside long long.
        long long original = n;
        long long base = 10;
        while (digitSum(n) > target) {
            n = ((n / base) + 1) * base;
            base *= 10;
        }
        return n - original;
    }

  private:
    static int digitSum(long long value) {
        int total = 0;
        while (value > 0) {
            total += value % 10;
            value /= 10;
        }
        return total;
    }
};
