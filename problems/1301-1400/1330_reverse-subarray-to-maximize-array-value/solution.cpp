class Solution {
  public:
    int maxValueAfterReverse(vector<int> &nums) {
        // Reversing [L, R] only rewires the two boundary links. Gains split
        // into: prefix/suffix reversals (one boundary term each) and interior
        // reversals, bounded by 2*(max adjacent min - min adjacent max).
        int n = (int)nums.size();
        long long total = 0;
        for (int i = 0; i < n - 1; ++i) {
            total += abs(nums[i] - nums[i + 1]);
        }
        long long bestGain = 0;
        long long big = LLONG_MIN;   // max over adjacent-pair minima
        long long small = LLONG_MAX; // min over adjacent-pair maxima
        for (int i = 0; i < n - 1; ++i) {
            int a = nums[i];
            int b = nums[i + 1];
            // reverse [0..i]: the (i, i+1) link becomes (0, i+1)
            bestGain = max(bestGain, (long long)abs(nums[0] - b) - abs(a - b));
            // reverse [i+1..n-1]: the (i, i+1) link becomes (i, n-1)
            bestGain = max(bestGain, (long long)abs(nums[n - 1] - a) - abs(a - b));
            big = max(big, (long long)min(a, b));
            small = min(small, (long long)max(a, b));
        }
        if (big > small) {
            bestGain = max(bestGain, 2 * (big - small));
        }
        // The statement guarantees the answer fits in 32 bits.
        return (int)(total + bestGain);
    }
};
