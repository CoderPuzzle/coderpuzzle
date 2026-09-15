class Solution {
  public:
    int subarraySum(vector<int> &nums, int k) {
        unordered_map<long long, int> prefixCounts;
        // Seed with the empty prefix so subarrays starting at index 0 are counted.
        prefixCounts[0] = 1;
        long long running = 0;
        int total = 0;
        for (int value : nums) {
            running += value;
            // Subarrays ending here sum to k exactly when an earlier prefix equals running - k.
            auto it = prefixCounts.find(running - k);
            if (it != prefixCounts.end()) {
                total += it->second;
            }
            // Record only after counting, so a subarray never matches against itself.
            prefixCounts[running]++;
        }
        return total;
    }
};
