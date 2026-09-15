class Solution {
  public:
    // A window holding exactly k distinct values has no monotone shrink rule
    // — it can be too wide or too narrow from either side — but a window
    // holding at most t distinct values does. Count the subarrays with at
    // most k distinct values, subtract those with at most k - 1, and exactly
    // k is what remains.
    long long subarraysWithKDistinct(vector<int> &nums, int k) { return atMost(nums, k) - atMost(nums, k - 1); }

  private:
    long long atMost(vector<int> &nums, int limit) {
        vector<int> freq(nums.size() + 1, 0); // values lie in [1, n]
        int distinct = 0;
        int left = 0;
        long long total = 0;
        for (int right = 0; right < static_cast<int>(nums.size()); ++right) {
            if (freq[nums[right]] == 0) {
                ++distinct;
            }
            ++freq[nums[right]];
            while (distinct > limit) {
                int leaving = nums[left];
                --freq[leaving];
                if (freq[leaving] == 0) {
                    --distinct;
                }
                ++left;
            }
            // every suffix of an at-most window also qualifies, so the
            // window's length counts the subarrays ending at right
            total += right - left + 1;
        }
        return total;
    }
};
