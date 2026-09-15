class Solution {
  public:
    int maxNonOverlapping(vector<int> &nums, int target) {
        // `seen` holds every prefix sum reachable from the start of the
        // current "segment" (the region after the last subarray taken).
        // The moment the running sum minus `target` is in `seen`, a
        // subarray ending here sums to `target`; taking it immediately and
        // resetting (prefix sum back to 0, `seen` back to just {0}) is
        // optimal, because closing off a valid subarray as early as
        // possible never removes an opportunity a later close would have
        // had — it can only free up more room for subarrays after it.
        // `prefixSum` is int64_t: up to 10^5 terms each up to 10^4 in
        // magnitude can sum to roughly 10^9, close enough to the int32
        // range to be worth avoiding.
        unordered_set<int64_t> seen{0};
        int64_t prefixSum = 0;
        int count = 0;
        for (int x : nums) {
            prefixSum += x;
            if (seen.count(prefixSum - target)) {
                count++;
                seen.clear();
                seen.insert(0);
                prefixSum = 0;
            } else {
                seen.insert(prefixSum);
            }
        }
        return count;
    }
};
