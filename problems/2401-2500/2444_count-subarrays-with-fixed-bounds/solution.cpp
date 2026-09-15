class Solution {
  public:
    long long countSubarrays(vector<int> &nums, int minK, int maxK) {
        long long count = 0;
        // most recent positions of an out-of-range element, minK, and maxK
        long long last_bad = -1, last_min = -1, last_max = -1;
        for (int i = 0; i < (int)nums.size(); i++) {
            int x = nums[i];
            // a valid subarray ending later must start after a bad element
            if (x < minK || x > maxK)
                last_bad = i;
            // tracking the last occurrence is enough: it covers earlier ones
            if (x == minK)
                last_min = i;
            if (x == maxK)
                last_max = i;
            // starts for this right end: after last_bad, at or before
            // min(last_min, last_max); the 0 clamp skips ends with none
            count += max(0LL, min(last_min, last_max) - last_bad);
        }
        return count;
    }
};
