class Solution {
  public:
    int minSubArrayLen(int target, vector<int> &nums) {
        int n = nums.size();
        // prefix[i] = sum of the first i elements. Positivity makes it
        // strictly increasing, which licenses the binary search; long longs
        // absorb prefix + target, which can pass 2^31.
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        // Sentinel: an impossible length that survives when target is never met.
        int best = n + 1;
        for (int i = 0; i < n; i++) {
            // Lower bound: the first prefix >= prefix[i] + target, searched
            // from i+1 on so the window has positive length.
            long long key = prefix[i] + target;
            int j = (int)(lower_bound(prefix.begin() + i + 1, prefix.end(), key) - prefix.begin());
            if (j <= n) {
                best = min(best, j - i);
            }
        }
        return best == n + 1 ? 0 : best;
    }
};
