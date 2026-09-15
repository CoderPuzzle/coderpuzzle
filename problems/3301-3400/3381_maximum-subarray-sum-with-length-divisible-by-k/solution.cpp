class Solution {
  public:
    long long maxSubarraySum(vector<int> &nums, int k) {
        int n = (int)nums.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        // minPref[r]: smallest prefix sum seen at an index congruent to r
        // mod k. Length divisible by k means both endpoints share a residue,
        // so within each class maximize prefix[i] minus the earlier minimum.
        vector<long long> minPref(k, LLONG_MAX);
        // LLONG_MIN start, not 0: an all-negative array still has a best.
        long long best = LLONG_MIN;
        for (int i = 0; i <= n; i++) {
            int r = i % k;
            // Compare before updating the bucket, so the paired prefix is
            // strictly earlier and the subarray stays non-empty.
            if (minPref[r] != LLONG_MAX) {
                long long cand = prefix[i] - minPref[r];
                if (cand > best) {
                    best = cand;
                }
            }
            if (prefix[i] < minPref[r]) {
                minPref[r] = prefix[i];
            }
        }
        return best;
    }
};
