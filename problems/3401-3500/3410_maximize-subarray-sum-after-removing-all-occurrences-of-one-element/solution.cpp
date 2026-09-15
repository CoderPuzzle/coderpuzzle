class Solution {
  public:
    long long maxSubarraySum(vector<int> &nums) {
        int n = (int)nums.size();
        // Deleting the only element is forbidden, so its value stands.
        if (n == 1)
            return nums[0];
        // Per-candidate account: smallest adjusted prefix P(j) minus the |x|'s
        // deleted after j. Key 0 is the plain no-deletion prefix minimum.
        // prefixMap keyed by the deleted value; key 0 tracks min prefix sum.
        unordered_map<long long, long long> prefixMap;
        prefixMap[0] = 0;
        long long prefixSum = 0;
        long long minPrefix = 0;
        // Seeded with nums[0] so all-negative arrays need no zero sentinel.
        long long result = nums[0];
        for (int num : nums) {
            prefixSum += num;
            // Best subarray ending at r: P(r) minus the smallest adjusted prefix
            // seen so far. Runs before num joins any account, so every anchor
            // strictly precedes r and the subarray is never empty.
            if (prefixSum - minPrefix > result)
                result = prefixSum - minPrefix;
            // Only a negative x can help: deleting a positive would only
            // shrink every subarray sum.
            if (num < 0) {
                // Anchor at min(old account, plain prefix min) and subtract |x|
                // again: the deletion window may restart at this occurrence.
                long long key = num;
                auto it = prefixMap.find(key);
                if (it != prefixMap.end()) {
                    it->second = min(it->second, prefixMap[0]) + num;
                } else {
                    prefixMap[key] = prefixMap[0] + num;
                }
                if (prefixMap[key] < minPrefix)
                    minPrefix = prefixMap[key];
            }
            if (prefixSum < prefixMap[0])
                prefixMap[0] = prefixSum;
            if (prefixMap[0] < minPrefix)
                minPrefix = prefixMap[0];
        }
        return result;
    }
};
