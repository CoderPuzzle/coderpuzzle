class Solution {
  public:
    int countCompleteSubarrays(vector<int> &nums) {
        unordered_set<int> values(nums.begin(), nums.end());
        int totalDistinct = values.size();
        // A subarray is complete exactly when it holds every distinct value
        // of the whole array: atMost(k) counts it, atMost(k - 1) does not.
        return atMost(nums, totalDistinct) - atMost(nums, totalDistinct - 1);
    }

  private:
    // Number of subarrays holding at most `limit` distinct values, counted by
    // right endpoint with a forward-only left boundary.
    int atMost(vector<int> &nums, int limit) {
        unordered_map<int, int> freq;
        int distinct = 0;
        int left = 0;
        int count = 0;
        for (int right = 0; right < (int)nums.size(); ++right) {
            ++freq[nums[right]];
            if (freq[nums[right]] == 1)
                ++distinct;
            while (distinct > limit) {
                if (--freq[nums[left]] == 0)
                    --distinct;
                ++left;
            }
            // every start in [left, right] keeps the window within limit
            // (limit 0 shrinks every window empty, contributing nothing)
            count += right - left + 1;
        }
        return count;
    }
};
