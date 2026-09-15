class Solution {
  public:
    // Binary-search the peak m = nums[index]. Any valid array with that peak
    // has nums[i] >= max(m - |i - index|, 1) everywhere, and the array that
    // sits exactly on those bounds is itself valid, so its sum decides
    // feasibility and grows strictly with m. Probing m up to maxSum = 10^9
    // makes the side sums reach about 5*10^17, past 32 bits, so every sum
    // runs in long long.
    int maxValue(int n, int index, int maxSum) {
        auto side = [](long long m, long long width) {
            if (width >= m) {
                return m * (m - 1) / 2 + width - (m - 1);
            }
            return width * m - width * (width + 1) / 2;
        };
        long long lo = 1, hi = maxSum;
        while (lo < hi) {
            long long mid = lo + (hi - lo + 1) / 2;
            if (mid + side(mid, index) + side(mid, n - 1 - index) <= maxSum) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return (int)lo;
    }
};
